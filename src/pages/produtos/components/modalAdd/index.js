import React, { Component } from "react";
import { Modal, Form, Button } from "semantic-ui-react";

export default class ModalAdd extends Component {
  state = {
    name: "",
    cod: "",
    preco: null,
    qtd: null,
  };


  render() {
    const {name, cod, preco, qtd} = this.state;

    return (
      <Modal
        onClose={() => {this.props.callback(false)}}
        onOpen={() => this.setState({deleteModal: true})}
        open={this.props.show}
      >
        <Modal.Header>Adicionar Produto</Modal.Header>
        <Modal.Content >
          <Form>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <Form.Input
              label="Nome"
              placeholder="Produto de boa qualidade"
              name="name"
              value={name}
              onChange={(e)=>this.setState({name: e.target.value})}
              required
              width={10}
            />
            <Form.Input
              label="Código"
              placeholder="22883044"
              name="cod"
              value={cod}
              onChange={(e)=>this.setState({cod: e.target.value})}
              required
              width={5}
            />
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <Form.Input
              label="Preço"
              placeholder="1,99"
              required
              type="number"
              name="value"
              value={preco}
              onChange={(e)=>this.setState({preco: e.target.value})}
              width={7}
            />
            <Form.Input
              label="Quantidade"
              placeholder="3"
              required
              type="number"
              value={qtd}
              onChange={(e)=>this.setState({qtd: e.target.value})}
              name="cod"
              width={8}
            />
            </div>

          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' basic onClick={() => {this.props.callback(false)}}>
            Cancelar
          </Button>
          <Button
            content="Adicionar"
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
