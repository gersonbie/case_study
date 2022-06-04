import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useAuth } from "./context";
import Admin from "./pages/Admin";
import Entrar from "./pages/Login";
import Esquecer from "./pages/Login/EsquecerSenha/";
import Recuperar from "./pages/Login/recuperar";
import Cliente from "./pages/Cliente";

function Routes() {
  const { auth, usuario, initialize } = useAuth(useAuth);
  useEffect(() => {
    initialize();
  }, []);
  if (auth && usuario?.funcao === "admin")
    return (
      <BrowserRouter>
        <Admin />
      </BrowserRouter>
    );
  else if (auth && usuario?.funcao === "client")
    return (
      <BrowserRouter>
        <Cliente />
      </BrowserRouter>
    );
  else
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/recuperar" component={Esquecer} />
          <Route path="/enviar" component={Recuperar} />
          <Route exact path="/" component={Entrar} />
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    );
}
export default Routes;
