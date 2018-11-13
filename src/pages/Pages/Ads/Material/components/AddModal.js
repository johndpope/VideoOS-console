import React, { Fragment } from "react";
import Form from "react-jsonschema-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Button, Feedback } from "@icedesign/base";
import uiSchema from "schemas/uiSchema";

import Bubbles from "./Bubbles";
import Votes from "./Votes";

const fieldsMap = {
  qipao: Bubbles,
  toupiao: Votes
};

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
  const isSpecial = ["qipao", "toupiao"].includes(
    materialSchema && materialSchema.key
  );
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
              showErrorList={false}
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
                "ui:field": "fields"
              }}
              fields={
                isSpecial
                  ? { fields: fieldsMap[materialSchema && materialSchema.key] }
                  : null
              }
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
                  if (error.name === "type") {
                    let msg = "";
                    if (error.params.type === "number") {
                      msg = "数值类型";
                    }
                    if (error.params.type === "integer") {
                      msg = "整型";
                    }
                    if (error.params.type === "boolean") {
                      msg = "布尔值";
                    }
                    if (error.params.type === "string") {
                      msg = "字符串";
                    }
                    error.message = msg;
                  }
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
                    error.message = "汉字、字母、数字组合";
                  }
                  if (error.name === "maxLength") {
                    error.message = `超过${error.params.limit}字符上限`;
                  }
                  if (error.name === "enum") {
                    if (error.params.allowedValues) {
                      error.message = "请选择";
                    }
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
              onSubmit={({ formData }) => {
                let canSubmit = true;
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
                if (
                  formData &&
                  formData.messages &&
                  formData.messages.length === 0
                ) {
                  Feedback.toast.error("请添加“对话内容”");
                  return;
                }
                if (
                  formData &&
                  formData.voteList &&
                  formData.voteList.length === 0
                ) {
                  Feedback.toast.error("请添加“信息选项”");
                  return;
                }
                if (
                  formData &&
                  formData.hasOwnProperty("messages") &&
                  formData.messages
                ) {
                  formData.messages.forEach(msg => {
                    if (msg.messageType === 1) {
                      if (!msg.content || typeof msg.content === "object") {
                        canSubmit = false;
                        Feedback.toast.error("“对话文本内容”不能为空哦");
                        return;
                      }
                    }
                    if (msg.messageType === 2) {
                      if (!msg.content || typeof msg.content !== "object") {
                        canSubmit = false;
                        Feedback.toast.error("“气泡图片”不能为空哦");
                        return;
                      }
                    }
                    if (msg.messageType === 3) {
                      if (!msg.messageButtons) {
                        canSubmit = false;
                        Feedback.toast.error("请输入左侧按钮必填信息");
                        return;
                      }
                      if (!msg.messageButtons[0]) {
                        canSubmit = false;
                        Feedback.toast.error("请输入左侧按钮必填信息");
                        return;
                      }
                      if (
                        msg.messageButtons[0] &&
                        !Boolean(msg.messageButtons[0].title)
                      ) {
                        canSubmit = false;
                        Feedback.toast.error("“左侧按钮文案”不能为空哦");
                        return;
                      }
                      if (
                        msg.messageButtons[0] &&
                        !Boolean(msg.messageButtons[0].link)
                      ) {
                        canSubmit = false;
                        Feedback.toast.error("“左侧按钮外链链接”不能为空哦");
                        return;
                      }
                      if (!msg.messageButtons[1]) {
                        canSubmit = false;
                        Feedback.toast.error("请输入右侧按钮必填信息");
                        return;
                      }
                      if (
                        msg.messageButtons[1] &&
                        !Boolean(msg.messageButtons[1].title)
                      ) {
                        canSubmit = false;
                        Feedback.toast.error("“右侧按钮文案”不能为空哦");
                        return;
                      }
                      if (
                        msg.messageButtons[1] &&
                        !Boolean(msg.messageButtons[1].link)
                      ) {
                        canSubmit = false;
                        Feedback.toast.error("“右侧按钮外链链接”不能为空哦");
                        return;
                      }
                    }

                    if (!msg.duration) {
                      canSubmit = false;
                      Feedback.toast.error("“展示持续时间”不能为空哦");
                      return;
                    }
                  });
                  if (!canSubmit) {
                    return;
                  }
                }
                if (isUpdate) {
                  updateMaterial({
                    creativeId: record.creativeId,
                    creativeName: formData.creativeName,
                    interactionTypeId: formData.interactionTypeId,
                    interactionTemplateId: formData.interactionTemplateId,
                    creativeContent: JSON.stringify(formData),
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
                      ],
                    creativeIdList:
                      (formData && formData.creativeIdList) || creativeIdList,
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
                    creativeIdList:
                      (formData && formData.creativeIdList) || creativeIdList,
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
