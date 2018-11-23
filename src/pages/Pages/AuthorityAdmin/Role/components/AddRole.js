import React, { Fragment } from "react";
import {
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Col
} from "reactstrap";
import { Button, Feedback } from "@icedesign/base";

const AddRole = ({
  shouldOpen,
  toggle,
  addRole,
  updateRole,
  roleAuthorities,
  record,
  formData,
  setFormData,
  userRoleInfo,
  currentPage
}) => {
  const { opType } = record || {};
  const isRead = opType === "read";
  const isUpdate = opType === "update";
  let roleName = (formData && formData.roleName) || null;
  let _roleAuthorities = (formData && formData._roleAuthorities) || {};
  let nodeIdList =
    isRead || isUpdate
      ? (formData && formData.nodeIdList) ||
        (userRoleInfo && userRoleInfo.nodeIdList)
      : (formData && formData.nodeIdList) || [];
  return (
    <Fragment>
      <Modal isOpen={shouldOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {isRead ? "角色信息" : isUpdate ? "角色修改" : "添加角色"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>角色名称</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="请输入角色名称"
                disabled={isRead ? "disabled" : false}
                defaultValue={
                  isRead || isUpdate ? record && record.roleName : ""
                }
                maxLength={10}
                onChange={e => {
                  const { value } = e.target;
                  setFormData({ roleName: value });
                }}
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>角色权限</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {roleAuthorities &&
              Object.keys(roleAuthorities).map((key, idx) => (
                <FormGroup key={idx} row>
                  <Col md="3">{key}</Col>
                  <Col>
                    <Label htmlFor={`ckb_${idx}_read`}>可读</Label>
                    <Input
                      type="checkbox"
                      name={`ckb_${idx}`}
                      id={`ckb_${idx}_read`}
                      disabled={isRead ? "disabled" : false}
                      checked={
                        nodeIdList &&
                        nodeIdList.includes(roleAuthorities[key].read)
                          ? "checked"
                          : false
                      }
                      onClick={() => {
                        if (nodeIdList.includes(roleAuthorities[key].write)) {
                          nodeIdList.splice(
                            nodeIdList.indexOf(roleAuthorities[key].write),
                            1
                          );
                        }
                        if (nodeIdList.includes(roleAuthorities[key].read)) {
                          nodeIdList.splice(
                            nodeIdList.indexOf(roleAuthorities[key].read),
                            1
                          );
                        } else {
                          nodeIdList.push(roleAuthorities[key].read);
                        }
                        setFormData({ nodeIdList });
                      }}
                    />
                  </Col>
                  {key !== "日志管理" ? (
                    <Col>
                      <Label htmlFor={`ckb_${idx}_write`}>可写</Label>
                      <Input
                        type="checkbox"
                        name={`ckb_${idx}`}
                        id={`ckb_${idx}_write`}
                        disabled={isRead ? "disabled" : false}
                        checked={
                          nodeIdList &&
                          nodeIdList.includes(roleAuthorities[key].write)
                            ? "checked"
                            : false
                        }
                        onClick={() => {
                          if (nodeIdList.includes(roleAuthorities[key].read)) {
                            nodeIdList.splice(
                              nodeIdList.indexOf(roleAuthorities[key].read),
                              1
                            );
                          }
                          if (nodeIdList.includes(roleAuthorities[key].write)) {
                            nodeIdList.splice(
                              nodeIdList.indexOf(roleAuthorities[key].write),
                              1
                            );
                          } else {
                            nodeIdList.push(roleAuthorities[key].write);
                          }
                          setFormData({ nodeIdList });
                        }}
                      />
                    </Col>
                  ) : null}
                </FormGroup>
              ))}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>取消</Button>
          <Button
            type="primary"
            onClick={() => {
              if (isRead) {
                toggle && toggle();
                return;
              }
              if (!roleName) {
                Feedback.toast.error("请输入“角色名称”");
                return;
              }
              if (!/^[\u4e00-\u9fa5]+$/g.test(roleName)) {
                Feedback.toast.error("只能是汉字");
                return;
              }
              if (!nodeIdList || nodeIdList.length === 0) {
                Feedback.toast.error("请为角色添加权限");
                return;
              }
              if (isUpdate) {
                updateRole({
                  currentPage,
                  roleId: (record && record.roleId) || "",
                  roleName,
                  nodeIdList:
                    Object.keys(_roleAuthorities).length > 0
                      ? nodeIdList
                      : nodeIdList
                });
              } else {
                addRole({
                  currentPage,
                  roleName,
                  nodeIdList
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

export default AddRole;
