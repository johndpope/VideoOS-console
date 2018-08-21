import React, { Component } from 'react';
import { Table, Button } from '@icedesign/base';

export default class MaterialTable extends Component {

  renderOperator = (value, index, record) => {
    const { addMaterialToggle, deleteMaterialModalToggle } = this.props;
    return (
      <div>
        <Button onClick={() => {addMaterialToggle({...record, opType: 'read'})}}>查看</Button>
        <Button onClick={() => {addMaterialToggle({...record, opType: 'update'})}}
        >
          修改
        </Button>
        <Button onClick={() => {deleteMaterialModalToggle(record)}}>删除</Button>
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
          <Table.Column title="新增时间" dataIndex="createDate" width={120} />
          <Table.Column title="素材名称" dataIndex="creativeName" width={120} />
          <Table.Column title="素材类型" dataIndex="interactionId" width={120} />
          <Table.Column title="素材使用状态" dataIndex="creativeStatus" width={120} 
            cell={(value) => {
              if (value === 0) {
                return (<span>未使用</span>)  
              }  
              if (value === 1) {
                return (<span>使用中</span>)  
              } 
            }}
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