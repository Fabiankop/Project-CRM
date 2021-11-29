import React from "react";
import { Container, Nav, Row } from "react-bootstrap";
import BicicletasBuscar from "./crud/buscar";
import BicicletasCrear from "./crud/crear";
import BicicletasEditar from "./crud/editar";
import Cards from "./Cards";
import "./bicicletas.css";

export default class Bicicletas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "buscar",
      _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdBicicleta = this.setIdBicicleta.bind(this);
    this.getIdBicicleta = this.getIdBicicleta.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  setIdBicicleta(id) {
    this.setState({ _id: id });
  }

  getIdBicicleta() {
    return this.state._id;
  }
  //
  render() {
    return (
      <Container id="bicicletas-container">
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
            <BicicletasBuscar
              changeTab={this.changeTab}
              setIdBicicleta={this.setIdBicicleta}
            />
          ) : this.state.currentTab === "crear" ? (
            <BicicletasCrear changeTab={this.changeTab} />
          ) : (
            <BicicletasEditar
              changeTab={this.changeTab}
              getIdBicicleta={this.getIdBicicleta}
            />
          )}
        </Row>
        <Cards />
      </Container>
    );
  }
}
