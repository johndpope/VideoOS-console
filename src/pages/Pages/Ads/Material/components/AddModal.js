import React, { Fragment } from 'react';
import Form from "react-jsonschema-form";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button } from '@icedesign/base';
import yuntuSchema from 'schemas/yuntu.json';
import zhongchaSchema from 'schemas/zhongcha.json';
import hongbaoSchema from 'schemas/hongbao.json';
import toupiaoSchema from 'schemas/toupiao.json';

const AddMaterial = ({shouldOpen, toggle, addMaterial, updateMaterial, uploadMaterialFile, uploadMaterialFileInfo, modelTypes, record}) => {
  let interactionTypeId = null;
  let interactionTemplateName = null;
  const { opType } = record || {};
  const isRead = opType === 'read';
  const isUpdate = opType === 'update';
  return (
  <Fragment>
    <Modal
      isOpen={shouldOpen}  
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>{
        isRead ? '素材信息' : (isUpdate ? '素材修改' : '新增素材')
      }</ModalHeader>
      <ModalBody>
      <Form
        schema={toupiaoSchema}
        uiSchema={{
          "monitorLinks": {
            "items": {
              "ui:emptyValue": ""
            }
          }
        }}
      >
        <div>
        </div>
      </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>取消</Button>
        <Button type="primary" onClick={() => {
          if (isUpdate) {
            updateMaterial({
              interactionTemplateId: record && record.interactionTemplateId,
              interactionTypeId,
              interactionTemplateName,
              ...uploadMaterialFileInfo,
            });
          } else if(isRead) {
            toggle && toggle();
          } else {
            addMaterial({
              interactionTypeId,
              interactionTemplateName,
              ...uploadMaterialFileInfo,
            });
          }
        }}>{ isUpdate ? '确认修改' : (isRead ? '确认' : '确认新增')}</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
)};

export default AddMaterial;