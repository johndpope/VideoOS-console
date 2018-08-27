import React, { Component } from 'react';
import { Table, Button } from '@icedesign/base';

export default class ModalTable extends Component {

  renderOperator = (value, index, record) => {
    const { addModelToggle, deleteModelModalToggle } = this.props;
    return (
      <div>
        <Button onClick={() => {addModelToggle({...record, opType: 'read'})}}>查看</Button>
        <Button onClick={() => {addModelToggle({...record, opType: 'update'})}}
        >
          修改
        </Button>
        <Button onClick={() => {deleteModelModalToggle(record)}}>删除</Button>
      </div>
    );
  };  
  
  render() {
    const { dataSource, isLoading } = this.props
    return (
      <div className="animated fadeIn">
        <Table
          dataSource={ dataSource }
          hasBorder={false}
          isLoading={isLoading}
        >
          <Table.Column title="序号" width={120} 
            cell={(value, index, record) => (<span>{index}</span>)}
          />  
          <Table.Column title="创建日期" dataIndex="createDate" width={120} />
          <Table.Column title="模板类型" dataIndex="templateId" width={120} />
          <Table.Column title="模板名称" dataIndex="templateName" width={120} />
          <Table.Column title="操作" 
            cell={this.renderOperator}
            width={120}
          />
        </Table>
      </div>  
    )
  }  
}