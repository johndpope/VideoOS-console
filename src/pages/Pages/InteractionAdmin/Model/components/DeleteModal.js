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
      <ModalHeader toggle={toggle}>警告</ModalHeader>
      <ModalBody>
        <p>删除主题后，与该应用绑定的主题和素材也将删除。</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>取消</Button>
        <Button
          type="primary"
          onClick={() => {
            deleteModel({ ...record, currentPage });
          }}
        >
          确认删除
        </Button>
      </ModalFooter>
    </Modal>
  </Fragment>
);

export default DeleteRole;
