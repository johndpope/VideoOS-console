import React, { Fragment } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button } from "@icedesign/base";

const LaunchPlan = ({
  shouldOpen,
  toggle,
  launchPlan,
  record,
  currentPage,
  params
}) => (
  <Fragment>
    <Modal isOpen={shouldOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>确认投放</ModalHeader>
      <ModalBody>
        <p>确认要现在投放吗？</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>取消</Button>
        <Button
          type="primary"
          onClick={() => {
            let _record = { ...record };
            delete _record.launchTimeType;
            launchPlan({ ..._record, ...params, currentPage });
          }}
        >
          确认
        </Button>
      </ModalFooter>
    </Modal>
  </Fragment>
);

export default LaunchPlan;
