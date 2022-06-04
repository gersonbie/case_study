import { useFormik } from "formik";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from 'yup';
import LogoIcon from "../../../assets/svgs/logo";
import Logomarca from "../../../assets/images/logomarca.jpg";
import TextInput from "../../../components/input/TextInput";
import { useAuth } from "../../../context";
import { APIKit } from "../../../services/api";
import "../entrar.css";

const Form = ({ token }) => {
  let history = useHistory();
  const { toast } = useAuth(useAuth);
  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: '',
      token
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Required'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'A senha deve ser igual'),
    }),
    onSubmit: values => {
      toast.promise(APIKit.post('/auth/novasenha', values), {
        loading: 'Carregando!',
        success: () => {
          history.push('/')
          return 'Senha recuperada com sucesso!'
        },
        error: () => {
          return 'Não foi possível recuperar a senha!'
        },
      });
    },
  });
  return <form onSubmit={formik.handleSubmit}>
    <h3 className="gradient-text">Recuperar Senha</h3>
    <p>Ola, preencha o formulário abaixo para recuperar a senha.</p>
    <div className="login-card">
      <TextInput name="password" label="Nova senha" type="password" placeholder="Digite a senha"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password} />
      <TextInput
        name="passwordConfirmation"
        label="Confirme a nova senha"
        type="password"
        placeholder="Confirme a senha"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.passwordConfirmation}
      />
    </div>
    <div className="buttons-box">
      <button type="submit" className="action-button">
        Recuperar senha
      </button>
    </div>
  </form>
}

const Login = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
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
          < Form token={query.get("token")} />
        </div>
        <footer className="footer-login">
          <div className="frase-login">
            <p>
              Desenvolvido por
              <a href="https://connectplus.co.mz/">
                <strong> CONNECT PLUS</strong>
              </a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};
export default Login;
