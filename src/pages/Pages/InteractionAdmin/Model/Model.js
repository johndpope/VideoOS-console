import React, { Component } from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { Button, Pagination } from "@icedesign/base";
import IceContainer from "@icedesign/container";
import { connect } from "react-redux";
import { compose } from "redux";
import { AUTH_KEYS } from "src/maps";
import { getUserInfoLocal } from "utils/authority";
import injectReducer from "utils/injectReducer";
import {
  getIaModels,
  addModelToggle,
  addModel,
  uploadModelFile,
  queryAllModelTypes,
  deleteModel,
  deleteModelModalToggle,
  updateModel,
  setFormData,
  downloadModelTemplateFile,
  updateModelFile,
  setCurrentPage,
  setFileIptState,
  setUploadModelFileInfo
} from "./actions";
import reducer from "./reducer";
import ModalTable from "./components/Table";
import AddModel from "./components/AddModel";
import DeleteModel from "./components/DeleteModal";

class IAModel extends Component {
  componentDidMount() {
    const options = {
      currentPage: 1,
      pageSize: 20
    };
    const { getIaModels, queryAllModelTypes, location } = this.props;
    const lType = location && location.state && location.state.type;
    if (lType) {
      options.interactionTypeId = lType;
    }
    getIaModels(options);
    queryAllModelTypes();
  }

  componentWillUnmount() {
    const { setCurrentPage } = this.props;
    setCurrentPage({
      currentPage: 1
    });
  }

  render() {
    const {
      getIaModels,
      iaModel,
      addModelToggle,
      addModel,
      updateModel,
      uploadModelFile,
      deleteModel,
      deleteModelModalToggle,
      location,
      setFormData,
      downloadModelTemplateFile,
      updateModelFile,
      setCurrentPage,
      setFileIptState,
      setUploadModelFileInfo
    } = this.props;
    const modelTypes = iaModel.modelTypes || [];
    const lType = location && location.state && location.state.type;
    const { authorList } = getUserInfoLocal();
    return (
      <div className="app">
        <AddModel
          shouldOpen={iaModel && iaModel.shouldAddModelModalOpen}
          toggle={() => addModelToggle({})}
          addModel={addModel}
          updateModel={updateModel}
          uploadModelFile={uploadModelFile}
          uploadModelFileInfo={iaModel.uploadModelFileInfo || {}}
          modelTypes={modelTypes}
          record={iaModel && iaModel.record}
          setFormData={setFormData}
          formData={iaModel && iaModel.formData}
          modelInfo={iaModel && iaModel.modelInfo}
          showFileIpt={iaModel && iaModel.showFileIpt}
          downloadModelTemplateFile={downloadModelTemplateFile}
          updateModelFile={updateModelFile}
          setFileIptState={setFileIptState}
          currentPage={iaModel && iaModel.currentPage}
          setUploadModelFileInfo={setUploadModelFileInfo}
        />
        <DeleteModel
          deleteModel={deleteModel}
          shouldOpen={iaModel && iaModel.shouldDeleteModelModalOpen}
          toggle={() => {
            deleteModelModalToggle(iaModel.record);
          }}
          record={iaModel.record}
          currentPage={iaModel && iaModel.currentPage}
        />
        <IceContainer>
          <Button onClick={() => addModelToggle({})}>新增主题</Button>
          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>应用：</InputGroupText>
            </InputGroupAddon>
            <Input
              type="select"
              name="type"
              defaultValue={lType}
              onChange={e => {
                const params = {
                  currentPage: iaModel.currentPage || 1,
                  pageSize: 20
                };
                if (e.target.value !== "-1") {
                  params.interactionTypeId = e.target.value;
                }
                getIaModels(params);
              }}
            >
              <option value="-1">全部</option>
              {modelTypes &&
                Array.isArray(modelTypes) &&
                modelTypes.length > 0 &&
                modelTypes.map((mt, idx) => (
                  <option key={idx} value={mt.interactionId}>
                    {mt.interactionTypeName}
                  </option>
                ))}
            </Input>
          </InputGroup>
        </IceContainer>
        <ModalTable
          isLoading={iaModel && iaModel.isLoading}
          dataSource={(iaModel && iaModel.modelResult) || []}
          deleteModelModalToggle={deleteModelModalToggle}
          addModelToggle={addModelToggle}
          readOnly={
            authorList ? authorList.includes(AUTH_KEYS.MODEL_READ) : false
          }
          currentPage={iaModel.currentPage || 1}
        />
        {iaModel && !iaModel.isLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              padding: "10px 0"
            }}
          >
            <Pagination
              total={iaModel.total}
              current={iaModel.currentPage || 1}
              pageSize={iaModel.pageSize || 20}
              onChange={currentPage => {
                const options = {
                  currentPage,
                  pageSize: 20
                };
                const { location } = this.props;
                const lType = location && location.state && location.state.type;
                if (lType) {
                  options.interactionTypeId = lType;
                }
                setCurrentPage({ currentPage });
                getIaModels(options);
              }}
            />
          </div>
        ) : null}
      </div>
    );
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
  setFormData,
  downloadModelTemplateFile,
  updateModelFile,
  setCurrentPage,
  setFileIptState,
  setUploadModelFileInfo
};

const mapStateToProps = state => {
  return { iaModel: state.iaModel };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "iaModel", reducer });

export default compose(
  withReducer,
  withConnect
)(IAModel);
