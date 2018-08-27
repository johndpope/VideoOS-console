import React, { Fragment } from 'react';
import Form from "react-jsonschema-form";
import { Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'reactstrap';
import { Button } from '@icedesign/base';
import uiSchema from 'schemas/uiSchema';

const AddMaterial = ({shouldOpen, toggle, creativeIdList, addPlan, updatePlan, formData, saveFormData, record, materialSchema, addMaterialFile}) => {
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
        isRead ? '投放计划信息' : (isUpdate ? '投放计划修改' : '新增投放计划')
      }</ModalHeader>
      <ModalBody>
        {
          materialSchema ? (
            <Form
              formData={formData}
              schema={materialSchema}
              uiSchema={uiSchema({addMaterialFile})}
              onChange={({formData}) => {
                saveFormData(formData);
              }}
              onSubmit={({formData}) => {
                if (isUpdate) {
                  updatePlan({});
                } else if(isRead) {
                  toggle && toggle();
                } else {
                  addPlan({});
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
    </Modal>  
  </Fragment>
)};

export default AddMaterial;