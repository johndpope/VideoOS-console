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
  getAdMaterials,
  addMaterialToggle,
  deleteMaterial,
  newMaterialDropDownToggle,
  deleteMaterialModalToggle,
  queryAllModelTypes,
  setCurrentPage
} from "./actions";
import reducer from "./reducer";
import MaterialTable from "./components/Table";
import DeleteMaterial from "./components/DeleteModal";

class AdMaterial extends Component {
  componentDidMount() {
    const { queryAllModelTypes, getAdMaterials } = this.props;
    queryAllModelTypes();
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
        <IceContainer style={{ overflow: "visible" }}>
          <Dropdown
            isOpen={adMaterial && adMaterial.shouldNewMaterialDropDownOpen}
            toggle={newMaterialDropDownToggle}
          >
            <DropdownToggle caret>新增素材</DropdownToggle>
            <DropdownMenu>
              {modelTypes &&
                Array.isArray(modelTypes) &&
                modelTypes.length > 0 &&
                modelTypes.map((mt, idx) => (
                  <DropdownItem
                    key={idx}
                    onClick={() => {
                      addMaterialToggle({
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
  queryAllModelTypes,
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
