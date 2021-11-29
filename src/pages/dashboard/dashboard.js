import React from "react";
import "./dashboard.css";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Menu from "../../components/navbar/navbar";

import Empleados from "../../pages/dashboard/empleados/index";
import Bicicletas from "../../pages/dashboard/bicicletas/index";
import Repuestos from "../../pages/dashboard/repuestos/index";
import Accesorios from "../../pages/dashboard/accesorios/index";

export default class Dashboard extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Menu />
          <Row className="m-0">
            <Col sm={1} id="sidebar" className="m-0">
              <Link to="/empleados"> Empleados </Link>
              <Link to="/bicicletas"> Bicicletas </Link>
              <Link to="/respuestos"> Repuestos </Link>
            </Col>

            <Col sm={11} className="main p-0">
              <Route exact path="/" component={Empleados} />
              <Route exact path="/empleados" component={Empleados} />
              <Route exact path="/bicicletas" component={Bicicletas} />
              <Route exact path="/accesorios" component={Accesorios} />
              <Route exact path="/repuestos" component={Repuestos} />
            </Col>
          </Row>
        </BrowserRouter>
      </>
    );
  }
}
