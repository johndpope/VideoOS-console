import React, { Fragment } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button } from '@icedesign/base';

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