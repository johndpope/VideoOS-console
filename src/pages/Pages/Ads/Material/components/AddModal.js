import React, { Fragment } from 'react';
import Form from "react-jsonschema-form";
import { Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'reactstrap';
import { Button } from '@icedesign/base';
import uiSchema from 'schemas/uiSchema';

const AddMaterial = ({shouldOpen, toggle, addMaterial, updateMaterial, formData, uploadMaterialFileInfo, record, materialSchema, addMaterialFile}) => {
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
        {
          materialSchema ? (
            <Form
              formData={formData}
              schema={materialSchema}
              uiSchema={uiSchema({addMaterialFile})}
              onSubmit={({formData}) => {
                if (isUpdate) {
                  updateMaterial({
                    creativeName: formData.creativeName,
                    interactionTypeId: formData.interactionTypeId,
                    interactionTemplateId: formData.interactionTemplateId,
                    creativeContent: JSON.stringify(formData),
                    creativeIdList: [],
                  });
                } else if(isRead) {
                  toggle && toggle();
                } else {
                  addMaterial({
                    creativeName: formData.creativeName,
                    interactionTypeId: formData.interactionTypeId,
                    interactionTemplateId: formData.interactionTemplateId,
                    creativeContent: JSON.stringify(formData),
                    creativeIdList: [],
                  });
                }
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                <Button onClick={toggle}>取消</Button>
                <Button type="primary" htmlType="submit">{ isUpdate ? '确认修改' : (isRead ? '确认' : '确认新增')}</Button>
              </div>
            </Form>
          ) : null
        }
      </ModalBody>
      {/*<ModalFooter>
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
      </ModalFooter>*/}
    </Modal>  
  </Fragment>
)};

export default AddMaterial;