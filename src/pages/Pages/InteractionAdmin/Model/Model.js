import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { getIaModels, addModelToggle, addModel, uploadModelFile, queryAllModelTypes, deleteModel, deleteModelModalToggle, updateModel } from './actions';
import reducer from './reducer';
import ModalTable from './components/Table';
import AddModel from './components/AddModel';
import DeleteModel from './components/DeleteModal';

class IAModel extends Component {

  state = {
    currentPage: 1,
  }
  
  componentDidMount() {
    const { getIaModels, queryAllModelTypes } = this.props
    getIaModels();
    queryAllModelTypes();
  }

  render() {
    const { currentPage } = this.state;
    const { getIaModels, iaModel, addModelToggle, addModel, updateModel, uploadModelFile, deleteModel, deleteModelModalToggle } = this.props;
    const modelTypes = iaModel.modelTypes || [];
    return (
      <div className="app">
        <AddModel 
          shouldOpen={iaModel && iaModel.shouldAddModelModalOpen} 
          toggle={addModelToggle}
          addModel={addModel}
          updateModel={updateModel}
          uploadModelFile={uploadModelFile}
          uploadModelFileInfo={iaModel.uploadModelFileInfo || {}}
          modelTypes={modelTypes}
          record={iaModel.record}
        />
        <DeleteModel
          deleteModel={deleteModel} 
          shouldOpen={iaModel && iaModel.shouldDeleteModelModalOpen} 
          toggle={() => {deleteModelModalToggle(iaModel.record)}}
          record={iaModel.record}
        />
        <IceContainer>
          <Button onClick={addModelToggle}>新增模版</Button>
          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                类型：
              </InputGroupText>
            </InputGroupAddon>
            <Input type="select" name="type"
              onChange={e => {
                const params = {
                  currentPage,
                  pageSize: 20,
                };
                if (e.target.value !== '-1') {
                  params.interactionTypeId = e.target.value;
                }
                getIaModels(params)
              }}
            >
              <option value="-1">全部</option>
            {
              modelTypes && Array.isArray(modelTypes) && modelTypes.length > 0 && modelTypes.map((mt, idx) => (
                <option key={idx} value={mt.interactionId}>{mt.interactionTypeName}</option>
              ))
            }
            </Input>
          </InputGroup>
        </IceContainer>
        <ModalTable 
          isLoading={iaModel && iaModel.isLoading}
          dataSource={iaModel && iaModel.modelResult}
          deleteModelModalToggle={deleteModelModalToggle}
          addModelToggle={addModelToggle}
        />
      </div>   
    ) 
  }  
}

const mapDispatchToProps = {
  getIaModels,
  addModelToggle,
  addModel,
  uploadModelFile,
  queryAllModelTypes,
  deleteModel,
  deleteModelModalToggle,
  updateModel,
};

const mapStateToProps = (state) => {
  return { iaModel: state.iaModel };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'iaModel', reducer });

export default compose(
  withReducer,
  withConnect
)(IAModel);