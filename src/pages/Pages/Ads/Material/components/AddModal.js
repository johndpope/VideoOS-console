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
  currentPage
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
          {materialSchema ? (
            <Form
              formData={formData}
              schema={materialSchema}
              uiSchema={uiSchema(
                isRead
                  ? {
                      ...addMaterialFile,
                      "ui:disabled": ["*"],
                      "ui:options": { disabled: true }
                    }
                  : { addMaterialFile }
              )}
              onChange={({ formData }) => {
                saveFormData(formData);
              }}
              onSubmit={({ formData }) => {
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
                        materialSchema.properties.interactionTemplateId.enum
                          ? materialSchema.properties.interactionTemplateId.enum.indexof(
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
                <Button type="primary" htmlType="submit">
                  {isUpdate ? "确认修改" : isRead ? "确认" : "确认新增"}
                </Button>
              </div>
            </Form>
          ) : null}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default AddMaterial;
