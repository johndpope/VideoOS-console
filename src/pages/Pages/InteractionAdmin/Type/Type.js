import React, { Component, Fragment } from 'react';
import { Button, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { getIaTypes, addTypeToggle, deleteTypeToggle, deleteType, addType, updateType } from './actions';
import reducer from './reducer';
import TypeTable from './components/Table';
import AddType from './components/AddType';
import DeleteType from './components/DeleteType';

class IAType extends Component {

  state = {
    currentPage: 1,
  }

  componentDidMount() {
    const { getIaTypes } = this.props
    getIaTypes()
  }
  
  render() {
    const { iaType, addTypeToggle, deleteTypeToggle, deleteType, addType, updateType } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="app">
        <AddType 
          shouldOpen={iaType && iaType.shouldAddTypeModalOpen} 
          toggle={addTypeToggle}
          addType={addType}
          updateType={updateType}
          record={iaType.record}
        />
        <DeleteType 
          deleteType={deleteType} 
          shouldOpen={iaType && iaType.shouldDeleteTypeModalOpen} 
          toggle={() => {deleteTypeToggle(iaType.record)}}
          record={iaType.record}
        />
        <IceContainer>
          <Button onClick={addTypeToggle}>新增类型</Button>
        </IceContainer>
        <IceContainer>
          <TypeTable 
            isLoading={iaType && iaType.isLoading}
            dataSource={iaType && iaType.typeResult}
            deleteTypeToggle={deleteTypeToggle}
            addTypeToggle={addTypeToggle}
          /> 
          {
            iaType && !iaType.isLoading ? (
              <Pagination 
                total={iaType.total}
                current={currentPage}
                pageSize={iaType.pageSize || 20}
              />
            ) : null
          }
        </IceContainer>
      </div>   
    ) 
  }  
}

const mapDispatchToProps = {
  getIaTypes,
  addTypeToggle,
  deleteTypeToggle,
  deleteType,
  addType,
  updateType,
};
  
const mapStateToProps = (state) => {
  return { iaType: state.iaType };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'iaType', reducer });

export default compose(
  withReducer,
  withConnect
)(IAType);