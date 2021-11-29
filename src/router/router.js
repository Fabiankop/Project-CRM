import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "../components/auth/privateroute";

import Dashboard from "../pages/dashboard/dashboard";
import Login from "../pages/auth/login/login";
import Register from "../pages/auth/register/register";

import Empleados from "../pages/dashboard/empleados/index";
import Bicicletas from "../pages/dashboard/bicicletas/index";
import Accesorios from "../pages/dashboard/accesorios/index";
import Repuestos from "../pages/dashboard/repuestos/index";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Rutas públicas */}
        <Route exact path={["/"]} component={Login} />
        <Route exact path={["/login"]} component={Login} />
        <Route exact path={["/register"]} component={Register} />

        {/* Rutas privadas */}
        <PrivateRoute exact path={["/empleados"]} component={Dashboard} />
        <PrivateRoute exact path={["/bicicletas"]} component={Dashboard} />
        <PrivateRoute exact path={["/accesorios"]} component={Dashboard} />
        <PrivateRoute exact path={["/repuestos"]} component={Dashboard} />

        {/* <Switch>
                  
                  <PrivateRoute exact path="/" component={empleados} />
                  <PrivateRoute exact path="/empleados" component={empleados} />
                  <PrivateRoute exact path="/bicicletas" component={bicicletas} />
                  <PrivateRoute exact path="/accesorios" component={accesorios} />
                  <PrivateRoute exact path="/repuestos" component={repuestos} />
                </Switch> */}

        {/* 404 Page */}
        <Route
          path={"*"}
          component={() => (
            <h1 style={{ marginTop: 300 }}>
              404
              <br />
              Página no encontrada
            </h1>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}
