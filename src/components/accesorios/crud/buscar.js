import React from "react";
import { request } from "../../helper/helper";
import { Container, Row, Col } from "react-bootstrap";
//import './empleados.css';
import DataGrid from "../../grid/grid";
import ConfirmationPromprs from "../../prompts/confirmation";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";
import { set } from "react-ga";

const columns = [
  {
    dataField: "_id",
    text: "Product ID",
    hidden: true,
  },
  {
    dataField: "codigo",
    text: "Codigo",
  },
  {
    dataField: "accesorio_bc",
    text: "Accesorio",
  },
  {
    dataField: "precio",
    text: "Precio",
  },
];

export default class AccesoriosBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      idAccesorio: null,
      confirmation: {
        title: "Eliminar accesorio",
        text: "¿Deseas eliminar el accesorio?",
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
    this.props.setIdAccesorio(row._id);

    this.props.changeTab("editar");
  }

  onClickDeleteButton(row) {
    this.setState({
      idEmpleado: row._id,
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
      this.eliminarAccesorio()
    );
  }

  eliminarAccesorio() {
    this.setState({ loading: true });
    request
      .delete(`/accesorios/${this.state.idAccesorio}`)
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
      <Container id="accesorios-buscar-container">
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
          <h1>Buscar Accesorio</h1>
        </Row>
        <Row>
          <DataGrid
            url="/accesorios"
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
