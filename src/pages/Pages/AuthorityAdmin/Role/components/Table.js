import React, { Component } from 'react';
import { Row, Col, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Label } from 'reactstrap';
import { Table, Button } from '@icedesign/base';

export default class RoleTable extends Component {

  renderOperator = (value, index, record) => {
    return (
      <div>
        <a>查看</a>
        <a
        >
          修改
        </a>
        <a>删除</a>
      </div>
    );
  };  
  
  render() {
    
    return (
      <div className="animated fadeIn">
        <Table>
          <Table.Column title="序号" dataIndex="" width={120} />  
          <Table.Column title="创建日期" dataIndex="createDate" width={120} />
          <Table.Column title="账号名称" dataIndex="userName" width={120} />
          <Table.Column title="角色" dataIndex="roleName" width={120} />
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