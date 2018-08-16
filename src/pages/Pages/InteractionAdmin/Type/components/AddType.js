import React, { Fragment } from 'react';
import { Card, CardBody, Form, InputGroup, InputGroupAddon, InputGroupText, Input, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Button } from '@icedesign/base';

import styles from './styles';

const AddType = ({shouldOpen, toggle, addType, record}) => {
  let interactionTypeName = null;
  let file = null;
  const { opType } = record || {};
  const isRead = opType === 'read';
  const isUpdate = opType === 'update';
  return (<Fragment>
    <Modal
      isOpen={shouldOpen}  
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>
        {
          isRead ? '类型信息' : (isUpdate ? '类型修改' : '新增类型')
        }
      </ModalHeader>
      <ModalBody>
      <Form
      >
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              类型名称
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" 
            disabled={isRead ? 'disabled' : false}
            defaultValue={isRead ? record && record.interactionTypeName : ''}
            onChange={e => {
              interactionTypeName = e.target.value;
            }} 
            placeholder="请输入名称" 
          />
        </InputGroup>
        {
          isRead ? (
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  配置信息
                </InputGroupText>
              </InputGroupAddon>
              <span>
                <Input 
                  disabled
                  type="textarea" 
                  value={record && record.configInfo || ''}
                />
              </span>
            </InputGroup>
          ) : (
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  类型导入
                </InputGroupText>
              </InputGroupAddon>
              <span>
                <Input 
                  type="file" 
                  styles={styles.file_ipt} 
                  onChange={e => {
                    file = e.target.files && e.target.files[0];
                  }}
                />
              </span>
            </InputGroup>
          )
        }
      </Form>
      </ModalBody>
      <ModalFooter>
        <Button type="primary" onClick={() => {
          addType({
            interactionTypeName,
            file,
          })
        }}>确认新增</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
)};

export default AddType;