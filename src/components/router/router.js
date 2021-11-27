import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "../auth/privateroute";

import login from "../login/login";
import empleados from "../empleados/index";
import bicicletas from "../bicicletas/index";
import accesorios from "../accesorios/index";
import repuestos from "../repuestos/index";
import Home from "../pages/home/home";
import Register from "../register/register";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        {/* Rutas públicas */}
        <Route exact path={["/"]} component={Home} />
        <Route exact path={["/login"]} component={login} />
        <Route exact path={["/register"]} component={Register} />

        {/* Rutas privadas */}
        <PrivateRoute exact path="/empleados" component={empleados} />
        <PrivateRoute exact path="/bicicletas" component={bicicletas} />
        <PrivateRoute exact path="/accesorios" component={accesorios} />
        <PrivateRoute exact path="/repuestos" component={repuestos} />
        <Route
          path={"*"}
          component={() => (
            <h1 style={{ marginTop: 300 }}>
              404
              <br />
              Pagina no encontrada
            </h1>
          )}
        />
      </Switch>
    </Router>
  );
}
