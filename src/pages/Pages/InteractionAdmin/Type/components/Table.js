import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from '@icedesign/base';

export default class TypeTable extends Component {

  renderOperator = (value, index, record) => {
    const { deleteTypeToggle, addTypeToggle } = this.props;
    return (
      <div>
        <Button onClick={() => {addTypeToggle({...record, opType: 'read'})}}>查看</Button>
        <Button onClick={() => {addTypeToggle({...record, opType: 'update'})}}
        >
          修改
        </Button>
        <Button onClick={() => {deleteTypeToggle(record)}}>删除</Button>
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
          <Table.Column title="序号" dataIndex="interactionTypeId" width={120} />  
          <Table.Column title="创建日期" dataIndex="createDate" width={120} />
          <Table.Column title="类型名称" dataIndex="interactionTypeName" width={120} />
          <Table.Column title="模板" 
            cell={(value, index, record) => <Link to={{
              pathname: "/hd/model",
              state: {type: record.interactionTypeId}
            }} >模版列表</Link>}
            width={120} 
          />
          <Table.Column title="操作" 
            cell={this.renderOperator}
            width={120}
          />
        </Table>
      </div>  
    )
  }
};