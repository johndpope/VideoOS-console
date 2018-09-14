import React, { Component, Fragment } from "react";
import { Table, Button } from "@icedesign/base";

export default class RoleTable extends Component {
  renderOperator = (value, index, record) => {
    const { addRoleModalToggle, deleteRoleModalToggle, readOnly } = this.props;
    return (
      <div>
        <Button
          onClick={() => {
            addRoleModalToggle({ ...record, opType: "read" });
          }}
        >
          查看
        </Button>
        {!readOnly ? (
          <Fragment>
            <Button
              onClick={() => {
                addRoleModalToggle({ ...record, opType: "update" });
              }}
            >
              修改
            </Button>
            <Button
              onClick={() => {
                deleteRoleModalToggle(record);
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
            width={40}
            cell={(value, index, record) => <span>{Number(index) + 1}</span>}
          />
          <Table.Column title="创建日期" dataIndex="createDate" width={80} />
          <Table.Column title="角色名称" dataIndex="roleName" width={100} />
          <Table.Column title="权限" dataIndex="roleDesc" width={160} />
          <Table.Column title="操作" cell={this.renderOperator} width={140} />
        </Table>
      </div>
    );
  }
}
