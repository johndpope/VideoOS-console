import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "@icedesign/base";

export default class TypeTable extends Component {
  renderOperator = (value, index, record) => {
    const { deleteTypeToggle, addTypeToggle, readOnly } = this.props;
    return (
      <div>
        <Button
          onClick={() => {
            addTypeToggle({ ...record, opType: "read" });
          }}
        >
          查看
        </Button>
        {!readOnly ? (
          <Fragment>
            <Button
              onClick={() => {
                addTypeToggle({ ...record, opType: "update" });
              }}
            >
              修改
            </Button>
            <Button
              onClick={() => {
                deleteTypeToggle(record);
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
    const { dataSource, isLoading, currentPage } = this.props;
    return (
      <div className="animated fadeIn">
        <Table dataSource={dataSource} hasBorder={false} isLoading={isLoading}>
          <Table.Column
            title="序号"
            width={60}
            cell={(value, index, record) => (
              <span>
                {index + (currentPage ? (currentPage - 1) * 20 : 0) + 1}
              </span>
            )}
          />
          <Table.Column title="创建日期" dataIndex="createDate" width={80} />
          <Table.Column
            title="应用名称"
            dataIndex="interactionTypeName"
            width={120}
          />
          <Table.Column
            title="主题"
            cell={(value, index, record) => (
              <Link
                to={{
                  pathname: "/hd/model",
                  state: { type: record.interactionTypeId }
                }}
              >
                主题列表
              </Link>
            )}
            width={60}
          />
          <Table.Column title="操作" cell={this.renderOperator} width={140} />
        </Table>
      </div>
    );
  }
}
