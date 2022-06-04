import { useFormik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';
import LogoIcon from "../../assets/svgs/logo";
import Logomarca from "../../assets/images/logomarca.jpg";
import TextInput from "../../components/input/TextInput";
import { useAuth } from "../../context";
import { APIKit } from "../../services/api";
import "./entrar.css";

const Recuperar = () => {
  let history = useHistory();
  const { toast } = useAuth(useAuth);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: values => {
      toast.promise(APIKit.post('/auth/recuperar', values), {
        loading: 'Carregando!',
        success: () => {
          history.push('/')
          return 'Email enviado. Verifique seu email!'
        },
        error: () => {
          return 'Erro ao enviar email!'
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
            <h3 className="gradient-text">Recuperar senha</h3>
            <p>Digite o email para recuperar as senha.</p>
            <div className="login-card">
              <TextInput name="email" label="Email" type="email" placeholder="Digite o seu email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email} />
            </div>
            <div className="buttons-box">
              <button type="submit" className="action-button">
                Enviar email
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
export default Recuperar;
