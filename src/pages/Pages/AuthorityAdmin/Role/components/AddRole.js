import React, { Fragment } from 'react';
import { Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Col } from 'reactstrap';
import { Button } from '@icedesign/base';

const AddRole = ({shouldOpen, toggle, addRole, updateRole, roleAuthorities, record, formData, setFormData}) => {
  let roleName = formData && formData.roleName || null;
  const { opType } = record || {};
  const isRead = opType === 'read';
  const isUpdate = opType === 'update';
  let _roleAuthorities = formData && formData._roleAuthorities || {};
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
              setFormData({roleName: e.target.value});
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
          roleAuthorities && Object.keys(roleAuthorities).map((key, idx) => (
            <FormGroup key={idx} row>
              <Col>{key}</Col>
              <Col>
                  <Label htmlFor={`ckb_${idx}_read`}>
                    可读
                  </Label> 
                  <Input type="radio"
                    name={`ckb_${idx}`}
                    id={`ckb_${idx}_read`}
                    disabled={isRead ? 'disabled' : false}
                    onChange={e => {
                      _roleAuthorities[key] = {
                        read: true,
                        write: false,
                      };
                      setFormData({_roleAuthorities});
                    }}
                  />
              </Col>
              <Col>
                  <Label htmlFor={`ckb_${idx}_write`}>
                    可写
                  </Label> 
                  <Input type="radio"
                    name={`ckb_${idx}`}
                    id={`ckb_${idx}_write`}
                    disabled={isRead ? 'disabled' : false}
                    onChange={e => {
                      _roleAuthorities[key] = {
                        read: false,
                        write: true,
                      };
                      setFormData({_roleAuthorities});
                    }}
                  />
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
              roleName,
              nodeIdList: Object.keys(_roleAuthorities).filter(key => {
                return _roleAuthorities[key].read || _roleAuthorities[key].write
              }),
            });
          } else if (isRead) {
            toggle && toggle();
          } else {

            addRole({
              roleName,
              nodeIdList: Object.keys(_roleAuthorities).map(key => {
                if (_roleAuthorities[key].read) {
                  return roleAuthorities[key].read;
                } else if (_roleAuthorities[key].write) {
                  return roleAuthorities[key].write;
                }
              }),
            });
          }
        }}>{isUpdate ? '确认修改' : (isRead ? '确认' : '确认添加')}</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
)};

export default AddRole;