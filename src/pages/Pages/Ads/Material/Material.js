import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { addMaterialToggle, addMaterial, newMaterialDropDownToggle, queryAllModelTypes, addMaterialFile } from './actions';
import reducer from './reducer';
import MaterialTable from './components/Table';
import AddMaterial from './components/AddModal';

class AdMaterial extends Component {

  state = {
    currentPage: 1,
  }
  
  componentDidMount() {
    const { queryAllModelTypes } = this.props;
    queryAllModelTypes();
  }

  render() {
    const { adMaterial, addMaterialToggle, addMaterial, newMaterialDropDownToggle, deleteMaterialModalToggle, addMaterialFile } = this.props;
    const modelTypes = adMaterial.modelTypes || [];
    return (
      <div className="app">
        <AddMaterial 
          toggle={addMaterialToggle}
          materialSchema={adMaterial && adMaterial.materialSchema}
          formData={adMaterial && adMaterial.formData}
          shouldOpen={adMaterial && adMaterial.shouldAddMaterialOpen}
          addMaterialFile={addMaterialFile}
          addMaterial={addMaterial}
        />
        <IceContainer style={{overflow: 'visible'}}>
          <Dropdown isOpen={adMaterial && adMaterial.shouldNewMaterialDropDownOpen}
            toggle={newMaterialDropDownToggle}
          >
            <DropdownToggle caret>
              新增素材
            </DropdownToggle>
            <DropdownMenu>
              {
                modelTypes && Array.isArray(modelTypes) && modelTypes.length > 0 && modelTypes.map((mt, idx) => (
                  <DropdownItem key={idx} onClick={() => {
                    addMaterialToggle({interactionTypeId: mt.interactionId, interactionTypeName: mt.interactionTypeName})
                  }}>{mt.interactionTypeName}</DropdownItem>
                ))
              }
            </DropdownMenu>
          </Dropdown>
        </IceContainer>
        <MaterialTable 
          isLoading={adMaterial && adMaterial.isLoading}
          dataSource={adMaterial && adMaterial.materialResult}
          deleteMaterialModalToggle={deleteMaterialModalToggle}
          addMaterialToggle={addMaterialToggle}
        />
      </div>   
    ) 
  }  
}

const mapDispatchToProps = {
  newMaterialDropDownToggle,
  addMaterialToggle,
  queryAllModelTypes,
  addMaterialFile,
  addMaterial,
};

const mapStateToProps = (state) => {
  return { adMaterial: state.adMaterial };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'adMaterial', reducer });

export default compose(
  withReducer,
  withConnect
)(AdMaterial);