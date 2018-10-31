import React, { Component, Fragment } from "react";
import { Table, Button } from "@icedesign/base";

export default class LogTable extends Component {
  render() {
    const { dataSource, isLoading } = this.props;
    return (
      <div className="animated fadeIn">
        <Table dataSource={dataSource} hasBorder={false} isLoading={isLoading}>
          <Table.Column title="序号" width={60} dataIndex="id" />
          <Table.Column title="修改时间" dataIndex="createdDate" width={80} />
          <Table.Column title="操作人" dataIndex="username" width={60} />
          <Table.Column
            title="修改内容"
            dataIndex="operationDesc"
            width={120}
          />
        </Table>
      </div>
    );
  }
}
