import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from '@icedesign/base';

export default class TypeTable extends Component {

  renderOperator = (value, index, record) => {
    const { deleteTypeToggle } = this.props;
    return (
      <div>
        <Button>查看</Button>
        <Button
        >
          修改
        </Button>
        <Button onClick={deleteTypeToggle}>删除</Button>
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
            cell={() => <Link to="/hd/model">模版列表</Link>}
            width={120} 
          />
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