import React, { Fragment } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button } from '@icedesign/base';

const DeletePlan = ({shouldOpen, toggle, deletePlan, record}) => (
  <Fragment>
    <Modal
      isOpen={shouldOpen}  
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>下线投放计划</ModalHeader>
      <ModalBody>
        <p>
          确定下线投放计划
        </p>  
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>取消</Button>
        <Button type="primary" onClick={() => {deletePlan(record)}}>确认</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
);

export default DeletePlan;