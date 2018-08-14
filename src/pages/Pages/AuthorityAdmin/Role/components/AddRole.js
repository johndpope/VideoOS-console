import React, { Fragment } from 'react';
import { Card, CardBody, Form, InputGroup, InputGroupAddon, InputGroupText, Input, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Button } from '@icedesign/base';

const AddRole = ({shouldOpen, toggle}) => (
  <Fragment>
    <Modal
      isOpen={shouldOpen}  
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>添加角色</ModalHeader>
      <ModalBody>
      <Form
      >
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              角色名称
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="请输入角色名称" />
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              角色权限
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="请输入模版名称" />
        </InputGroup>
      </Form>
      </ModalBody>
      <ModalFooter>
        <Button type="primary">确认添加</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
);

export default AddRole;