import React, { Component } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
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
  setCurrentPage
} from "./actions";
import reducer from "./reducer";
import PlanTable from "./components/Table";
import AddPlan from "./components/AddModal";
import DeletePlan from "./components/DeleteModal";

class AdPlan extends Component {
  state = {
    currentPage: 1
  };

  componentDidMount() {
    const { getAdPlans, queryAllModelTypes } = this.props;
    getAdPlans();
    queryAllModelTypes();
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
      setCurrentPage
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
          formData={adPlan && adPlan.formData}
          materialTypes={adPlan && adPlan.materialTypes}
          record={adPlan && adPlan.record}
          currentPage={adPlan && adPlan.currentPage}
        />
        <DeletePlan
          toggle={deletePlanModalToggle}
          shouldOpen={adPlan && adPlan.shouldDeletePlanModalOpen}
          deletePlan={deletePlan}
          record={adPlan && adPlan.record}
          currentPage={adPlan && adPlan.currentPage}
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
        </IceContainer>
        <PlanTable
          isLoading={adPlan && adPlan.isLoading}
          dataSource={(adPlan && adPlan.planResult) || []}
          deletePlanModalToggle={deletePlanModalToggle}
          addPlanModalToggle={addPlanModalToggle}
          readOnly={
            authorList ? authorList.includes(AUTH_KEYS.PLAN_READ) : false
          }
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
  setCurrentPage
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
