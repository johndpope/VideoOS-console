import React, { Fragment } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button } from "@icedesign/base";

const DeleteType = ({
  shouldOpen,
  toggle,
  deleteType,
  record,
  currentPage
}) => (
  <Fragment>
    <Modal isOpen={shouldOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>警告</ModalHeader>
      <ModalBody>
        <p>删除应用后，与该应用绑定的主题和素材也将删除。</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>取消</Button>
        <Button
          type="primary"
          onClick={() => {
            deleteType({
              interactionTypeName: record && record.interactionTypeName,
              currentPage
            });
          }}
        >
          确认
        </Button>
      </ModalFooter>
    </Modal>
  </Fragment>
);

export default DeleteType;
