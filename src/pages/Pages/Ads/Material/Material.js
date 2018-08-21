import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { addMaterialToggle, newMaterialDropDownToggle } from './actions';
import reducer from './reducer';
import MaterialTable from './components/Table';
import AddMaterial from './components/AddModal';

class AdMaterial extends Component {

  state = {
    currentPage: 1,
  }
  
  componentDidMount() {
  }

  render() {
    const { adMaterial, addMaterialToggle, newMaterialDropDownToggle, deleteMaterialModalToggle } = this.props;
    return (
      <div className="app">
        <AddMaterial 
          toggle={addMaterialToggle}
          shouldOpen={adMaterial && adMaterial.shouldAddMaterialOpen}
        />
        <IceContainer style={{overflow: 'visible'}}>
          <Dropdown isOpen={adMaterial && adMaterial.shouldNewMaterialDropDownOpen}
            toggle={newMaterialDropDownToggle}
          >
            <DropdownToggle caret>
              新增素材
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => {
                addMaterialToggle({whickKind: 'YUN_TU'})
              }}>云图</DropdownItem>
              <DropdownItem onClick={() => {
                addMaterialToggle({whickKind: 'ZHONG_CHA'})
              }}>中插</DropdownItem>
              <DropdownItem onClick={() => {
                addMaterialToggle({whickKind: 'QI_PAO'})
              }}>气泡</DropdownItem>
              <DropdownItem onClick={() => {
                addMaterialToggle({whickKind: 'HONG_BAO'})
              }}>红包</DropdownItem>
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