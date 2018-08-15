import React, { Fragment } from 'react';
import { Card, CardBody, Form, InputGroup, InputGroupAddon, InputGroupText, Input, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Button } from '@icedesign/base';

import styles from './styles';

const DeleteType = ({shouldOpen, toggle, deleteType, record}) => (
  <Fragment>
    <Modal
      isOpen={shouldOpen}  
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>删除类型</ModalHeader>
      <ModalBody>
        <p>
          确认删除类型吗？
        </p>  
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>取消</Button>
        <Button type="primary" onClick={() => {deleteType(record)}}>确认</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
);

export default DeleteType;