import React, { Component, Fragment } from "react";
import { Table, Button } from "@icedesign/base";
import Ticker from "./Ticker";

export default class PlanTable extends Component {
  renderOperator = (value, index, record) => {
    const {
      addPlanModalToggle,
      launchPlanModalToggle,
      deletePlanModalToggle,
      readOnly,
      setReLaunch,
      setPlanResult,
      dataSource
    } = this.props;
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
            {record &&
            record.launchStatus === 1 &&
            record.launchTimeType === 1 ? (
              <Button
                style={{ color: "rgb(51, 51, 51)" }}
                onClick={e => {
                  if (e.target.innerText !== "投放") {
                    return;
                  }
                  launchPlanModalToggle(record);
                }}
              >
                {/*投放中*/}
                <Ticker
                  launchLenTime={record.launchLenTime}
                  launchStartTime={record.launchStartTime}
                  setReLaunch={setReLaunch}
                  setPlanResult={setPlanResult}
                  planResult={dataSource}
                  index={index}
                />
              </Button>
            ) : null}
            {record && record.launchStatus === 2 ? (
              <Button
                onClick={() => {
                  launchPlanModalToggle(record);
                }}
              >
                投放
              </Button>
            ) : null}
            {record && record.launchStatus !== 3 ? (
              <Button
                onClick={() => {
                  deletePlanModalToggle(record);
                }}
              >
                下线
              </Button>
            ) : null}
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
          <Table.Column
            title="新增投放时间"
            dataIndex="createDate"
            width={80}
          />
          <Table.Column title="投放名称" dataIndex="launchName" width={120} />
          <Table.Column
            title="投放应用"
            dataIndex="interactionTypeName"
            width={120}
          />
          <Table.Column
            title="投放时间类型"
            dataIndex="launchTimeType"
            width={80}
            cell={value => {
              if (value === 0) {
                return <span>视频时间</span>;
              }
              if (value === 1) {
                return <span>即时</span>;
              }
              if (value === 2) {
                return <span>北京时间</span>;
              }
            }}
          />
          <Table.Column
            title="投放素材名称"
            dataIndex="creativeName"
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
                return <span>投放中</span>;
              }
              if (value === 2) {
                return <span>可投放</span>;
              }
              if (value === 3) {
                return <span>已下线</span>;
              }
            }}
          />
          <Table.Column title="操作" cell={this.renderOperator} width={180} />
        </Table>
      </div>
    );
  }
}
