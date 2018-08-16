import React, { Component } from 'react';
import { Row, Col, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Label } from 'reactstrap';
import { Table, Button } from '@icedesign/base';

export default class RoleTable extends Component {

  renderOperator = (value, index, record) => {
    const { addRoleModalToggle, deleteRoleModalToggle } = this.props;
    return (
      <div>
        <Button onClick={() => {addRoleModalToggle({...record, opType: 'read'})}}>查看</Button>
        <Button onClick={() => {addRoleModalToggle({...record, opType: 'update'})}}
        >
          修改
        </Button>
        <Button onClick={() => {deleteRoleModalToggle(record)}}>删除</Button>
      </div>
    );
  };  
  
  render() {
    const { dataSource, isLoading } = this.props;
    return (
      <div className="animated fadeIn">
        <Table
          dataSource={ dataSource }
          hasBorder={false}
          isLoading={isLoading}
        >
          <Table.Column title="序号" width={120} 
            cell={(value, index, record) => (<span>{Number(index) + 1}</span>)}
          />  
          <Table.Column title="创建日期" dataIndex="createDate" width={120} />
          <Table.Column title="角色名称" dataIndex="roleName" width={120} />
          <Table.Column title="权限" dataIndex="roleDesc" width={120} />
          <Table.Column title="操作" 
            cell={this.renderOperator}
            lock="right"
            width={120}
          />
        </Table>
      </div>  
    )
  }  
}