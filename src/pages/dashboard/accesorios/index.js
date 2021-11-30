import React from "react";
import { Container, Nav, Row } from "react-bootstrap";
import AccesoriosBuscar from "./crud/buscar";
import AccesoriosCrear from "./crud/crear";
import AccesoriosEditar from "./crud/editar";

import "./accesorios.css";

export default class Accesorios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "buscar",
      _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdAccesorios = this.setIdAccesorios.bind(this);
    this.getIdAccesorios = this.getIdAccesorios.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  setIdAccesorios(id) {
    this.setState({ _id: id });
  }

  getIdAccesorios() {
    return this.state._id;
  }
  //
  render() {
    return (
      <Container id="accesorios-container">
        <Row>
          <Nav
            fill
            variant="tabs"
            defaultActiveKey="buscar"
            onSelect={(eventKey) => this.setState({ currentTab: eventKey })}
          >
            <Nav.Item>
              <Nav.Link eventKey="buscar">Buscar</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="crear">Crear</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          {this.state.currentTab === "buscar" ? (
            <AccesoriosBuscar
              changeTab={this.changeTab}
              setIdAccesorio={this.setIdAccesorios}
            />
          ) : this.state.currentTab === "crear" ? (
            <AccesoriosCrear changeTab={this.changeTab} />
          ) : (
            <AccesoriosEditar
              changeTab={this.changeTab}
              getIdAccesorio={this.getIdAccesorios}
            />
          )}
        </Row>
      </Container>
    );
  }
}
