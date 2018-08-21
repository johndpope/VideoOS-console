import React, { Fragment } from 'react';
import { Form, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalBody, ModalFooter, ModalHeader, Badge } from 'reactstrap';
import { Button } from '@icedesign/base';

const AddAccount = ({shouldOpen, toggle, addAccount, updateAccount, resMsg, roleTypes, record}) => {
  let username = null;
  let roleId = null;
  let password = null;
  const { opType } = record || {};
  const isRead = opType === 'read';
  const isUpdate = opType === 'update';
  return(
  <Fragment>
    <Modal
      isOpen={shouldOpen}  
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>{
        isRead ? '账号信息' : (isUpdate ? '账号修改' : '添加账号')
      }</ModalHeader>
      <ModalBody>
      <Form>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              账号名称
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="请输入角色名称" 
            disabled={isRead ? 'disabled' : false }
            defaultValue={isRead || isUpdate ? record && record.userName : ''}
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
            disabled={isRead ? 'disabled' : false }
            defaultValue={isRead || isUpdate ? record && record.roleId : ''}
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
        <InputGroup className="mb-4" style={{alignItems: 'center'}}>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              密码
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="请输入密码" 
            id="account_password"
            disabled={isRead ? 'disabled' : false }
            type="password"
            defaultValue={isRead || isUpdate ? record && record.password : ''}
            onChange={e => {
              password = e.target.value;
            }}
          />
          {
            isUpdate ? (
              <Button onClick={() => {
                if (document && document.getElementById('account_password')) {
                  document.getElementById('account_password').value = '';
                }
              }}>重置</Button>
            ) : null
          }
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
            if (isUpdate) {
              updateAccount({
                username,
                roleId,
                password,
                userId: record && record.userId,
              });
            } else if (isRead) {
              toggle && toggle();
            } else {
              addAccount({
                username,
                roleId,
                password,
              });
            }
          }}
        >
          {
            isUpdate ? '确认修改' : (isRead ? '确认' : '确认添加')
          }
        </Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
)};

export default AddAccount;