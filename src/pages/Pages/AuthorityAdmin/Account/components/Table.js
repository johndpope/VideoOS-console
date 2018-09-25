import React, { Component, Fragment } from "react";
import { Table, Button } from "@icedesign/base";

export default class AccountTable extends Component {
  renderOperator = (value, index, record) => {
    const {
      addAccountModalToggle,
      deleteAccountModalToggle,
      readOnly
    } = this.props;
    return (
      <div>
        {!readOnly && (record && !record.isSuperRole) ? (
          <Fragment>
            <Button
              onClick={() => {
                addAccountModalToggle({ ...record, opType: "update" });
              }}
            >
              修改
            </Button>
            <Button
              onClick={() => {
                deleteAccountModalToggle(record);
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
            width={40}
            cell={(value, index, record) => (
              <span>
                {index + (currentPage ? (currentPage - 1) * 20 : 0) + 1}
              </span>
            )}
          />
          <Table.Column title="创建日期" dataIndex="createDate" width={80} />
          <Table.Column title="账号名称" dataIndex="userName" width={120} />
          <Table.Column title="角色" dataIndex="roleName" width={100} />
          <Table.Column title="操作" cell={this.renderOperator} width={120} />
        </Table>
      </div>
    );
  }
}
