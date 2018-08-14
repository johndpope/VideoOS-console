import React, { Fragment } from 'react';
import { Card, CardBody, Form, InputGroup, InputGroupAddon, InputGroupText, Input, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Button } from '@icedesign/base';

const AddModel = ({shouldOpen, toggle}) => (
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
          <Input type="select">
            <option>云图</option>
            <option>中插</option>
            <option>其他</option>
          </Input>
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              模版名称
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="请输入模版名称" />
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              模版上传
            </InputGroupText>
          </InputGroupAddon>
          <Form>
            <Input type="file" />
          </Form>
        </InputGroup>
      </Form>
      </ModalBody>
      <ModalFooter>
        <Button type="primary">确认新增</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
);

export default AddModel;