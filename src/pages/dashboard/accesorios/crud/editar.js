import React from "react";
import { Container, Form, Row, Button } from "react-bootstrap";
import { request } from "../../../../components/helper/helper";
import Loading from "../../../../components/loading/loading";
import MessagePrompt from "../../../../components/prompts/message";
import ConfirmationPromprs from "../../../../components/prompts/confirmation";

export default class AccesoriosEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idAccesorio: this.props.getIdAccesorio(),
      rediret: false,
      message: {
        text: "",
        show: false,
      },
      confirmation: {
        title: "Modificar Accesorio",
        text: "¿Deseas modificar el accesorio?",
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
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.getAccesorio();
  }

  getAccesorio() {
    this.setState({ loading: true });
    request
      .get(`/accesorios/${this.state.idAccesorio}`)
      .then((response) => {
        this.setState({
          accesorio: response.data,
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
      accesorio: {
        ...this.state.accesorio,
        [index]: value,
      },
    });
  }

  guardarAccesorios() {
    this.setState({ loading: true });
    request
      .put(`/accesorios/${this.state.idAccesorio}`, this.state.accesorio)
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
      this.guardarAccesorios()
    );
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

        <ConfirmationPromprs
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Editar Accesorio</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Codigo</Form.Label>
              <Form.Control
                value={this.state.accesorio.codigo}
                onChange={(e) => this.setValue("codigo", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Accesorio</Form.Label>
              <Form.Control
                value={this.state.accesorio.accesorio_bc}
                onChange={(e) => this.setValue("accesorio_bc", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                value={this.state.accesorio.precio}
                onChange={(e) => this.setValue("precio", e.target.value)}
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
              Guardar Accesorio
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
