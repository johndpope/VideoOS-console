import React, { Fragment } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button } from '@icedesign/base';

const DeleteRole = ({shouldOpen, toggle, deleteRole, record}) => (
  <Fragment>
    <Modal
      isOpen={shouldOpen}  
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>删除角色</ModalHeader>
      <ModalBody>
        <p>
          确定删除该角色
        </p>  
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>取消</Button>
        <Button type="primary" onClick={() => {deleteRole(record)}}>确认</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
);

export default DeleteRole;