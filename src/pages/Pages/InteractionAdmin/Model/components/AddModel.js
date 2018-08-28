import React, { Fragment } from 'react';
import { Form, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button } from '@icedesign/base';

const AddModel = ({shouldOpen, toggle, addModel, updateModel, uploadModelFile, uploadModelFileInfo, modelTypes, record, setFormData, formData, downloadModelTemplateFile}) => {

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
        isRead ? '模板信息' : (isUpdate ? '模板修改' : '新增模版')
      }</ModalHeader>
      <ModalBody>
      <Form
      >
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              模版类型
            </InputGroupText>
          </InputGroupAddon>
          <Input type="select"
            disabled={isRead ? 'disabled' : false}
            defaultValue={isRead || isUpdate ? formData && formData.interactionTypeId : ''}
            onChange={e => {
              setFormData({interactionTypeId: e.target.value});
            }}
          >
            {
              modelTypes && Array.isArray(modelTypes) && modelTypes.length > 0 && modelTypes.map((mt, idx) => (
                <option key={idx} value={mt.interactionId}>{mt.interactionTypeName}</option>
              ))
            }
          </Input>
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              模版名称
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="请输入模版名称" 
            disabled={isRead ? 'disabled' : false}
            defaultValue={isRead || isUpdate ? formData && formData.interactionTypeName : ''}
            onChange={e => {
              setFormData({interactionTemplateName: e.target.value});
            }}
          />
        </InputGroup>
        {
          isRead ? (
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  模版文件
                </InputGroupText>
              </InputGroupAddon>
              <span>
                <Button onClick={() => {
                  downloadModelTemplateFile({templateId: record.templateId})
                }}>点击下载</Button>
              </span>
            </InputGroup>
          ) : (
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  模版上传
                </InputGroupText>
              </InputGroupAddon>
              <span>
                <Input type="file" onChange={e => {
                  const { files } = e.target;
                  uploadModelFile({file: files && files[0]});
                }}/>
              </span>
            </InputGroup>
          )
        }
        
      </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>取消</Button>
        <Button type="primary" onClick={() => {
          if (isUpdate) {
            updateModel({
              interactionTemplateId: record && record.interactionTemplateId,
              ...formData,
              ...uploadModelFileInfo,
            });
          } else if(isRead) {
            toggle && toggle();
          } else {
            addModel({
              ...formData,
              ...uploadModelFileInfo,
            });
          }
        }}>{ isUpdate ? '确认修改' : (isRead ? '确认' : '确认新增')}</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
)};

export default AddModel;