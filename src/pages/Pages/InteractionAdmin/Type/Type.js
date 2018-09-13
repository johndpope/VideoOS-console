import React, { Component } from "react";
import { Button, Pagination } from "@icedesign/base";
import IceContainer from "@icedesign/container";
import { connect } from "react-redux";
import { compose } from "redux";
import injectReducer from "utils/injectReducer";
import {
  getIaTypes,
  addTypeToggle,
  deleteTypeToggle,
  deleteType,
  addType,
  updateType,
  setFormData,
  setFileIptState,
  setCurrentPage
} from "./actions";
import reducer from "./reducer";
import TypeTable from "./components/Table";
import AddType from "./components/AddType";
import DeleteType from "./components/DeleteType";

class IAType extends Component {
  componentDidMount() {
    const { getIaTypes } = this.props;
    getIaTypes();
  }

  render() {
    const {
      iaType,
      addTypeToggle,
      deleteTypeToggle,
      deleteType,
      addType,
      updateType,
      setFormData,
      setFileIptState,
      getIaTypes,
      setCurrentPage
    } = this.props;
    return (
      <div className="app">
        <AddType
          shouldOpen={iaType && iaType.shouldAddTypeModalOpen}
          toggle={() => addTypeToggle({})}
          addType={addType}
          updateType={updateType}
          record={iaType.record}
          setFormData={setFormData}
          setFileIptState={setFileIptState}
          formData={iaType && iaType.formData}
          configInfo={iaType && iaType.configInfo}
          fileName={iaType && iaType.fileName}
          showFileIpt={iaType && iaType.showFileIpt}
          currentPage={iaType && iaType.currentPage}
        />
        <DeleteType
          deleteType={deleteType}
          shouldOpen={iaType && iaType.shouldDeleteTypeModalOpen}
          toggle={() => {
            deleteTypeToggle(iaType.record);
          }}
          record={iaType.record}
          currentPage={iaType && iaType.currentPage}
        />
        <IceContainer>
          <Button onClick={() => addTypeToggle({})}>新增类型</Button>
        </IceContainer>
        <IceContainer>
          <TypeTable
            isLoading={iaType && iaType.isLoading}
            dataSource={(iaType && iaType.typeResult) || []}
            deleteTypeToggle={deleteTypeToggle}
            addTypeToggle={addTypeToggle}
          />
          {iaType && !iaType.isLoading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                padding: "10px 0"
              }}
            >
              <Pagination
                total={iaType.total}
                current={iaType.currentPage || 1}
                pageSize={iaType.pageSize || 20}
                onChange={currentPage => {
                  setCurrentPage({
                    currentPage
                  });
                  getIaTypes({
                    currentPage,
                    pageSize: 20
                  });
                }}
              />
            </div>
          ) : null}
        </IceContainer>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getIaTypes,
  addTypeToggle,
  deleteTypeToggle,
  deleteType,
  addType,
  updateType,
  setFormData,
  setFileIptState,
  setCurrentPage
};

const mapStateToProps = state => {
  return { iaType: state.iaType };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "iaType", reducer });

export default compose(
  withReducer,
  withConnect
)(IAType);
