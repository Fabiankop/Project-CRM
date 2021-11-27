import React from "react";
import { Container, Form, Row, Button } from "react-bootstrap";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";
import ConfirmationPromprs from "../../prompts/confirmation";

export default class BicicletasEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idBicicleta: this.props.getIdBicicleta(),
      rediret: false,
      message: {
        text: "",
        show: false,
      },
      confirmation: {
        title: "Modificar producto",
        text: "¿Deseas modificar el producto?",
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
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.getBicicleta();
  }

  getBicicleta() {
    this.setState({ loading: true });
    request
      .get(`/bicicletas/${this.state.idBicicleta}`)
      .then((response) => {
        this.setState({
          bicicleta: response.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
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
      .put(`/bicicletas/${this.state.idBicicleta}`, this.state.bicicleta)
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

  onCancel() {
    this.setState({
      confirmation: {
        ...this.state.confirmation,
        show: false,
      },
    });
  }

  onConfirm() {
    this.setState(
      {
        confirmation: {
          ...this.state.confirmation,
          show: false,
        },
      },
      this.guardarBicicletas()
    );
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

        <ConfirmationPromprs
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Editar Producto</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Codigo</Form.Label>
              <Form.Control
                value={this.state.bicicleta.codigo}
                onChange={(e) => this.setValue("codigo", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                value={this.state.bicicleta.modelo}
                onChange={(e) => this.setValue("modelo", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Placa</Form.Label>
              <Form.Control
                value={this.state.bicicleta.placa}
                onChange={(e) => this.setValue("placa", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Rim</Form.Label>
              <Form.Control
                value={this.state.bicicleta.rim}
                onChange={(e) => this.setValue("rim", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Llanta</Form.Label>
              <Form.Control
                value={this.state.bicicleta.llanta}
                onChange={(e) => this.setValue("llanta", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Velocidades</Form.Label>
              <Form.Control
                value={this.state.bicicleta.velocidades}
                onChange={(e) => this.setValue("velocidades", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  confirmation: { ...this.state.confirmation, show: true },
                })
              }
            >
              Guardar Producto
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
