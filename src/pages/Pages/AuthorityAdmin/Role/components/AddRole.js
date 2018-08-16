import React, { Fragment } from 'react';
import { ListGroup, ListGroupItem, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Col } from 'reactstrap';
import { Button } from '@icedesign/base';

const AddRole = ({shouldOpen, toggle, addRole, roleAuthorities}) => {
  let launchPlanName = null;
  let _roleAuthorities = Object.assign({}, roleAuthorities);
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
        {
          _roleAuthorities && Object.keys(_roleAuthorities).map((key, idx) => (
            <FormGroup key={idx} row>
              <Col>{key}</Col>
              <Col>
                <Label>
                  <Input type="checkbox"
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
          addRole({
            launchPlanName,
            nodeIdList: Object.keys(_roleAuthorities).filter(key => {
              return _roleAuthorities[key].read || _roleAuthorities[key].write
            }),
          });
        }}>确认添加</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
)};

export default AddRole;