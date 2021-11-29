import React from "react";
import { Container, Form, Row, Button } from "react-bootstrap";
import { request } from "../../../../components/helper/helper";
import Loading from "../../../../components/loading/loading";
import MessagePrompt from "../../../../components/prompts/message";

export default class RepuestosCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rediret: false,
      message: {
        text: "",
        show: false,
      },
      loading: false,
      repuesto: {
        codigo: "",
        repuesto_bc: "",
        precio: "",
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
  }

  setValue(index, value) {
    this.setState({
      repuesto: {
        ...this.state.empleado,
        [index]: value,
      },
    });
  }

  guardarRepuestos() {
    this.setState({ loading: true });
    request
      .post("/repuestos", this.state.repuesto)
      .then((response) => {
        if (response.data.exito) {
          this.setState({
            rediret: response.data.exito,
            message: {
              text: response.data.msg,
              show: true,
            },
          });
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: true });
      });
  }

  onExitedMessage() {
    if (this.state.rediret) this.props.changeTab("buscar");
  }

  render() {
    return (
      <Container id="repuestos-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Crear Repuesto</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Codigo</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("codigo", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Repuesto</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("repuestos_bc", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("precio", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => console.log(this.guardarRepuestos())}
            >
              Guardar Repuesto
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
