import React, { Component } from "react";
import querystring from "querystring";
import Form from "react-jsonschema-form";
import { connect } from "react-redux";
import { compose } from "redux";
import injectReducer from "utils/injectReducer";
import { Button, Feedback } from "@icedesign/base";
import uiSchema from "schemas/uiSchema";

import * as actions from "./actions";
import reducer from "./reducer";

import Poster from "./components/Poster";
import MidVideo from "./components/MidVideo";
import Bubbles from "./components/Bubbles";
import Votes from "./components/Votes";
import Cards from "./components/Cards";
import RedPacket from "./components/RedPacket";

const fieldsMap = {
  yuntu: Poster,
  zhongcha: MidVideo,
  qipao: Bubbles,
  toupiao: Votes,
  kapai: Cards,
  hongbao: RedPacket
};

let opType;
let qs;

class MaterialCRUD extends Component {
  componentDidMount() {
    const {
      getIaTypeById,
      getAdMaterialInfo,
      location,
      saveFormData
    } = this.props;
    qs = querystring.parse(location && location.search.substring(1));
    getIaTypeById({
      interactionId: qs.id,
      interactionTypeName: qs.interactionTypeName
    });
    saveFormData({ interactionTypeName: qs.interactionTypeName });
    if (qs && ["read", "update"].includes(qs.opType)) {
      opType = qs.opType;
      saveFormData({ creativeId: qs && qs.creativeId });
      getAdMaterialInfo({ creativeId: qs && qs.creativeId });
    }
  }

  componentWillUnmount() {
    const { saveFormData } = this.props;
    qs = null;
    opType = null;
    saveFormData("refresh");
  }

  render() {
    const {
      materialCRUDResult,
      setSwitcher,
      addMaterialFile,
      uiSchemaConf,
      saveFormData,
      setMaterialSchema,
      updateMaterial,
      creativeIdList,
      addMaterial,
      goBack
    } = this.props;
    const { formData = {}, materialSchema } = materialCRUDResult;
    const isRead = opType === "read";
    const isUpdate = opType === "update";
    const isSpecial = [
      "yuntu",
      "zhongcha",
      "qipao",
      "toupiao",
      "kapai",
      "hongbao"
    ].includes(materialSchema && materialSchema.key);
    return (
      <div className="app">
        <h3>{(qs && qs.interactionTypeName) || ""}</h3>
        {Boolean(materialSchema) ? (
          <Form
            style={{ width: "100%" }}
            formData={formData}
            schema={materialSchema}
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
                formData.hasOwnProperty("messages") &&
                formData.messages &&
                formData.messages.length === 0
              ) {
                Feedback.toast.error("请添加“对话内容”");
                return;
              }
              if (
                formData &&
                formData.hasOwnProperty("voteList") &&
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
              if (formData && formData.hasOwnProperty("collect")) {
                if (formData.collect.linkType === 2) {
                  if (!formData.collect.linkUrl) {
                    Feedback.toast.error("“跳转至H5”不能为空哦");
                    return;
                  }
                } else if (formData.collect.linkType === 1) {
                  if (!formData.success) {
                    Feedback.toast.error("必填项不能为空哦");
                    return;
                  }
                  if (!formData.success.itemId) {
                    Feedback.toast.error("“道具ID”不能为空哦");
                    return;
                  }
                  if (!formData.success.title) {
                    Feedback.toast.error("“领奖成功弹窗标题”不能为空哦");
                    return;
                  }
                }
              }
              if (isUpdate) {
                updateMaterial({
                  creativeId: formData.creativeId || (qs && qs.creativeId),
                  creativeName: formData.creativeName,
                  interactionTypeId: formData.interactionTypeId,
                  interactionTemplateId: formData.interactionTemplateId,
                  creativeContent: JSON.stringify(formData),
                  interactionTemplateName:
                    materialSchema &&
                    materialSchema.properties &&
                    materialSchema.properties.interactionTemplateId &&
                    materialSchema.properties.interactionTemplateId.enumNames &&
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
                    (formData && formData.creativeIdList) || creativeIdList
                });
              } else if (isRead) {
                // toggle && toggle();
              } else {
                addMaterial({
                  creativeName: formData.creativeName,
                  interactionTypeId: formData.interactionTypeId,
                  interactionTemplateId: formData.interactionTemplateId,
                  creativeContent: JSON.stringify(formData),
                  creativeIdList:
                    (formData && formData.creativeIdList) || creativeIdList,
                  interactionTypeName: formData.interactionTypeName,
                  interactionTemplateName:
                    materialSchema &&
                    materialSchema.properties &&
                    materialSchema.properties.interactionTemplateId &&
                    materialSchema.properties.interactionTemplateId.enumNames &&
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
              <Button onClick={goBack}>返回</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: "8px" }}
              >
                {isUpdate ? "确认修改" : isRead ? "确认" : "确认新增"}
              </Button>
            </div>
          </Form>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = {
  ...actions
};

const mapStateToProps = state => {
  return { materialCRUDResult: state.materialCRUD };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "materialCRUD", reducer });

export default compose(
  withReducer,
  withConnect
)(MaterialCRUD);
