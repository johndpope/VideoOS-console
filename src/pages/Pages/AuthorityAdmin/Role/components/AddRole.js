import React, { Fragment } from 'react';
import { Card, CardBody, Form, InputGroup, InputGroupAddon, InputGroupText, Input, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Button } from '@icedesign/base';

const AddRole = ({shouldOpen, toggle, addRole}) => {
  let launchPlanName = null;
  let nodeIdList = [];
  return (
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
          <Input type="text" placeholder="请输入角色名称" 
            onChange={e => {
              launchPlanName = e.target.value;
            }}
          />
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              角色权限
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Form>
      </ModalBody>
      <ModalFooter>
        <Button type="primary" onClick={() => {
          addRole({
            launchPlanName,
            nodeIdList,
          });
        }}>确认添加</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
)};

export default AddRole;