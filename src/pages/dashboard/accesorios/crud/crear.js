import React from "react";
import { Container, Form, Row, Button } from "react-bootstrap";
import { request } from "../../../../components/helper/helper";
import Loading from "../../../../components/loading/loading";
import MessagePrompt from "../../../../components/prompts/message";

export default class AccesoriosCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rediret: false,
      message: {
        text: "",
        show: false,
      },
      loading: false,
      accesorio: {
        codigo: "",
        accesorio_bc: "",
        precio: "",
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
  }

  setValue(index, value) {
    this.setState({
      accesorio: {
        ...this.state.accesorio,
        [index]: value,
      },
    });
  }

  guardarAccesorios() {
    this.setState({ loading: true });
    request
      .post("/accesorios", this.state.accesorio)
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
      <Container id="accesorios-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Crear Accesorio</h1>
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
              <Form.Label>Accesorio</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("accesorio_bc", e.target.value)}
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
              onClick={() => console.log(this.guardarAccesorios())}
            >
              Guardar Accesorio
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
