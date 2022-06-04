import React from "react";
import {
  BiTransferAlt,
  FiPower,
  FiUsers,
  MdKeyboardArrowRight,
} from "react-icons/all";
import { FiUser } from "react-icons/fi";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import Logo from "../../assets/svgs/logoAdmin.svg";
import UserIcon from "../../assets/svgs/user";
import { funcoesUsuarioObject } from "../../constants/dictionary";
import { useAuth } from "../../context";

import Perfil from "../Cliente/Perfil";
import "./layout.css";
import Users from "./Usuarios";
import CreateQuiz from "../Quiz/create";

const Admin = () => {
  const { logout, usuario } = useAuth(useAuth);
  return (
    <div className="container-admin">
      <aside>
        <div className="aside_1">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="aside_2">
          <NavLink to="/quiz">
            <div className="flex">
              <BiTransferAlt /> Avaliação{" "}
              <MdKeyboardArrowRight size={24} className="self-end" />
            </div>
          </NavLink>

          <NavLink to="/usuarios">
            <div className="flex">
              <FiUsers /> Usuários{" "}
              <MdKeyboardArrowRight size={24} className="self-end" />
            </div>
          </NavLink>
        </div>
      </aside>
      <header className="navbar-admin">
        <div className="profile">
          <div className="flex-col mr-2">
            <span className="font-bold">{usuario.nome}</span>
            <span className="gradient-text text-sm">
              {funcoesUsuarioObject[usuario.funcao].label}
            </span>
          </div>
          <div className="dropdown">
            <div className="user-logo">
              <UserIcon size={16} />
            </div>
            <div className="dropdown-content">
              <Link to="/perfil">
                <FiUser size={16} /> Meu Perfil
              </Link>
              <button
                type="button"
                className="flex items-center"
                onClick={logout}
              >
                <FiPower size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="main-admin ph-4">
        <Switch>
          <Route exact path="/usuarios">
            <Users />
          </Route>
          <Route exact path="/usuarios/:id">
            <Perfil />
          </Route>
          <Route exact path="/perfil">
            <Perfil />
          </Route>
          <Route path="/quiz">
            <CreateQuiz />
          </Route>
          <Route exact path="/">
            <Redirect to="/quiz" />
          </Route>
        </Switch>
      </main>
    </div>
  );
};
export default Admin;
