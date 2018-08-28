import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { addPlanModalToggle, newPlanDropDownToggle, getAdPlans, queryAllModelTypes, deletePlanModalToggle, addPlan, deletePlan, setFormData } from './actions';
import reducer from './reducer';
import PlanTable from './components/Table';
import AddPlan from './components/AddModal';
import DeletePlan from './components/DeleteModal';

class AdPlan extends Component {

  state = {
    currentPage: 1,
  }
  
  componentDidMount() {
    const { getAdPlans,queryAllModelTypes } = this.props;
    getAdPlans();
    queryAllModelTypes();
  }

  render() {
    const { adPlan, addPlanModalToggle, newPlanDropDownToggle, deletePlanModalToggle, addPlan, deletePlan, setFormData } = this.props;
    const modelTypes = adPlan.modelTypes || [];
    return (
      <div className="app">
        <AddPlan 
          toggle={() => addPlanModalToggle({})}
          shouldOpen={adPlan && adPlan.shouldAddPlanModalOpen}
          addPlan={addPlan}
          setFormData={setFormData}
          formData={adPlan && adPlan.formData}
          materialTypes={adPlan && adPlan.materialTypes}
        />
        <DeletePlan 
          toggle={deletePlanModalToggle}
          shouldOpen={adPlan && adPlan.shouldDeletePlanModalOpen}
          deletePlan={deletePlan}
        />
        <IceContainer style={{overflow: 'visible'}}>
          <Dropdown isOpen={adPlan && adPlan.shouldNewPlanDropDownOpen}
            toggle={newPlanDropDownToggle}
          >
            <DropdownToggle caret>
              新增投放计划
            </DropdownToggle>
            <DropdownMenu>
              {
                modelTypes && Array.isArray(modelTypes) && modelTypes.length > 0 && modelTypes.map((mt, idx) => (
                  <DropdownItem key={idx} onClick={() => {
                    addPlanModalToggle({interactionTypeId: mt.interactionId, interactionTypeName: mt.interactionTypeName})
                  }}>{mt.interactionTypeName}</DropdownItem>
                ))
              }
            </DropdownMenu>
          </Dropdown>
        </IceContainer>
        <PlanTable 
          isLoading={adPlan && adPlan.isLoading}
          dataSource={adPlan && adPlan.planResult || []}
          deletePlanModalToggle={deletePlanModalToggle}
          addPlanModalToggle={addPlanModalToggle}
        />
      </div>   
    ) 
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
  setFormData,
};

const mapStateToProps = (state) => {
  return { adPlan: state.adPlan };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'adPlan', reducer });

export default compose(
  withReducer,
  withConnect
)(AdPlan);