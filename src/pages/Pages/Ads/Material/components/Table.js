import React, { Component, Fragment } from "react";
import { Table, Button } from "@icedesign/base";

export default class MaterialTable extends Component {
  renderOperator = (value, index, record) => {
    const {
      addMaterialToggle,
      deleteMaterialModalToggle,
      readOnly
    } = this.props;
    const shouldShow = record && record.creativeStatus === 0;
    return (
      <div>
        <Button
          onClick={() => {
            addMaterialToggle({
              interactionTypeId: record.interactionId,
              interactionTypeName: record.interactionName,
              creativeId: record.creativeId,
              opType: "read"
            });
          }}
        >
          查看
        </Button>
        {!readOnly ? (
          shouldShow ? (
            <Fragment>
              <Button
                onClick={() => {
                  addMaterialToggle({
                    interactionTypeId: record.interactionId,
                    interactionTypeName: record.interactionName,
                    creativeId: record.creativeId,
                    opType: "update"
                  });
                }}
              >
                修改
              </Button>
              <Button
                onClick={() => {
                  deleteMaterialModalToggle(record);
                }}
              >
                删除
              </Button>
            </Fragment>
          ) : null
        ) : null}
      </div>
    );
  };

  render() {
    const { dataSource, isLoading } = this.props;
    return (
      <div className="animated fadeIn">
        <Table dataSource={dataSource} hasBorder={false} isLoading={isLoading}>
          <Table.Column
            title="序号"
            width={40}
            cell={(value, index, record) => <span>{index + 1}</span>}
          />
          <Table.Column title="新增时间" dataIndex="createDate" width={80} />
          <Table.Column title="素材名称" dataIndex="creativeName" width={120} />
          <Table.Column
            title="素材类型"
            dataIndex="interactionName"
            width={120}
          />
          <Table.Column
            title="素材使用状态"
            dataIndex="creativeStatus"
            width={80}
            cell={value => {
              if (value === 0) {
                return <span>未使用</span>;
              }
              if (value === 1) {
                return <span>使用中</span>;
              }
            }}
          />
          <Table.Column title="操作" cell={this.renderOperator} width={140} />
        </Table>
      </div>
    );
  }
}
