import React, { Component } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from "reactstrap";
import { Pagination } from "@icedesign/base";
import IceContainer from "@icedesign/container";
import { connect } from "react-redux";
import { compose } from "redux";
import { AUTH_KEYS } from "src/maps";
import { getUserInfoLocal } from "utils/authority";
import injectReducer from "utils/injectReducer";
import {
  addPlanModalToggle,
  newPlanDropDownToggle,
  getAdPlans,
  queryAllModelTypes,
  deletePlanModalToggle,
  addPlan,
  deletePlan,
  updatePlan,
  setFormData,
  setCurrentPage,
  setEditState
} from "./actions";
import reducer from "./reducer";
import PlanTable from "./components/Table";
import AddPlan from "./components/AddModal";
import DeletePlan from "./components/DeleteModal";

const isConflict = payload => {
  let status = false;
  const { launchTime, launchTimeLen, launchTimeType } = payload;
  if (Array.isArray(launchTime) && launchTime.length > 1) {
    let launchTimeLX = launchTime
      .join(",")
      .split(",")
      .map(lt => {
        const ltArr = lt.split(":");
        return Number(launchTimeType) !== 2
          ? Number(ltArr[0]) * 60 + Number(ltArr[1])
          : Number(ltArr[0]) * 60 * 60 + Number(ltArr[1]) * 60;
      });
    launchTimeLX = launchTimeLX.sort((val1, val2) => {
      let val = 0;
      if (val1 > val2) {
        val = 1;
      }
      if (val1 === val2) {
        val = 0;
      }
      if (val1 < val2) {
        val = -1;
      }
      return val;
    });
    const launchTimeWithIncrement = launchTimeLX.map(
      ltlx => ltlx + Number(launchTimeLen)
    );
    launchTimeWithIncrement.forEach((ltwi, idx) => {
      if (
        ltwi >= launchTimeLX[idx + 1] &&
        idx !== launchTimeWithIncrement.length - 1
      ) {
        status = true;
      }
    });
  }
  return status;
};

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
  }

  render() {
    const {
      adPlan,
      addPlanModalToggle,
      newPlanDropDownToggle,
      deletePlanModalToggle,
      addPlan,
      deletePlan,
      updatePlan,
      setFormData,
      getAdPlans,
      setCurrentPage,
      setEditState
    } = this.props;
    const modelTypes = adPlan.modelTypes || [];
    const { authorList } = getUserInfoLocal();
    return (
      <div className="app">
        <AddPlan
          toggle={() => addPlanModalToggle({})}
          shouldOpen={adPlan && adPlan.shouldAddPlanModalOpen}
          addPlan={addPlan}
          updatePlan={updatePlan}
          setFormData={setFormData}
          setEditState={setEditState}
          formData={adPlan && adPlan.formData}
          materialTypes={adPlan && adPlan.materialTypes}
          record={adPlan && adPlan.record}
          currentPage={adPlan && adPlan.currentPage}
          isEdit={adPlan && adPlan.isEdit}
          isConflict={isConflict}
        />
        <DeletePlan
          toggle={deletePlanModalToggle}
          shouldOpen={adPlan && adPlan.shouldDeletePlanModalOpen}
          deletePlan={deletePlan}
          record={adPlan && adPlan.record}
          currentPage={adPlan && adPlan.currentPage}
          params={params}
        />
        <IceContainer style={{ overflow: "visible" }}>
          <Dropdown
            isOpen={adPlan && adPlan.shouldNewPlanDropDownOpen}
            toggle={newPlanDropDownToggle}
          >
            <DropdownToggle caret>新增投放计划</DropdownToggle>
            <DropdownMenu>
              {modelTypes &&
                Array.isArray(modelTypes) &&
                modelTypes.length > 0 &&
                modelTypes.map((mt, idx) => (
                  <DropdownItem
                    key={idx}
                    onClick={() => {
                      addPlanModalToggle({
                        interactionTypeId: mt.interactionId,
                        interactionTypeName: mt.interactionTypeName
                      });
                    }}
                  >
                    {mt.interactionTypeName}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </Dropdown>
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
          addPlanModalToggle={addPlanModalToggle}
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
  newPlanDropDownToggle,
  addPlanModalToggle,
  getAdPlans,
  queryAllModelTypes,
  deletePlanModalToggle,
  deletePlan,
  addPlan,
  updatePlan,
  setFormData,
  setCurrentPage,
  setEditState
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
