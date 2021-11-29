import React from "react";
import { request } from "../../../../components/helper/helper";
import { Container, Row, Col } from "react-bootstrap";
//import './empleados.css';
import DataGrid from "../../../../components/grid/grid";
import ConfirmationPromprs from "../../../../components/prompts/confirmation";
import Loading from "../../../../components/loading/loading";
import MessagePrompt from "../../../../components/prompts/message";
import { set } from "react-ga";

const columns = [
  {
    dataField: "codigo",
    text: "Id_Repuesto",
  },
  {
    dataField: "repuesto_bc",
    text: "Repuesto",
  },
  {
    dataField: "precio",
    text: "Precio",
  },
];

export default class RepuestosBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      idRepuesto: null,
      confirmation: {
        title: "Eliminar repuesto",
        text: "¿Deseas eliminar el repuesto?",
        show: false,
      },
      message: {
        text: "",
        show: false,
      },
    };

    this.onClickEditButton = this.onClickEditButton.bind(this);
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onClickEditButton(row) {
    this.props.setIdRepuesto(row._id);

    this.props.changeTab("editar");
  }

  onClickDeleteButton(row) {
    this.setState({
      idERepuesto: row._id,
      confirmation: {
        ...this.state.confirmation,
        show: true,
      },
    });
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
      this.eliminarRepuesto()
    );
  }

  eliminarRepuesto() {
    this.setState({ loading: true });
    request
      .delete(`/repuestos/${this.state.idRepuesto}`)
      .then((response) => {
        this.setState({
          loading: false,
          message: {
            text: response.data.msg,
            show: true,
          },
        });
        if (response.data.exito) this.reloadPage();
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  }

  render() {
    return (
      <Container id="repuestos-buscar-container">
        <ConfirmationPromprs
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />

        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Buscar repuesto</h1>
        </Row>
        <Row>
          <DataGrid
            url="/repuestos"
            columns={columns}
            showEditButton={true}
            showDeleteButton={true}
            onClickEditButton={this.onClickEditButton}
            onClickDeleteButton={this.onClickDeleteButton}
          />
        </Row>
      </Container>
    );
  }
}
