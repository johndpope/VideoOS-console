import React, { Component } from "react";
import {
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from "reactstrap";
import { Pagination, Button } from "@icedesign/base";
import IceContainer from "@icedesign/container";
import { connect } from "react-redux";
import { compose } from "redux";
import { AUTH_KEYS } from "src/maps";
import { getUserInfoLocal } from "utils/authority";
import injectReducer from "utils/injectReducer";
import * as actions from "./actions";
import reducer from "./reducer";
import PlanTable from "./components/Table";
import DeletePlan from "./components/DeleteModal";
import LaunchPlan from "./components/LaunchModal";

let params = { pageSize: 20 };

class AdPlan extends Component {
  componentDidMount() {
    const { getAdPlans, queryAllModelTypes } = this.props;
    getAdPlans();
    queryAllModelTypes();
  }

  componentWillUnmount() {
    const { setCurrentPage } = this.props;
    setCurrentPage({
      currentPage: 1
    });
    params = { pageSize: 20 };
  }

  render() {
    const {
      adPlan,
      addPlanModalToggle,
      newPlanDropDownToggle,
      deletePlanModalToggle,
      launchPlanModalToggle,
      deletePlan,
      launchPlan,
      getAdPlans,
      setCurrentPage,
      setReLaunch
    } = this.props;
    const modelTypes = adPlan.modelTypes || [];
    const { authorList } = getUserInfoLocal();
    return (
      <div className="app">
        <DeletePlan
          toggle={deletePlanModalToggle}
          shouldOpen={adPlan && adPlan.shouldDeletePlanModalOpen}
          deletePlan={deletePlan}
          record={adPlan && adPlan.record}
          currentPage={adPlan && adPlan.currentPage}
          params={params}
        />
        <LaunchPlan
          toggle={launchPlanModalToggle}
          shouldOpen={adPlan && adPlan.shouldLaunchPlanModalOpen}
          launchPlan={launchPlan}
          record={adPlan && adPlan.record}
          currentPage={adPlan && adPlan.currentPage}
          params={params}
        />
        <IceContainer>
          <Button onClick={newPlanDropDownToggle}>新增投放计划</Button>
          <Row style={{ marginTop: "12px" }}>
            <Col>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>投放时间类型：</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="select"
                  onChange={e => {
                    params = {
                      ...params,
                      currentPage: (adPlan && adPlan.currentPage) || 1
                    };
                    if (e.target.value !== "-1") {
                      params.launchTimeType = e.target.value;
                    } else {
                      delete params.launchTimeType;
                    }
                    getAdPlans(params);
                  }}
                >
                  <option value="-1">全部</option>
                  <option value="0">视频时间</option>
                  <option value="1">即时</option>
                  <option value="2">北京时间</option>
                </Input>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>投放应用：</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="select"
                  onChange={e => {
                    params = {
                      ...params,
                      currentPage: (adPlan && adPlan.currentPage) || 1
                    };
                    if (e.target.value !== "-1") {
                      params.interactionTypeId = e.target.value;
                    } else {
                      delete params.interactionTypeId;
                    }
                    getAdPlans(params);
                  }}
                >
                  <option value="-1">全部</option>
                  {modelTypes &&
                    Array.isArray(modelTypes) &&
                    modelTypes.length > 0 &&
                    modelTypes.map((mt, idx) => (
                      <option key={idx} value={mt.interactionId}>
                        {mt.interactionTypeName}
                      </option>
                    ))}
                </Input>
              </InputGroup>
            </Col>
          </Row>
        </IceContainer>
        <PlanTable
          isLoading={adPlan && adPlan.isLoading}
          dataSource={(adPlan && adPlan.planResult) || []}
          deletePlanModalToggle={deletePlanModalToggle}
          launchPlanModalToggle={launchPlanModalToggle}
          addPlanModalToggle={addPlanModalToggle}
          setReLaunch={setReLaunch}
          readOnly={
            authorList ? authorList.includes(AUTH_KEYS.PLAN_READ) : false
          }
          currentPage={adPlan.currentPage || 1}
        />
        {adPlan && !adPlan.isLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              padding: "10px 0"
            }}
          >
            <Pagination
              total={adPlan.total}
              current={adPlan.currentPage || 1}
              pageSize={adPlan.pageSize || 20}
              onChange={currentPage => {
                setCurrentPage({
                  currentPage
                });
                getAdPlans({
                  ...params,
                  currentPage,
                  pageSize: 20
                });
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = {
  ...actions
};

const mapStateToProps = state => {
  return { adPlan: state.adPlan };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "adPlan", reducer });

export default compose(
  withReducer,
  withConnect
)(AdPlan);
