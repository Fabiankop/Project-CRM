import React from "react";
import { Container, Nav, Row } from "react-bootstrap";
import RepuestosBuscar from "./crud/buscar";
import RepuestosCrear from "./crud/crear";
import RepuestosEditar from "./crud/editar";
import "./repuestos.css";

export default class Repuestos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "buscar",
      _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdRepuesto = this.setIdRepuesto.bind(this);
    this.getIdRepuesto = this.getIdRepuesto.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  setIdRepuesto(id) {
    this.setState({ _id: id });
  }

  getIdRepuesto() {
    return this.state._id;
  }
  //
  render() {
    return (
      <Container id="repuestos-container">
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
            <RepuestosBuscar
              changeTab={this.changeTab}
              setIdRepuesto={this.setIdRepuesto}
            />
          ) : this.state.currentTab === "crear" ? (
            <RepuestosCrear changeTab={this.changeTab} />
          ) : (
            <RepuestosEditar
              changeTab={this.changeTab}
              getIdRepuesto={this.getIdRepuesto}
            />
          )}
        </Row>
      </Container>
    );
  }
}
