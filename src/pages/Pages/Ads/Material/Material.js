import React, { Component } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { Pagination, Button } from "@icedesign/base";
import IceContainer from "@icedesign/container";
import { connect } from "react-redux";
import { compose } from "redux";
import { AUTH_KEYS } from "src/maps";
import { getUserInfoLocal } from "utils/authority";
import injectReducer from "utils/injectReducer";
import {
  getAdMaterials,
  addMaterialToggle,
  deleteMaterial,
  newMaterialDropDownToggle,
  deleteMaterialModalToggle,
  setCurrentPage
} from "./actions";
import reducer from "./reducer";
import MaterialTable from "./components/Table";
import DeleteMaterial from "./components/DeleteModal";

class AdMaterial extends Component {
  componentDidMount() {
    const { getAdMaterials } = this.props;
    getAdMaterials();
  }

  componentWillUnmount() {
    const { setCurrentPage } = this.props;
    setCurrentPage({
      currentPage: 1
    });
  }

  render() {
    const {
      adMaterial,
      addMaterialToggle,
      deleteMaterial,
      newMaterialDropDownToggle,
      deleteMaterialModalToggle,
      getAdMaterials,
      setCurrentPage
    } = this.props;
    const modelTypes = adMaterial.modelTypes || [];
    const { authorList } = getUserInfoLocal();
    return (
      <div className="app">
        <DeleteMaterial
          deleteMaterial={deleteMaterial}
          toggle={deleteMaterialModalToggle}
          shouldOpen={adMaterial && adMaterial.shouldDeleteMaterialOpen}
          record={adMaterial && adMaterial.record}
          currentPage={adMaterial && adMaterial.currentPage}
        />
        <IceContainer>
          <Button onClick={newMaterialDropDownToggle}>新增素材</Button>
        </IceContainer>
        <MaterialTable
          isLoading={adMaterial && adMaterial.isLoading}
          dataSource={(adMaterial && adMaterial.materialResult) || []}
          deleteMaterialModalToggle={deleteMaterialModalToggle}
          addMaterialToggle={addMaterialToggle}
          readOnly={
            authorList ? authorList.includes(AUTH_KEYS.MATERIAL_READ) : false
          }
          currentPage={adMaterial.currentPage || 1}
        />
        {adMaterial && !adMaterial.isLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              padding: "10px 0"
            }}
          >
            <Pagination
              total={adMaterial.total}
              current={adMaterial.currentPage || 1}
              pageSize={adMaterial.pageSize || 20}
              onChange={currentPage => {
                setCurrentPage({ currentPage });
                getAdMaterials({
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
  newMaterialDropDownToggle,
  deleteMaterialModalToggle,
  addMaterialToggle,
  getAdMaterials,
  deleteMaterial,
  setCurrentPage
};

const mapStateToProps = state => {
  return { adMaterial: state.adMaterial };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "adMaterial", reducer });

export default compose(
  withReducer,
  withConnect
)(AdMaterial);
