import React, { Fragment } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button } from "@icedesign/base";

const DeleteAccount = ({
  shouldOpen,
  toggle,
  deleteAccount,
  record,
  currentPage
}) => (
  <Fragment>
    <Modal isOpen={shouldOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>删除账号</ModalHeader>
      <ModalBody>
        <p>确定删除该账号</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>取消</Button>
        <Button
          type="primary"
          onClick={() => {
            deleteAccount({ userId: record.userId, currentPage });
          }}
        >
          确认
        </Button>
      </ModalFooter>
    </Modal>
  </Fragment>
);

export default DeleteAccount;
