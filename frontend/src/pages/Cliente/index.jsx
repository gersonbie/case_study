import React from "react";
import { AiOutlineBars, FiUser, FiUsers } from "react-icons/all";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import Logo from "../../assets/svgs/logoAdmin.svg";
import CreateDocument from "../Documentos/create";
import CreateReserva from "../Reserva/create";
import "./layout.css";
import Perfil from "./Perfil";
const Layout = () => {
  return (
    <Router>
      <header>
        <nav>
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="nav-list">
            <NavLink exact to="/">
              <AiOutlineBars /> Actualizar Documentos
            </NavLink>
            <NavLink to="/reserva">
              <FiUsers /> Marcação
            </NavLink>
            <NavLink to="/perfil">
              <FiUser /> Perfil
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="seller">
        <Switch>
          <Route exact path="/reserva">
            <CreateReserva />
          </Route>
          <Route path="/perfil">
            <Perfil />
          </Route>
          <Route exact path="/">
            <CreateDocument />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};
export default Layout;
