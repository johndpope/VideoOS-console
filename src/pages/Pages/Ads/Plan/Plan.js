import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { addPlanToggle, newPlanDropDownToggle } from './actions';
import reducer from './reducer';
import PlanTable from './components/Table';

class AdPlan extends Component {

  state = {
    currentPage: 1,
  }
  
  componentDidMount() {
  }

  render() {
    const { adPlan, addPlanToggle, newPlanDropDownToggle, deletePlanModalToggle } = this.props;
    return (
      <div className="app">
        <IceContainer style={{overflow: 'visible'}}>
          <Dropdown isOpen={adPlan && adPlan.shouldNewPlanDropDownOpen}
            toggle={newPlanDropDownToggle}
          >
            <DropdownToggle caret>
              新增投放计划
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header onClick={addPlanToggle}>云图</DropdownItem>
              <DropdownItem onClick={addPlanToggle}>中插</DropdownItem>
              <DropdownItem onClick={addPlanToggle}>气泡</DropdownItem>
              <DropdownItem onClick={addPlanToggle}>红包</DropdownItem>
              <DropdownItem onClick={addPlanToggle}>卡牌</DropdownItem>
              <DropdownItem onClick={addPlanToggle}>投票</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </IceContainer>
        <PlanTable 
          isLoading={adPlan && adPlan.isLoading}
          dataSource={adPlan && adPlan.planResult}
          deletePlanModalToggle={deletePlanModalToggle}
          addPlanToggle={addPlanToggle}
        />
      </div>   
    ) 
  }  
}

const mapDispatchToProps = {
  newPlanDropDownToggle,
  addPlanToggle,
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