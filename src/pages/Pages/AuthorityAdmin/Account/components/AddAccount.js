import React, { Fragment } from 'react';
import { Card, CardBody, Form, InputGroup, InputGroupAddon, InputGroupText, Input, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Badge } from 'reactstrap';
import { Button } from '@icedesign/base';

const AddAccount = ({shouldOpen, toggle, addAccount, resMsg, roleTypes}) => {
  let username = null;
  let roleId = null;
  let password = null;
  return(
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
          <Input type="text" placeholder="请输入角色名称" 
            onChange={e => {
              username = e.target.value;
            }}
          />
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              角色
            </InputGroupText>
          </InputGroupAddon>
          <Input type="select"
            defaultValue="运营人员"
            onChange={e => {
              roleId = e.target.value;
            }}
          > 
            {
              roleTypes && Array.isArray(roleTypes) && roleTypes.length > 0 && roleTypes.map((rt, idx) => (
                <option key={idx} value={rt.roleId}>{rt.roleName}</option>
              ))
            }
          </Input>
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              密码
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="请输入密码" 
            onChange={e => {
              password = e.target.value;
            }}
          />
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
              username,
              roleId,
              password,
            });
          }}
        >
          确认添加
        </Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
)};

export default AddAccount;