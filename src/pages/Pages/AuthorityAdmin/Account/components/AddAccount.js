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

const AddAccount = ({
  shouldOpen,
  toggle,
  addAccount,
  updateAccount,
  roleTypes,
  record,
  currentPage,
  formData,
  setFormData
}) => {
  let password = (formData && formData.password) || "";
  const { opType } = record || {};
  const isRead = opType === "read";
  const isUpdate = opType === "update";
  let username =
    (formData && formData.username) || (record && record.userName) || "";
  let roleId = (formData && formData.roleId) || (record && record.roleId) || "";
  return (
    <Fragment>
      <Modal isOpen={shouldOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {isRead ? "账号信息" : isUpdate ? "账号修改" : "添加账号"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>账号名称</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="6-16位数字或者字母或者数字字母组合"
                disabled={isRead ? "disabled" : false}
                defaultValue={
                  isRead || isUpdate ? record && record.userName : ""
                }
                minLength={6}
                maxLength={16}
                onChange={e => {
                  const { value } = e.target;
                  setFormData({ username: value });
                }}
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>角色</InputGroupText>
              </InputGroupAddon>
              <Input
                type="select"
                disabled={isRead ? "disabled" : false}
                defaultValue={isRead || isUpdate ? record && record.roleId : ""}
                onChange={e => {
                  setFormData({ roleId: e.target.value });
                }}
              >
                <option value="">请选择</option>
                {roleTypes &&
                  Array.isArray(roleTypes) &&
                  roleTypes.length > 0 &&
                  roleTypes.map((rt, idx) => (
                    <option key={idx} value={rt.roleId}>
                      {rt.roleName}
                    </option>
                  ))}
              </Input>
            </InputGroup>
            <InputGroup className="mb-4" style={{ alignItems: "center" }}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>{isUpdate ? "新密码" : "密码"}</InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder={
                  isUpdate
                    ? "请输入新密码"
                    : "6-16位数字或者字母或者数字字母组合"
                }
                id="account_password"
                disabled={isRead ? "disabled" : false}
                type="password"
                minLength={6}
                maxLength={16}
                defaultValue={isRead || isUpdate ? "******" : ""}
                onChange={e => {
                  setFormData({ password: e.target.value });
                }}
              />
            </InputGroup>
            {/*Boolean(resMsg) ? <Badge color="warning">{resMsg}</Badge> : null*/}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>取消</Button>
          <Button
            type="primary"
            onClick={e => {
              e.preventDefault();
              if (isRead) {
                toggle && toggle();
                return;
              }
              if (!username) {
                Feedback.toast.error("请输入“账号名称”");
                return;
              }
              if (username.length < 6) {
                Feedback.toast.error("账号名称为“6-16位数字或者字母”");
                return;
              }
              if (username.length > 16) {
                Feedback.toast.error("账号名称为“6-16位数字或者字母”");
                return;
              }
              if (!/^[0-9A-Za-z]+$/gi.test(username)) {
                Feedback.toast.error("账号名称为“6-16位数字或者字母”");
                return;
              }
              if (!roleId) {
                Feedback.toast.error("请选择“角色”");
                return;
              }
              if (!password && !isUpdate) {
                Feedback.toast.error("请输入“密码”");
                return;
              }
              if (password && password.length < 6) {
                Feedback.toast.error("密码为“6-16位数字或者字母”");
                return;
              }
              if (password && password.length > 16) {
                Feedback.toast.error("密码为“6-16位数字或者字母”");
                return;
              }
              if (password && !/^[0-9A-Za-z]+$/gi.test(password)) {
                Feedback.toast.error("密码为“6-16位数字或者字母”");
                return;
              }
              if (isUpdate) {
                const params = {
                  currentPage,
                  username,
                  roleId,
                  userId: record && record.userId
                };
                if (password) {
                  params.password = password;
                }
                updateAccount(params);
              } else {
                addAccount({
                  currentPage,
                  username,
                  roleId,
                  password
                });
              }
            }}
          >
            {isUpdate ? "确认修改" : isRead ? "确认" : "确认添加"}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default AddAccount;
