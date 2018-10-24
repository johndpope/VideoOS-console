import React, { Fragment } from "react";
import Form from "react-jsonschema-form";
import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";
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
                "ui:field": "bubbles"
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
              // ArrayFieldTemplate={props => {
              //   if (["角色"].includes(props.title)) {
              //     return (
              //       <div key={props.idSchema.$id}>
              //         <label style={{ display: "block" }}>{props.title}*</label>
              //         {props.items.map((element, idx) => {
              //           const { idSchema, readonly, required, formData } = element.children.props;
              //           return (
              //             <div
              //               key={idSchema.$id}
              //               className={element.className}
              //               style={{
              //                 display: "flex",
              //                 flexDirection: "row"
              //               }}
              //             >
              //               <input
              //                 key={idSchema.roleAvatar.$id}
              //                 type="file"
              //                 name={formData.roleAvatar}
              //                 onChange={e => {
              //                   addMaterialFile({
              //                     file: e.target.files[0],
              //                   });
              //               }}/>
              //               <input
              //                 key={idSchema.roleName.$id}
              //                 type="text"
              //                 name={formData.roleName}
              //                 readOnly={readonly ? 'readonly': false}
              //                 required={required ? 'required': false}
              //                 placeholder="请输入角色名称"
              //                 // value={element.value}
              //                 onChange={e => {
              //                   element.children.props.onChange(e.target.value)
              //                 }}
              //               />
              //               {element.hasRemove && (
              //                 <button
              //                   type="button"
              //                   className="btn btn-danger array-item-remove"
              //                   onClick={e => {
              //                     element.onDropIndexClick(idx)(e);
              //                   }}
              //                 >
              //                   <i className="glyphicon glyphicon-remove" />
              //                 </button>
              //               )}
              //             </div>
              //           );
              //         })}
              //         {props.canAdd && (<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
              //           <button
              //             type="button"
              //             className="btn btn-info btn-add col-md-2"
              //             onClick={props.onAddClick}
              //           >
              //             <i className="glyphicon glyphicon-plus" />
              //           </button>
              //           </div>)}
              //       </div>
              //     );
              //   }
              //   if (["对话内容"].includes(props.title)) {
              //     return (
              //       <div>
              //         <label style={{ display: "block" }}>{props.title}*</label>
              //         {props.items.map((element, idx) => {
              //           return <div
              //             key={idx}
              //             className={element.className}
              //           >
              //             <Row>
              //               <Col><select className="form-control" defaultValue="0">
              //                 <option value="0">用户（第一人称）</option>
              //               </select></Col>
              //               <Col><select className="form-control" defaultValue="1">
              //                 <option value="1">文本对话</option>
              //                 <option value="2">气泡图片</option>
              //                 <option value="3">按钮选择对话</option>
              //               </select></Col>
              //             </Row>
              //             <Row>
              //               <Col><input type="text" placeholder="请输入文本对话内容"/></Col>
              //             </Row>
              //             <Row>
              //               <Col>
              //                 <label>展示持续时间：</label>
              //                 <input type="text"/><span>秒</span>
              //               </Col>
              //             </Row>
              //             {element.hasRemove && (
              //                 <button
              //                   type="button"
              //                   className="btn btn-danger array-item-remove"
              //                   onClick={e => {
              //                     element.onDropIndexClick(idx)(e);
              //                   }}
              //                 >
              //                   <i className="glyphicon glyphicon-remove" />
              //                 </button>
              //               )}
              //           </div>;
              //         })}
              //         {props.canAdd && (<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
              //           <button
              //             type="button"
              //             className="btn btn-info btn-add col-md-2"
              //             onClick={props.onAddClick}
              //           >
              //             <i className="glyphicon glyphicon-plus" />
              //           </button>
              //         </div>)}
              //       </div>
              //     );
              //   }
              //   return (
              //     <div>
              //       <label style={{ display: "block" }}>{props.title}</label>
              //       {props.items.map(element => element.children)}
              //       {props.canAdd && (
              //         <button
              //           type="button"
              //           className="btn btn-info btn-add"
              //           onClick={props.onAddClick}
              //         >
              //           <i className="glyphicon glyphicon-plus" />
              //         </button>
              //       )}
              //     </div>
              //   );
              // }}
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
