import React, { Component } from "react";
import { Button, Dropdown, Table, Icon} from 'semantic-ui-react'
import ModalAdd from './components/modalAdd'
import ModalDelete from './components/modalDelete'
import ModalEdit from './components/modalEdit'
import 'semantic-ui-css/semantic.min.css'
import api from '../../service/api'
import { error } from '../../utils/toast'

import './styles.css'
class Produtos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSeach:[{text:"oi", value:1}],
      data: [],
      deleteModal: false,
      addModal: false,
      editModal: false,
      showModalAdd: false,
      itemSelect: {},
      isEmpty: false
    };
  }
  componentDidMount(){
    document.title = "DesafioFPF - Produtos";
    this.loadData();
  }

  loadData = async ()  => {
    try {
      const { data:produtos}  = await api.get('/produto/');
      produtos.length === 0 ?this.setState({isEmpty: true}):this.setState({isEmpty: false})
      this.setState({data: produtos}); 
    } catch (e) {
      error("Ops... algum problema na conexão");
      this.setState({isEmpty: true});
    }
  }
  
  render() {
    const { dataSeach, data, deleteModal,editModal, showModalAdd, itemSelect, isEmpty } = this.state;
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
        {isEmpty ? 
        <div className="isEmpty">
          Nenhum produto encontrado &#128533;
        </div>
        :
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
            {data.map((item,i)=>(
              <Table.Row key={i}>
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
        }
        <ModalAdd
          show={showModalAdd}
          callback={(value) => {
            this.setState({ showModalAdd: value });
            this.loadData();
          }}
          />
        <ModalDelete
          show={deleteModal}
          itemSelect={itemSelect}
          callback={(value) => {
            this.setState({ deleteModal: value });
            this.loadData();
          }}
          />
        <ModalEdit
          show={editModal}
          itemSelect={itemSelect}
          callback={(value) => {
            this.setState({ editModal: value });
            this.loadData();
          }}
        />
      </div>
    );
  }
}
export default Produtos;
