import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/auth/privateroute";

import Empleados from "../components/empleados/index";
import Bicicletas from "../components/bicicletas/index";
import Accesorios from "../components/accesorios/index";
import Repuestos from "../components/repuestos/index";

export default function DashboardRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Empleados} />
        <PrivateRoute exact path="/empleados" component={Empleados} />
        <PrivateRoute exact path="/bicicletas" component={Bicicletas} />
        <PrivateRoute exact path="/accesorios" component={Accesorios} />
        <PrivateRoute exact path="/repuestos" component={Repuestos} />
      </Switch>
    </BrowserRouter>
  );
}
