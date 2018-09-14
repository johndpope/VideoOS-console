import React, { Component, Fragment } from "react";
import { Table, Button } from "@icedesign/base";

export default class ModalTable extends Component {
  renderOperator = (value, index, record) => {
    const { addModelToggle, deleteModelModalToggle, readOnly } = this.props;
    return (
      <div>
        <Button
          onClick={() => {
            addModelToggle({ ...record, opType: "read" });
          }}
        >
          查看
        </Button>
        {!readOnly ? (
          <Fragment>
            <Button
              onClick={() => {
                addModelToggle({ ...record, opType: "update" });
              }}
            >
              修改
            </Button>
            <Button
              onClick={() => {
                deleteModelModalToggle(record);
              }}
            >
              删除
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
            width={60}
            cell={(value, index, record) => <span>{index + 1}</span>}
          />
          <Table.Column title="创建日期" dataIndex="createDate" width={80} />
          <Table.Column
            title="模板类型"
            dataIndex="interactionTypeName"
            width={80}
          />
          <Table.Column title="模板名称" dataIndex="templateName" width={120} />
          <Table.Column title="操作" cell={this.renderOperator} width={140} />
        </Table>
      </div>
    );
  }
}
