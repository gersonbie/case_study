import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import LogoIcon from "../../assets/svgs/logo";
import Logomarca from "../../assets/images/logomarca.jpg";
import Checkbox from "../../components/input/Checkbox";
import TextInput from "../../components/input/TextInput";
import { useAuth } from "../../context";
import { APIKit } from "../../services/api";
import "./entrar.css";

const Login = () => {
  const { setToken, toast } = useAuth(useAuth);
  const formik = useFormik({
    initialValues: {
      email: '',
      senha: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      senha: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      toast.promise(APIKit.post('/auth', values), {
        loading: 'Carregando!',
        success: (response) => {
          setToken(response.data.token)
          return 'Bem Vindo!'
        },
      });
    },
  });
  return (
    <div className="container-login">
      <aside className="aside-login">
        <img src={Logomarca} alt="Logo" />
      </aside>
      <main className="main-login">
        <div className="form-login">
          <div className="logo-login">
            <LogoIcon />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <h3 className="gradient-text">Faça login em sua conta</h3>
            <p>Bem vindo, faça login para acessar o seu painel.</p>
            <div className="login-card">
              <TextInput name="email" label="Email" type="email" placeholder="Digite o seu email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email} />
              <TextInput
                name="senha"
                label="Senha"
                type="password"
                placeholder="Digite a sua senha"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.senha}
              />
            </div>
            <div className="option-login">
              <Checkbox label="Lembrar-me" name="remember" />
              <Link className="link" to="/enviar">
                Esqueceu a Senha?
              </Link>
            </div>
            <div className="buttons-box">
              <button type="submit" className="action-button">
                Entrar
              </button>
            </div>
          </form>
        </div>
        <footer className="footer-login">
          <div className="frase-login">
            <p>
              Desenvolvido por
              <a href="https://www.linkedin.com/in/gerson-bi%C3%A9-b81727191/">
                <strong> Gerson Bié</strong>
              </a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};
export default Login;
