import React, { Component } from "react";
import { Modal, Button } from "semantic-ui-react";

export default class ModalDelete extends Component {
  state = {
    name: "",
    cnpj: "",
    address: "",
    serviceType: "",
    description: "",
    contact: "",
    phone: "",
    showModalNew: this.props.show,
  };

  render() {
    const {} = this.state;

    return (
      <Modal
        onClose={() => {this.props.callback(false)}}
        open={this.props.show}
      >
        <Modal.Header>Excluir</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <p>Deseja realmente apagar o item: {this.props.itemSelect.name} ?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' basic onClick={() => {this.props.callback(false)}}>
            Cancelar
          </Button>
          <Button
            content="Deletar"
            labelPosition='right'
            icon='checkmark'
            onClick={() => {}}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  }
}
