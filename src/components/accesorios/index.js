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
    this.setIdAccesorio = this.setIdAccesorio.bind(this);
    this.getIdAccesorio = this.getIdAccesorio.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  setIdAccesorio(id) {
    this.setState({ _id: id });
  }

  getIdAccesorio() {
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
              setIdAccesorio={this.setIdAccesorio}
            />
          ) : this.state.currentTab === "crear" ? (
            <AccesoriosCrear changeTab={this.changeTab} />
          ) : (
            <AccesoriosEditar
              changeTab={this.changeTab}
              getIdAccesorio={this.getIdAccesorio}
            />
          )}
        </Row>
      </Container>
    );
  }
}
