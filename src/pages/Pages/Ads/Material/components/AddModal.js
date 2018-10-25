import React, { Fragment } from "react";
import Form from "react-jsonschema-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Button, Feedback } from "@icedesign/base";
import uiSchema from "schemas/uiSchema";

import Bubbles from "./Bubbles";

const AddMaterial = ({
  shouldOpen,
  toggle,
  creativeIdList,
  addMaterial,
  updateMaterial,
  formData,
  saveFormData,
  record,
  materialSchema,
  addMaterialFile,
  currentPage,
  fileData,
  setSwitcher,
  uiSchemaConf,
  setMaterialSchema
}) => {
  const { opType } = record || {};
  const isRead = opType === "read";
  const isUpdate = opType === "update";
  return (
    <Fragment>
      <Modal isOpen={shouldOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {isRead ? "素材信息" : isUpdate ? "素材修改" : "新增素材"}
        </ModalHeader>
        <ModalBody>
          {materialSchema && typeof materialSchema === "object" ? (
            <Form
              formData={formData}
              schema={materialSchema}
              // noValidate
              noHtml5Validate
              showErrorList={true}
              uiSchema={{
                ...uiSchema({
                  isRead,
                  isUpdate,
                  setSwitcher,
                  addMaterialFile,
                  uiSchemaConf,
                  formData,
                  saveFormData
                }),
                "ui:field": "bubbles"
              }}
              ErrorList={props => {
                const { errors } = props;
                return (
                  <div>
                    {errors.map((error, idx) => {
                      return <li key={idx}>{error.stack}</li>;
                    })}
                  </div>
                );
              }}
              transformErrors={errors => {
                return errors.map(error => {
                  if (error.name === "format") {
                    error.message = "必选项";
                  }
                  if (error.name === "minItems") {
                    error.message = "必选项";
                  }
                  if (error.name === "required") {
                    error.message = "必填项";
                  }
                  if (error.name === "pattern") {
                    error.message = "汉字、字母、数字、下划线组合";
                  }
                  if (error.name === "maxLength") {
                    error.message = `超过${error.params.limit}字符上限`;
                  }
                  return error;
                });
              }}
              onChange={({ formData }) => {
                let _materialSchema = { ...materialSchema };
                // if (fileData && Object.keys(fileData).length > 0) {
                //   for (let key in fileData) {
                //     formData[key] = fileData[key];
                //   }
                // }
                if (
                  formData.hasOwnProperty("isShowClose") &&
                  formData.hasOwnProperty("closeAfter")
                ) {
                  if (formData.isShowClose) {
                    if (
                      JSON.stringify(_materialSchema.properties.closeAfter) !==
                      JSON.stringify(materialSchema.properties.closeAfter)
                    ) {
                      _materialSchema.properties.closeAfter = {
                        type: "integer",
                        title: "广告播放多久后可关闭"
                      };
                      setMaterialSchema(_materialSchema);
                    }
                  } else {
                    if (
                      _materialSchema &&
                      _materialSchema.properties &&
                      _materialSchema.properties.closeAfter
                    ) {
                      _materialSchema.properties.closeAfter = {};
                      setMaterialSchema(_materialSchema);
                      // if (
                      //   JSON.stringify(
                      //     _materialSchema.properties.closeAfter
                      //   ) !==
                      //   JSON.stringify(materialSchema.properties.closeAfter)
                      // ) {
                      //   _materialSchema.properties.closeAfter = {};
                      //   setMaterialSchema(_materialSchema);
                      // }
                    }
                  }
                }

                saveFormData(formData);
              }}
              fields={{ bubbles: Bubbles }}
              onSubmit={({ formData }) => {
                if (
                  formData &&
                  formData.hasOwnProperty("imageUrl") &&
                  !formData.imageUrl
                ) {
                  Feedback.toast.error("请上传图片");
                  return;
                }
                if (
                  formData &&
                  formData.hasOwnProperty("videoUrl") &&
                  !formData.videoUrl
                ) {
                  Feedback.toast.error("请上传视频");
                  return;
                }
                if (isUpdate) {
                  updateMaterial({
                    creativeId: record.creativeId,
                    creativeName: formData.creativeName,
                    interactionTypeId: formData.interactionTypeId,
                    interactionTemplateId: formData.interactionTemplateId,
                    creativeContent: JSON.stringify(formData),
                    creativeIdList,
                    currentPage
                  });
                } else if (isRead) {
                  toggle && toggle();
                } else {
                  addMaterial({
                    currentPage,
                    creativeName: formData.creativeName,
                    interactionTypeId: formData.interactionTypeId,
                    interactionTemplateId: formData.interactionTemplateId,
                    creativeContent: JSON.stringify(formData),
                    creativeIdList,
                    interactionTypeName:
                      materialSchema &&
                      materialSchema.properties &&
                      materialSchema.properties.interactionTypeId &&
                      materialSchema.properties.interactionTypeId.enumNames &&
                      materialSchema.properties.interactionTypeId.enumNames[0],
                    interactionTemplateName:
                      materialSchema &&
                      materialSchema.properties &&
                      materialSchema.properties.interactionTemplateId &&
                      materialSchema.properties.interactionTemplateId
                        .enumNames &&
                      materialSchema.properties.interactionTemplateId.enumNames[
                        materialSchema.properties.interactionTemplateId.enum &&
                        Array.isArray(
                          materialSchema.properties.interactionTemplateId.enum
                        )
                          ? materialSchema.properties.interactionTemplateId.enum.indexOf(
                              formData.interactionTemplateId
                            )
                          : 0
                      ]
                  });
                }
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  onClick={() => {
                    toggle();
                  }}
                >
                  取消
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "8px" }}
                >
                  {isUpdate ? "确认修改" : isRead ? "确认" : "确认新增"}
                </Button>
              </div>
            </Form>
          ) : (
            <p>类型文件格式存在问题，请检查</p>
          )}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default AddMaterial;
