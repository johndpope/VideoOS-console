import React, { Fragment } from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { Button, Feedback } from "@icedesign/base";
import { getUserInfoLocal } from "utils/authority";

const PasswordReset = ({ shouldOpen, toggle, resetPassword }) => {
  let password = null;
  let rPassword = null;
  return (
    <Fragment>
      <Modal isOpen={shouldOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>修改密码</ModalHeader>
        <ModalBody>
          <Form>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>新密码</InputGroupText>
              </InputGroupAddon>
              <Input
                type="password"
                placeholder="6-16位数字或英文字符"
                onChange={e => {
                  password = e.target.value;
                }}
                minLength={6}
                maxLength={16}
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>重复密码</InputGroupText>
              </InputGroupAddon>
              <Input
                type="password"
                placeholder="请重复密码"
                onChange={e => {
                  rPassword = e.target.value;
                }}
                minLength={6}
                maxLength={16}
              />
            </InputGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>取消</Button>
          <Button
            type="primary"
            onClick={() => {
              if (!password || !rPassword || password !== rPassword) {
                Feedback.toast.error("新密码不符合要求，请重新输入");
                return;
              }
              const userInfo = getUserInfoLocal();
              const { username, roleId, userId } = userInfo;
              resetPassword({
                password,
                username,
                roleId,
                userId
              });
            }}
          >
            确认
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default PasswordReset;
