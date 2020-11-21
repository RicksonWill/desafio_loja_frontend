import React, { Component } from "react";
import { Button, Dropdown, Table, Icon} from 'semantic-ui-react'
import ModalAdd from './components/modalAdd'
import ModalDelete from './components/modalDelete'
import ModalEdit from './components/modalEdit'
import 'semantic-ui-css/semantic.min.css'

import './styles.css'
class Produtos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSeach:[{text:"oi", value:1}],
      data: [
        {name: "Moto G6 Plus",cod:"2266717",value:1663.99,qtd:15},
        {name: "J5 Pro",cod:"54354",value:2233.99,qtd:15},
        {name: "Moto X4",cod:"76544",value:3643.99,qtd:15},
        {name: "SLg Q6",cod:"12643",value:4664.99,qtd:15},
        {name: "Moto G5s",cod:"002348",value:4264.99,qtd:15},
      ],
      deleteModal: false,
      addModal: false,
      editModal: false,
      showModalAdd: false,
      itemSelect: {}

    };
  }
  componentDidMount(){
    document.title = "DesafioFPF - Produtos";
  }

  
  render() {
    const { dataSeach, data, deleteModal,editModal, showModalAdd, itemSelect } = this.state;
    return (
      <div className="wrapper-pd">
        <div className="top-pd">
          <div>Produtos</div>
          <Button 
            primary 
            labelPosition='left'
            icon
            onClick={() => {this.setState({ showModalAdd: true})}}
          >
            <Icon name='add' />
            Adicionar
          </Button>
        </div>
        <Dropdown
          placeholder='Pesquisa Nome/Código'
          fluid
          search
          selection
          options={dataSeach}
          icon='search'
          noResultsMessage="Nenhum produto encontrado."
        />
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Código</Table.HeaderCell>
              <Table.HeaderCell>Preço</Table.HeaderCell>
              <Table.HeaderCell textAlign="center" >Quantidade</Table.HeaderCell>
              <Table.HeaderCell textAlign="center" >Ação</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((item)=>(
              <Table.Row>
                <Table.Cell >{item.name}</Table.Cell>
                <Table.Cell >{item.cod} </Table.Cell>
                <Table.Cell >R$ {item.value}</Table.Cell>
                <Table.Cell textAlign="center" >{item.qtd}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Icon circular link inverted color="blue" name="edit outline" onClick={()=> this.setState({itemSelect: item, editModal: true})}/>
                  <Icon circular link inverted color="red" name="trash alternate outline" onClick={()=> this.setState({itemSelect: item, deleteModal: true})}/>
                </Table.Cell>
              </Table.Row>

            ))}
          </Table.Body>
        </Table>
        <ModalAdd
          show={showModalAdd}
          callback={(value) => {
            this.setState({ showModalAdd: value });
          }}
        />
        <ModalDelete
          show={deleteModal}
          itemSelect={itemSelect}
          callback={(value) => {
            this.setState({ deleteModal: value });
          }}
          />
        <ModalEdit
          show={editModal}
          itemSelect={itemSelect}
          callback={(value) => {
            this.setState({ editModal: value });
          }}
        />
      </div>
    );
  }
}
export default Produtos;
