import React, { Fragment } from 'react';
import { Form, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button } from '@icedesign/base';

const PasswordReset = ({shouldOpen, toggle}) => {

  return (
  <Fragment>
    <Modal
      isOpen={shouldOpen}  
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>修改密码</ModalHeader>
      <ModalBody>
      <Form
      >
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              新密码
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="6-16位数字或英文字符" 
            onChange={e => {
            }}
          />
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              重复密码
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="请重复密码" 
            onChange={e => {
            }}
          />
        </InputGroup>
      </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>取消</Button>
        <Button type="primary" onClick={() => {
          
        }}>确认</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
)};

export default PasswordReset;