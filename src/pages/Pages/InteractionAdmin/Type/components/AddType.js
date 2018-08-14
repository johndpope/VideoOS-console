import React, { Fragment } from 'react';
import { Card, CardBody, Form, InputGroup, InputGroupAddon, InputGroupText, Input, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Button } from '@icedesign/base';

import styles from './styles';

const AddType = ({shouldOpen, toggle}) => (
  <Fragment>
    <Modal
      isOpen={shouldOpen}  
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>新增类型</ModalHeader>
      <ModalBody>
      <Form
      >
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              类型名称
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="请输入名称" />
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              类型导入
            </InputGroupText>
          </InputGroupAddon>
          <Form>
            <Input type="file" styles={styles.file_ipt} />
          </Form>
        </InputGroup>
      </Form>
      </ModalBody>
      <ModalFooter>
        <Button type="primary">确认新增</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
);

export default AddType;