import React, { Fragment } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button } from "@icedesign/base";

const DeleteRole = ({
  shouldOpen,
  toggle,
  deleteModel,
  record,
  currentPage
}) => (
  <Fragment>
    <Modal isOpen={shouldOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>删除模版</ModalHeader>
      <ModalBody>
        <p>确定删除该模版</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>取消</Button>
        <Button
          type="primary"
          onClick={() => {
            deleteModel({ ...record, currentPage });
          }}
        >
          确认
        </Button>
      </ModalFooter>
    </Modal>
  </Fragment>
);

export default DeleteRole;
