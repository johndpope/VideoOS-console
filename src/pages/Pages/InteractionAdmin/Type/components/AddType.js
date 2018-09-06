import React, { Fragment } from 'react';
import { Form, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button } from '@icedesign/base';

import styles from './styles';

const AddType = ({shouldOpen, toggle, addType, updateType, record, setFormData, formData, configInfo}) => {

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
            maxLength={10}
            disabled={isRead ? 'disabled' : false}
            defaultValue={isRead || isUpdate ? formData && formData.interactionTypeName : ''}
            onChange={e => {
              const { value } = e.target;
              if (value && value.length > 10) {
                
                return;
              }
              setFormData({
                interactionTypeName: e.target.value
              });
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
              <span style={{display: 'table-cell', flex: 1}}>
                <Input 
                  disabled
                  style={{minHeight: '240px'}}
                  type="textarea" 
                  value={configInfo || ''}
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
                  accept="*.txt"
                  styles={styles.file_ipt} 
                  onChange={e => {
                    setFormData({
                      file: e.target.files && e.target.files[0]
                    })
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
          if (isUpdate) {
            updateType({
              interactionTypeId: record && record.interactionTypeId,
              ...formData,
            });
          } else if(isRead) {
            toggle && toggle();
          } else {
            addType(formData);
          }
        }}>{ isUpdate ? '确认修改' : (isRead ? '确认' : '确认新增')}</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
)};

export default AddType;