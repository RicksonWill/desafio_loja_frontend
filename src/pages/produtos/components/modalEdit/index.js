import React, { Component } from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import api from '../../../../service/api'
import { success, error } from '../../../../utils/toast'

export default class ModalEdit extends Component {
  state = {
    name: "",
    cod: "",
    value: "",
    qtd: "",
    id: null,
    errors: {}
  };

  LoadData = () =>{
    const {name,cod, value, qtd, id} = this.props.itemSelect;
    this.setState({name,cod, value, qtd, id})
  }

  clear = () => {
    this.setState({name: "",cod: "", value:"", qtd:""})
  }

  onSave = async () => {
    const { name, cod, value, qtd, id } = this.state;
    const errors = this.validateForm();
    if(errors){
      error("Preencha todos os campos obrigatórios!");
      return;
    }
    try {
      let data = {"name": name, "cod": cod, "value": value, "qtd": qtd};
      await api.put(`/produto/${id}/`, data);
      success("Produto salvo com sucesso!");
      this.props.callback(false);
    } catch (error) {
      error("Ops... algum problema")
    }
  }

  validateForm = () => {
    const errors = {};
    const {name, cod, value, qtd} = this.state;

    if (name === "") {
      errors["name"] = true;
    }
    if (cod === "") {
      errors["cod"] = true;
    }
    if (value === "") {
      errors["value"] = true;
    }
    if (qtd === "") {
      errors["qtd"] = true;
    }
    
    this.setState({ errors });
    return Object.keys(errors).length;
  };

  clear = () => {
    this.setState({name: "",cod: "", value:"", qtd:""})
  };

  render() {
    const {name, cod, value, qtd, errors} = this.state;

    return (
      <Modal
        onClose={() => {this.props.callback(false)}}
        onMount={()=> this.LoadData()}
        onUnmount={()=> this.clear()}
        open={this.props.show}
      >
        <Modal.Header>Editar Produto: {this.props.itemSelect.name } </Modal.Header>
        <Modal.Content >
          <Form>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <Form.Input
              label="Nome"
              placeholder="Produto de boa qualidade"
              name="name"
              value={name}
              maxLength="30"
              error={errors["name"] ? true : false}
              onChange={(e)=>this.setState({name: e.target.value})}
              required
              width={10}
            />
            <Form.Input
              label="Código"
              placeholder="22883044"
              name="cod"
              value={cod}
              maxLength="30"
              error={errors["cod"] ? true : false}
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
              value={value}
              maxLength="6"
              error={errors["value"] ? true : false}
              onChange={(e)=>this.setState({value: e.target.value})}
              width={7}
            />
            <Form.Input
              label="Quantidade"
              placeholder="3"
              required
              type="number"
              value={qtd}
              maxLength="6"
              error={errors["qtd"] ? true : false}
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
            content="Salvar"
            labelPosition='right'
            icon='checkmark'
            onClick={() => {this.onSave()}}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  }
}
