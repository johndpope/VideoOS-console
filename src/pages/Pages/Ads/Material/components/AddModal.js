import React, { Fragment } from "react";
import Form from "react-jsonschema-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@icedesign/base";
import uiSchema from "schemas/uiSchema";

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
              uiSchema={uiSchema({
                isRead,
                isUpdate,
                setSwitcher,
                addMaterialFile,
                uiSchemaConf,
                formData
              })}
              onChange={({ formData }) => {
                let _materialSchema = { ...materialSchema };
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
                      if (
                        JSON.stringify(
                          _materialSchema.properties.closeAfter
                        ) !==
                        JSON.stringify(materialSchema.properties.closeAfter)
                      ) {
                        _materialSchema.properties.closeAfter = {};
                        setMaterialSchema(_materialSchema);
                      }
                    }
                  }
                }

                saveFormData(formData);
              }}
              onSubmit={({ formData }) => {
                const _formData = { ...formData };
                if (fileData && Object.keys(fileData).length > 0) {
                  for (let key in fileData) {
                    _formData[key] = fileData[key];
                  }
                }
                if (isUpdate) {
                  updateMaterial({
                    creativeId: record.creativeId,
                    creativeName: formData.creativeName,
                    interactionTypeId: formData.interactionTypeId,
                    interactionTemplateId: formData.interactionTemplateId,
                    creativeContent: JSON.stringify(_formData),
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
                    creativeContent: JSON.stringify(_formData),
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
