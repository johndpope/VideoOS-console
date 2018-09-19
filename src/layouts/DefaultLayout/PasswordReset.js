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
              if (password.length < 6) {
                Feedback.toast.error("少于6位");
                return;
              }
              if (password.length > 16) {
                Feedback.toast.error("多于16位");
                return;
              }
              if (
                !/^[0-9A-Za-z]+$/gi.test(password) ||
                !/^[0-9A-Za-z]+$/gi.test(rPassword)
              ) {
                Feedback.toast.error("只能是英文或数字");
                return;
              }
              const { username } = getUserInfoLocal();
              resetPassword({
                password,
                username
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
