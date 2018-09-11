import React, { Component } from 'react';
import { Table, Button } from '@icedesign/base';

export default class AccountTable extends Component {

  renderOperator = (value, index, record) => {
    const { addAccountModalToggle, deleteAccountModalToggle } = this.props;
    return (
      <div>
        <Button onClick={() => {addAccountModalToggle({...record, opType: 'update'})}}
        >
          修改
        </Button>
        <Button onClick={() => {deleteAccountModalToggle(record)}}>删除</Button>
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
            cell={(value, index, record) => (<span>{index + 1}</span>)}
          />  
          <Table.Column title="创建日期" dataIndex="createDate" width={120} />
          <Table.Column title="账号名称" dataIndex="userName" width={120} />
          <Table.Column title="角色" dataIndex="roleName" width={120} />
          <Table.Column title="操作" 
            cell={this.renderOperator}
            width={120}
          />
        </Table>
      </div>  
    )
  }  
}