import React, { Component, Fragment } from "react";
import { Table, Button } from "@icedesign/base";

export default class PlanTable extends Component {
  renderOperator = (value, index, record) => {
    const { addPlanModalToggle, deletePlanModalToggle, readOnly } = this.props;
    return (
      <div>
        <Button
          onClick={() => {
            addPlanModalToggle({ ...record, opType: "read" });
          }}
        >
          查看
        </Button>
        {!readOnly ? (
          <Fragment>
            <Button
              onClick={() => {
                addPlanModalToggle({ ...record, opType: "update" });
              }}
            >
              修改
            </Button>
            <Button
              onClick={() => {
                deletePlanModalToggle(record);
              }}
            >
              下线
            </Button>
          </Fragment>
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
          <Table.Column
            title="新增投放时间"
            dataIndex="createDate"
            width={80}
          />
          <Table.Column title="投放名称" dataIndex="launchName" width={120} />
          <Table.Column
            title="投放素材名称"
            dataIndex="creativeName"
            width={120}
          />
          <Table.Column
            title="投放类型"
            dataIndex="interactionTypeName"
            width={120}
          />
          <Table.Column
            title="投放状态"
            dataIndex="launchStatus"
            width={60}
            cell={value => {
              if (value === 0) {
                return <span>审核不通过</span>;
              }
              if (value === 1) {
                return <span>审核通过</span>;
              }
              if (value === 2) {
                return <span>待审核</span>;
              }
              if (value === 3) {
                return <span>关闭</span>;
              }
            }}
          />
          <Table.Column title="操作" cell={this.renderOperator} width={140} />
        </Table>
      </div>
    );
  }
}
