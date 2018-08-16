import React, { Fragment } from 'react';
import { Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Col } from 'reactstrap';
import { Button } from '@icedesign/base';

const AddRole = ({shouldOpen, toggle, addRole, updateRole, roleAuthorities, record}) => {
  let launchPlanName = null;
  let _roleAuthorities = Object.assign({}, roleAuthorities);
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
        isRead ? '角色信息' : (isUpdate ? '角色修改' : '添加角色')
      }</ModalHeader>
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
            disabled={isRead ? 'disabled' : false}
            defaultValue={isRead || isUpdate ? record && record.roleName : ''}
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
        {
          _roleAuthorities && Object.keys(_roleAuthorities).map((key, idx) => (
            <FormGroup key={idx} row>
              <Col>{key}</Col>
              <Col>
                <Label>
                  <Input type="checkbox"
                    disabled={isRead ? 'disabled' : false}
                    onChange={e => {
                      _roleAuthorities[key].read = Boolean(e.target.value);
                    }}
                  />
                  可读
                </Label> 
              </Col>
              <Col>
                <Label>
                  <Input type="checkbox"
                    disabled={isRead ? 'disabled' : false}
                    onChange={e => {
                      _roleAuthorities[key].write = Boolean(e.target.value);
                    }}
                  />
                  可写
                </Label> 
              </Col>        
            </FormGroup>
          ))
        }
      </Form>
      </ModalBody>
      <ModalFooter>
        <Button type="primary" onClick={() => {
          if (isUpdate) {
            updateRole({
              roleId: record && record.roleId || '',
              roleName: launchPlanName,
              nodeIdList: Object.keys(_roleAuthorities).filter(key => {
                return _roleAuthorities[key].read || _roleAuthorities[key].write
              }),
            });
          } else {
            addRole({
              launchPlanName,
              nodeIdList: Object.keys(_roleAuthorities).filter(key => {
                return _roleAuthorities[key].read || _roleAuthorities[key].write
              }),
            });
          }
        }}>{isUpdate ? '确认修改' : '确认添加'}</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
)};

export default AddRole;