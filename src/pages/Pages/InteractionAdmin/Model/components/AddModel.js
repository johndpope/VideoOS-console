import React, { Fragment } from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { Button, Feedback } from "@icedesign/base";

const AddModel = ({
  shouldOpen,
  toggle,
  addModel,
  updateModel,
  uploadModelFile,
  uploadModelFileInfo,
  modelTypes,
  record,
  setFormData,
  formData,
  downloadModelTemplateFile,
  updateModelFile,
  setFileIptState,
  modelInfo,
  showFileIpt,
  currentPage,
  setUploadModelFileInfo
}) => {
  const { opType } = record || {};
  const isRead = opType === "read";
  const isUpdate = opType === "update";

  return (
    <Fragment>
      <Modal isOpen={shouldOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {isRead ? "模板信息" : isUpdate ? "模板修改" : "新增主题"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>主题类型</InputGroupText>
              </InputGroupAddon>
              <Input
                type="select"
                disabled={isRead ? "disabled" : false}
                defaultValue={
                  isRead || isUpdate
                    ? formData && formData.interactionTypeId
                    : ""
                }
                onChange={e => {
                  setFormData({ interactionTypeId: e.target.value });
                }}
              >
                <option value="">请选择</option>
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
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>主题名称</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="请输入主题名称"
                disabled={isRead ? "disabled" : false}
                defaultValue={
                  isRead || isUpdate ? formData && formData.templateName : ""
                }
                onChange={e => {
                  setFormData({ interactionTemplateName: e.target.value });
                }}
                maxLength={10}
              />
            </InputGroup>
            {isRead ? (
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>主题文件</InputGroupText>
                </InputGroupAddon>
                <span>
                  <Button
                    onClick={() => {
                      downloadModelTemplateFile({
                        templateId: record && record.templateId
                      });
                    }}
                  >
                    点击下载
                  </Button>
                </span>
              </InputGroup>
            ) : (
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>文件上传</InputGroupText>
                </InputGroupAddon>
                <span
                  style={{
                    display: "flex",
                    flex: "1 1 auto",
                    width: "1%",
                    border: "1px solid rgb(228, 231, 234)",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {!((formData && formData.compressFileName) || showFileIpt) &&
                  isUpdate &&
                  (modelInfo && modelInfo.templateFileSourceName) ? (
                    <Button
                      onClick={() => {
                        setFileIptState({ showFileIpt: true });
                      }}
                    >
                      <span>{modelInfo.templateFileSourceName}</span>
                      <span>{`    x`}</span>
                    </Button>
                  ) : (
                    <Input
                      style={{ marginLeft: "8px" }}
                      type="file"
                      onChange={e => {
                        const { files } = e.target;
                        const templateFileSourceName =
                          files && files[0] && files[0].name;
                        if (!/.lua$/gi.test(templateFileSourceName)) {
                          Feedback.toast.error("请上传*.lua文件");
                          setUploadModelFileInfo({});
                          return;
                        }
                        setFormData({ templateFileSourceName });
                        if (isUpdate) {
                          updateModelFile({
                            templateId: record && record.templateId,
                            file: files && files[0]
                          });
                        } else {
                          uploadModelFile({ file: files && files[0] });
                        }
                      }}
                    />
                  )}
                </span>
              </InputGroup>
            )}
          </Form>
          {/*<div>
            注：需上传压缩文件格式(*.lua)。且同一个主题下，文件名不能重名哦。
          </div>*/}
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>取消</Button>
          <Button
            type="primary"
            onClick={() => {
              if (isRead) {
                toggle && toggle();
                return;
              }
              if (!formData) {
                Feedback.toast.error("请输入完整信息");
                return;
              }
              if (!formData.interactionTypeId) {
                Feedback.toast.error("请选择“主题类型”");
                return;
              }
              if (
                !formData.hasOwnProperty("interactionTemplateName") &&
                isUpdate
              ) {
                formData.interactionTemplateName = formData.templateName;
              }
              if (!formData.interactionTemplateName) {
                Feedback.toast.error("请输入“主题名称”");
                return;
              }
              if (!(formData && formData.templateName) && isUpdate) {
                Feedback.toast.error("请输入“主题名称”");
                return;
              }
              if (
                uploadModelFileInfo &&
                uploadModelFileInfo.resMsg &&
                uploadModelFileInfo.resMsg === "模版在使用中，不能更新"
              ) {
                Feedback.toast.error(uploadModelFileInfo.resMsg);
                return;
              }
              if (!uploadModelFileInfo.compressFileName && !isUpdate) {
                Feedback.toast.error("请上传.lua主题文件");
                return;
              }
              if (isUpdate) {
                if (
                  showFileIpt
                    ? !(
                        uploadModelFileInfo &&
                        uploadModelFileInfo.compressFileName
                      )
                    : !(modelInfo && modelInfo.templateFileSourceName)
                ) {
                  Feedback.toast.error("请上传.lua主题文件");
                  return;
                }
                updateModel({
                  interactionTemplateId: record && record.templateId,
                  ...formData,
                  ...uploadModelFileInfo,
                  currentPage
                });
              } else {
                addModel({
                  ...formData,
                  ...uploadModelFileInfo,
                  currentPage
                });
              }
            }}
          >
            {isUpdate ? "确认修改" : isRead ? "确认" : "确认新增"}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default AddModel;
