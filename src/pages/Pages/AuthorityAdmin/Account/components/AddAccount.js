import React, { Fragment } from 'react';
import { Card, CardBody, Form, InputGroup, InputGroupAddon, InputGroupText, Input, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Badge } from 'reactstrap';
import { Button } from '@icedesign/base';

const AddAccount = ({shouldOpen, toggle, addAccount, resMsg}) => (
  <Fragment>
    <Modal
      isOpen={shouldOpen}  
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>添加账号</ModalHeader>
      <ModalBody>
      <Form>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              账号名称
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="请输入角色名称" />
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              角色
            </InputGroupText>
          </InputGroupAddon>
          <Input type="select">
            <option>运营人员</option>
            <option>审核人员</option>
            <option>开发人员</option>
          </Input>
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              密码
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="请输入密码" />
        </InputGroup>
        {
          Boolean(resMsg) ? <Badge color="warning">{resMsg}</Badge> : null
        }
      </Form>
      </ModalBody>
      <ModalFooter>
        <Button type="primary"
          onClick={e => {
            e.preventDefault();
            addAccount({

            });
          }}
        >
          确认添加
        </Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
);

export default AddAccount;