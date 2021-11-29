import React from "react";
import { Container, Form, Row, Button } from "react-bootstrap";
import { request } from "../../../../components/helper/helper";
import Loading from "../../../../components/loading/loading";
import MessagePrompt from "../../../../components/prompts/message";

export default class BicicletasCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rediret: false,
      message: {
        text: "",
        show: false,
      },
      loading: false,
      bicicleta: {
        codigo: "",
        modelo: "",
        placa: "",
        rim: "",
        llanta: "",
        velocidades: "",
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
  }

  setValue(index, value) {
    this.setState({
      bicicleta: {
        ...this.state.bicicleta,
        [index]: value,
      },
    });
  }

  guardarBicicletas() {
    this.setState({ loading: true });
    request
      .post("/bicicletas", this.state.bicicleta)
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
      <Container id="bicicletas-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Crear Producto</h1>
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
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("modelo", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Placa</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("placa", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Rim</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("rim", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Llanta</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("llanta", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Velocidades</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("velocidades", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => console.log(this.guardarBicicletas())}
            >
              Guardar Producto
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
