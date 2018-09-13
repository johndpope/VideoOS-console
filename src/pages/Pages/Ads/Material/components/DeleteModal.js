import React, { Fragment } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button } from "@icedesign/base";

const DeleteMaterial = ({
  shouldOpen,
  toggle,
  deleteMaterial,
  record,
  currentPage
}) => (
  <Fragment>
    <Modal isOpen={shouldOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>删除素材</ModalHeader>
      <ModalBody>
        <p>确定删除素材</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>取消</Button>
        <Button
          type="primary"
          onClick={() => {
            deleteMaterial({ ...record, currentPage });
          }}
        >
          确认
        </Button>
      </ModalFooter>
    </Modal>
  </Fragment>
);

export default DeleteMaterial;
