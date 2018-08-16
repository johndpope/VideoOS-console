import React, { Fragment } from 'react';
import { Card, CardBody, Form, InputGroup, InputGroupAddon, InputGroupText, Input, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Button } from '@icedesign/base';

const AddModel = ({shouldOpen, toggle, addModel, uploadModelFile, uploadModelFileInfo, modelTypes}) => {
  let interactionTypeId = null;
  let interactionTemplateName = null;
  return (
  <Fragment>
    <Modal
      isOpen={shouldOpen}  
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>新增模版</ModalHeader>
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
            onChange={e => {
              interactionTypeId = e.target.value;
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
            onChange={e => {
              interactionTemplateName = e.target.value;
            }}
          />
        </InputGroup>
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
      </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>取消</Button>
        <Button type="primary" onClick={() => {
          addModel({
            interactionTypeId,
            interactionTemplateName,
            ...uploadModelFileInfo,
          });
        }}>确认新增</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
)};

export default AddModel;