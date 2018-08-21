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
        <IceContainer style={{overflow: 'visible'}}>
          <Dropdown isOpen={adMaterial && adMaterial.shouldNewMaterialDropDownOpen}
            toggle={newMaterialDropDownToggle}
          >
            <DropdownToggle caret>
              新增素材
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header onClick={addMaterialToggle}>云图</DropdownItem>
              <DropdownItem onClick={addMaterialToggle}>中插</DropdownItem>
              <DropdownItem onClick={addMaterialToggle}>气泡</DropdownItem>
              <DropdownItem onClick={addMaterialToggle}>红包</DropdownItem>
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