import React, { Component, Fragment } from "react";
import { Label, Input, Row, Col } from "reactstrap";
import { Feedback } from "@icedesign/base";

import { addMaterialFile } from "../api";

export default class Bubbles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData,
      readonly: Boolean(props.uiSchema["ui:disabled"])
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.formData,
      readonly: Boolean(nextProps.uiSchema["ui:disabled"]),
      errorSchema: nextProps.errorSchema
    });
  }

  onChange = name => {
    return event => {
      let { value } = event.target;
      const { isShowAds, isShowClose } = this.state;
      if (["isShowAds"].includes(name)) {
        value = !isShowAds;
      }
      if (["isShowClose"].includes(name)) {
        value = !isShowClose;
      }
      if (["interactionTemplateId"].includes(name)) {
        value = Number(value);
      }
      this.setState(
        {
          [name]: value
        },
        () => this.props.onChange(this.state)
      );
    };
  };

  addRole = () => {
    let { roles = [] } = this.state;
    roles.push({
      roleAvatar: null,
      roleName: null
    });
    this.setState({ roles }, () => this.props.onChange(this.state));
  };

  deleteRole = idx => {
    let { roles = [], messages = [] } = this.state;
    if (
      roles[idx] &&
      roles[idx].roleName &&
      JSON.stringify(messages).includes(roles[idx].roleName)
    ) {
      if (!window.confirm("对话内容中有该角色，确认删除该角色吗？")) {
        return;
      }
    }
    roles.splice(idx, 1);
    this.setState({ roles }, () => this.props.onChange(this.state));
  };

  addMessage = () => {
    let canAdd = true;
    let { messages = [] } = this.state;
    messages.forEach(msg => {
      if (msg.messageType === 3) {
        canAdd = false;
        Feedback.toast.error("按钮选择为对话的最后一步");
        return;
      }
    });
    if (!canAdd) return;
    messages.push({
      duration: null,
      messageType: 1,
      userType: 2
    });
    this.setState({ messages }, () => this.props.onChange(this.state));
  };

  deleteMessage = idx => {
    let { messages = [] } = this.state;
    messages.splice(idx, 1);
    this.setState({ messages }, () => this.props.onChange(this.state));
  };

  changeMessageType = value => {
    this.setState({
      messageType: value
    });
  };

  render() {
    let { schema, errorSchema } = this.props;
    let { roles = [], messages = [], readonly } = this.state;
    const {
      creativeName,
      interactionTemplateId,
      isShowAds = true,
      isShowClose = true,
      creativeIdList = []
    } = this.state;

    return (
      <Fragment>
        <div>基础配置</div>
        <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <div className="array-item">
            <Label>素材名称*</Label>
            <Input
              value={creativeName}
              onChange={this.onChange("creativeName")}
              maxLength={30}
              required
              readOnly={readonly}
              placeholder="请输入素材名称"
            />
            {errorSchema &&
              errorSchema.creativeName &&
              errorSchema.creativeName.__errors &&
              errorSchema.creativeName.__errors.map((err, idx) => (
                <li key={idx} style={{ color: "#f86c6b" }}>
                  {err}
                </li>
              ))}
          </div>
          <div className="array-item">
            <Label>素材主题*</Label>
            <Input
              type="select"
              readOnly={readonly}
              disabled={readonly ? "disabled" : false}
              value={interactionTemplateId || ""}
              onChange={this.onChange("interactionTemplateId")}
            >
              <option value="">请选择</option>
              {schema &&
                schema.properties &&
                schema.properties.interactionTemplateId &&
                schema.properties.interactionTemplateId.enum.map((em, idx) => (
                  <option value={em} key={idx}>
                    {schema.properties.interactionTemplateId.enumNames[idx]}
                  </option>
                ))}
            </Input>
            {errorSchema &&
              errorSchema.interactionTemplateId &&
              errorSchema.interactionTemplateId.__errors &&
              errorSchema.interactionTemplateId.__errors.map((err, idx) => (
                <li key={idx} style={{ color: "#f86c6b" }}>
                  {err}
                </li>
              ))}
          </div>
        </div>
        <div style={{ marginTop: "2rem" }}>信息层编辑</div>
        <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <div className="array-item checkbox">
            <Label check>
              <Input
                checked={isShowAds ? "checked" : false}
                type="checkbox"
                disabled={readonly ? "disabled" : false}
                value={isShowAds}
                onChange={this.onChange("isShowAds")}
              />
              {`  广告标识是否可见`}
            </Label>
          </div>
          <div className="array-item checkbox">
            <Label check>
              <Input
                checked={isShowClose ? "checked" : false}
                type="checkbox"
                disabled={readonly ? "disabled" : false}
                value={isShowClose}
                onChange={this.onChange("isShowClose")}
              />
              {"  "}
              关闭按钮是否可见
            </Label>
          </div>
          <div className="array-item">
            <Label>角色</Label>
            {roles &&
              roles.length > 0 &&
              roles.map((role, idx) => {
                return (
                  <Row
                    key={idx}
                    className="array-item"
                    style={{ marginBottom: "8px" }}
                  >
                    <Col md="4">
                      {role.roleAvatar ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyMessage: "center",
                            alignItems: "center"
                          }}
                        >
                          <img
                            alt=""
                            src={role.roleAvatar}
                            style={{ maxWidth: "64px", maxHeight: "64px" }}
                          />
                          {!readonly ? (
                            <button
                              type="button"
                              className="btn btn-danger array-item-remove"
                              onClick={e => {
                                role.roleAvatar = null;
                                roles[idx] = role;
                                this.setState({ roles });
                              }}
                            >
                              <i className="glyphicon glyphicon-remove" />
                            </button>
                          ) : null}
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyMessage: "center",
                            alignItems: "center"
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              width: "120px",
                              height: "32px",
                              border: "1px solid #e4e7ea",
                              textAlign: "center",
                              lineHeight: "32px"
                            }}
                          >
                            上传图片
                            <input
                              style={{
                                position: "absolute",
                                opacity: 0,
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: "0.25rem"
                              }}
                              type="file"
                              accept="image/png, image/jpg, image/jpeg, image/gif"
                              onChange={e => {
                                if (e.target.files.length > 0) {
                                  addMaterialFile({
                                    file: e.target.files[0]
                                  }).then(result => {
                                    if (result.status === 200) {
                                      if (
                                        result.data &&
                                        result.data.resCode === "00"
                                      ) {
                                        role.roleAvatar = result.data.fileUrl;
                                        roles[idx] = role;
                                        this.setState({ roles }, () =>
                                          this.props.onChange(this.state)
                                        );
                                      } else {
                                        Feedback.toast.error(
                                          result.data && result.data.resMsg
                                        );
                                      }
                                    } else {
                                      Feedback.toast.error(
                                        `${result.status}：上传出错了，请重试`
                                      );
                                    }
                                    // console.log(result);
                                  });
                                }
                              }}
                            />
                            {errorSchema &&
                              errorSchema.roles &&
                              Object.keys(errorSchema.roles).map(
                                key =>
                                  errorSchema.roles[key].roleAvatar
                                    ? errorSchema.roles[
                                        key
                                      ].roleAvatar.__errors.map((err, idx) => (
                                        <li
                                          key={idx}
                                          style={{ color: "#f86c6b" }}
                                        >
                                          未上传角色图片
                                        </li>
                                      ))
                                    : null
                              )}
                          </div>
                        </div>
                      )}
                    </Col>
                    <Col md="5">
                      <Input
                        type="text"
                        value={role.roleName}
                        maxLength={10}
                        readOnly={readonly}
                        placeholder="请输入角色名称"
                        onChange={e => {
                          // if (!/0-9A-Za-z\u4e00-\u9fa5-/gi.test(e.target.value)) {
                          //   this.setState({ roleNameError: true });
                          // } else {
                          //   this.setState({ roleNameError: false });
                          // }
                          role.roleName = e.target.value;
                          roles[idx] = role;
                          this.setState({ roles }, () =>
                            this.props.onChange(this.state)
                          );
                        }}
                      />
                      {errorSchema &&
                        errorSchema.roles &&
                        Object.keys(errorSchema.roles).map(
                          key =>
                            errorSchema.roles[key].roleName
                              ? errorSchema.roles[key].roleName.__errors.map(
                                  (err, idx) => (
                                    <li key={idx} style={{ color: "#f86c6b" }}>
                                      {err}
                                    </li>
                                  )
                                )
                              : null
                        )}
                    </Col>
                    <Col md="2">
                      {!readonly ? (
                        <button
                          type="button"
                          className="btn btn-danger array-item-remove"
                          onClick={e => {
                            this.deleteRole(idx);
                          }}
                        >
                          <i className="glyphicon glyphicon-remove" />
                        </button>
                      ) : null}
                    </Col>
                  </Row>
                );
              })}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end"
              }}
            >
              {!readonly ? (
                <button
                  type="button"
                  className="btn btn-info btn-add col-md-2"
                  onClick={this.addRole.bind(this)}
                >
                  <i className="glyphicon glyphicon-plus" />
                </button>
              ) : null}
            </div>
          </div>
          <div className="array-item">
            <Label>对话内容*</Label>
            {messages &&
              messages.length > 0 &&
              messages.map((message, idx) => {
                return (
                  <Row key={idx} style={{ marginBottom: "8px" }}>
                    <Col md="10">
                      <Row style={{ marginBottom: "8px" }}>
                        <Col>
                          <Input
                            type="select"
                            readOnly={readonly}
                            disabled={readonly ? "disabled" : false}
                            value={
                              message.userType === 1
                                ? `${message.name},${message.avatar}`
                                : "2"
                            }
                            onChange={e => {
                              const { value } = e.target;
                              if (value !== "2") {
                                const data = value.split(",");
                                message.name = data[0];
                                message.avatar = data[1];
                                message.userType = 1;
                              } else {
                                message.userType = 2;
                              }
                              messages[idx] = message;
                              this.setState({ messages });
                              this.props.onChange(this.state);
                            }}
                          >
                            <option value="2">用户（第一人称）</option>
                            {roles &&
                              roles.length > 0 &&
                              roles
                                .filter(
                                  role => role.roleAvatar && role.roleName
                                )
                                .map((role, idx) => (
                                  <option
                                    key={idx + 2}
                                    value={`${role.roleName},${
                                      role.roleAvatar
                                    }`}
                                  >
                                    {role.roleName}
                                  </option>
                                ))}
                          </Input>
                        </Col>
                        <Col>
                          <Input
                            type="select"
                            value={message.messageType}
                            readOnly={readonly}
                            disabled={readonly ? "disabled" : false}
                            onChange={e => {
                              message.messageType = Number(e.target.value);
                              messages[idx] = message;
                              this.setState({ messages });
                              this.props.onChange(this.state);
                              // this.changeMessageType(e.target.value);
                            }}
                          >
                            <option value="1">文本对话</option>
                            <option value="2">气泡图片</option>
                            <option value="3">
                              按钮选择对话（按钮选择为对话的最后一步）
                            </option>
                          </Input>
                        </Col>
                      </Row>
                      {message &&
                      (!message.messageType || message.messageType === 1) ? (
                        <Row style={{ marginBottom: "8px" }}>
                          <Col>
                            <textarea
                              style={{
                                border: "1px solid #e4e7ea",
                                borderRadius: "0.25rem",
                                width: "100%"
                              }}
                              type="textarea"
                              value={
                                typeof message.content === "string"
                                  ? message.content
                                  : ""
                              }
                              readOnly={readonly}
                              disabled={readonly ? "disabled" : false}
                              maxLength={100}
                              placeholder="请输入文本对话内容"
                              onChange={e => {
                                message.content = e.target.value || "";
                                messages[idx] = message;
                                this.setState({ messages });
                                this.props.onChange(this.state);
                              }}
                            />
                          </Col>
                        </Row>
                      ) : null}
                      {message && message.messageType === 2 ? (
                        <Fragment>
                          <Row style={{ marginBottom: "8px" }}>
                            <Col>
                              {typeof message.content === "object" ? (
                                <Fragment>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyMessage: "center",
                                      alignItems: "center"
                                    }}
                                  >
                                    <img
                                      alt=""
                                      src={message.content.fileUrl}
                                      style={{
                                        maxWidth: "64px",
                                        maxHeight: "64px"
                                      }}
                                    />
                                    {!readonly ? (
                                      <button
                                        type="button"
                                        className="btn btn-danger array-item-remove"
                                        onClick={e => {
                                          message.content = "";
                                          messages[idx] = message;
                                          this.setState({ messages }, () =>
                                            this.props.onChange(this.state)
                                          );
                                        }}
                                      >
                                        <i className="glyphicon glyphicon-remove" />
                                      </button>
                                    ) : null}
                                  </div>
                                </Fragment>
                              ) : (
                                <div
                                  style={{
                                    position: "relative",
                                    width: "120px",
                                    height: "32px",
                                    border: "1px solid #e4e7ea",
                                    textAlign: "center",
                                    lineHeight: "32px"
                                  }}
                                >
                                  上传气泡图片
                                  <Input
                                    style={{
                                      position: "absolute",
                                      opacity: 0,
                                      top: 0,
                                      left: 0,
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: "0.25rem"
                                    }}
                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                    type="file"
                                    placeholder="上传气泡图片"
                                    onChange={e => {
                                      addMaterialFile({
                                        file: e.target.files[0]
                                      }).then(result => {
                                        if (result.status === 200) {
                                          if (
                                            result.data &&
                                            result.data.resCode === "00"
                                          ) {
                                            message.content = result.data;
                                            messages[idx] = message;
                                            if (
                                              Array.isArray(creativeIdList) &&
                                              creativeIdList.indexOf(
                                                result.data.creativeFileId
                                              ) === -1
                                            ) {
                                              creativeIdList.push(
                                                result.data.creativeFileId
                                              );
                                            }
                                            this.setState(
                                              { messages, creativeIdList },
                                              () =>
                                                this.props.onChange(this.state)
                                            );
                                          } else {
                                            Feedback.toast.error(
                                              result.data && result.data.resMsg
                                            );
                                          }
                                        } else {
                                          Feedback.toast.error(
                                            `${
                                              result.status
                                            }：上传出错了，请重试`
                                          );
                                        }
                                      });
                                    }}
                                  />
                                </div>
                              )}
                            </Col>
                          </Row>
                          <Row style={{ marginBottom: "8px" }}>
                            <Col>
                              <Label style={{ fontWeight: "normal" }}>
                                气泡外链链接
                              </Label>
                              <Input
                                type="url"
                                readOnly={readonly}
                                value={message.link}
                                placeholder="请输入气泡外链链接"
                                onChange={e => {
                                  message.link = e.target.value;
                                  messages[idx] = message;
                                  this.setState({ messages }, () =>
                                    this.props.onChange(this.state)
                                  );
                                }}
                              />
                            </Col>
                          </Row>
                          <Row style={{ marginBottom: "8px" }}>
                            <Col>
                              <Label style={{ fontWeight: "normal" }}>
                                气泡点击监控链接
                              </Label>
                              <Input
                                type="url"
                                readOnly={readonly}
                                value={message.clickTrackLink}
                                placeholder="请输入气泡点击监控链接"
                                onChange={e => {
                                  message.clickTrackLink = e.target.value;
                                  messages[idx] = message;
                                  this.setState({ messages }, () =>
                                    this.props.onChange(this.state)
                                  );
                                }}
                              />
                            </Col>
                          </Row>
                          <Row style={{ marginBottom: "8px" }}>
                            <Col>
                              <Label style={{ fontWeight: "normal" }}>
                                气泡曝光监控链接
                              </Label>
                              <Input
                                type="url"
                                value={message.exposureTrackLink}
                                readOnly={readonly}
                                placeholder="请输入气泡曝光监控链接"
                                onChange={e => {
                                  message.exposureTrackLink = e.target.value;
                                  messages[idx] = message;
                                  this.setState({ messages }, () =>
                                    this.props.onChange(this.state)
                                  );
                                }}
                              />
                            </Col>
                          </Row>
                        </Fragment>
                      ) : null}
                      {message && message.messageType === 3 ? (
                        <Fragment>
                          <Row style={{ marginBottom: "8px" }}>
                            <Col>
                              <Label style={{ fontWeight: "normal" }}>
                                左侧按钮*
                              </Label>
                              <Input
                                readOnly={readonly}
                                required
                                maxLength={5}
                                value={
                                  message &&
                                  message.messageButtons &&
                                  message.messageButtons[0] &&
                                  message.messageButtons[0].title
                                }
                                placeholder={`请输入左侧按钮文案`}
                                onChange={e => {
                                  if (
                                    !/[0-9A-Za-z\u4e00-\u9fa5-]+$/gi.test(
                                      e.target.value
                                    )
                                  ) {
                                    this.setState({ leftBtnError: true });
                                  } else {
                                    this.setState({ leftBtnError: false });
                                  }
                                  if (message.messageButtons) {
                                    message.messageButtons[0].title =
                                      e.target.value;
                                  } else {
                                    message.messageButtons = [
                                      { title: e.target.value }
                                    ];
                                  }
                                  messages[idx] = message;
                                  this.setState(
                                    {
                                      messages
                                    },
                                    () => this.props.onChange(this.state)
                                  );
                                }}
                              />
                              {this.state.leftBtnError ? (
                                <li style={{ color: "#f86c6b" }}>
                                  必填，仅支持汉字/字母/数字
                                </li>
                              ) : null}
                            </Col>
                          </Row>
                          <Row style={{ marginBottom: "8px" }}>
                            <Col>
                              <Label style={{ fontWeight: "normal" }}>
                                左侧按钮外链链接*
                              </Label>
                              <Input
                                type="url"
                                required
                                value={
                                  message &&
                                  message.messageButtons &&
                                  message.messageButtons[0] &&
                                  message.messageButtons[0].link
                                }
                                readOnly={readonly}
                                placeholder={`请输入左侧按钮外链链接`}
                                onChange={e => {
                                  if (message.messageButtons) {
                                    message.messageButtons[0].link =
                                      e.target.value;
                                  } else {
                                    message.messageButtons = [
                                      { link: e.target.value }
                                    ];
                                  }
                                  messages[idx] = message;
                                  this.setState(
                                    {
                                      messages
                                    },
                                    () => this.props.onChange(this.state)
                                  );
                                }}
                              />
                            </Col>
                          </Row>
                          <Row style={{ marginBottom: "8px" }}>
                            <Col>
                              <Label style={{ fontWeight: "normal" }}>
                                点击监控链接
                              </Label>
                              <Input
                                type="url"
                                value={
                                  message &&
                                  message.messageButtons &&
                                  message.messageButtons[0] &&
                                  message.messageButtons[0].clickTrackLink
                                }
                                readOnly={readonly}
                                placeholder="请输入气泡点击监控链接"
                                onChange={e => {
                                  if (message.messageButtons) {
                                    message.messageButtons[0].clickTrackLink =
                                      e.target.value;
                                  } else {
                                    message.messageButtons = [
                                      { clickTrackLink: e.target.value }
                                    ];
                                  }
                                  messages[idx] = message;
                                  this.setState(
                                    {
                                      messages
                                    },
                                    () => this.props.onChange(this.state)
                                  );
                                }}
                              />
                            </Col>
                          </Row>
                          <Row style={{ marginBottom: "8px" }}>
                            <Col>
                              <Label style={{ fontWeight: "normal" }}>
                                曝光监控链接
                              </Label>
                              <Input
                                type="url"
                                value={
                                  message &&
                                  message.messageButtons &&
                                  message.messageButtons[0] &&
                                  message.messageButtons[0].exposureTrackLink
                                }
                                readOnly={readonly}
                                placeholder="请输入气泡曝光监控链接"
                                onChange={e => {
                                  if (message.messageButtons) {
                                    message.messageButtons[0].exposureTrackLink =
                                      e.target.value;
                                  } else {
                                    message.messageButtons = [
                                      { exposureTrackLink: e.target.value }
                                    ];
                                  }
                                  messages[idx] = message;
                                  this.setState(
                                    {
                                      messages
                                    },
                                    () => this.props.onChange(this.state)
                                  );
                                }}
                              />
                            </Col>
                          </Row>
                          <Row style={{ marginBottom: "8px" }}>
                            <Col>
                              <Label style={{ fontWeight: "normal" }}>
                                右侧按钮*
                              </Label>
                              <Input
                                readOnly={readonly}
                                maxLength={5}
                                required
                                value={
                                  message &&
                                  message.messageButtons &&
                                  message.messageButtons[1] &&
                                  message.messageButtons[1].title
                                }
                                placeholder={`请输入右侧按钮文案`}
                                onChange={e => {
                                  if (
                                    !/[0-9A-Za-z\u4e00-\u9fa5-]+$/gi.test(
                                      e.target.value
                                    )
                                  ) {
                                    this.setState({ rightBtnError: true });
                                  } else {
                                    this.setState({ rightBtnError: false });
                                  }
                                  if (message.messageButtons) {
                                    if (!message.messageButtons[1]) {
                                      message.messageButtons[1] = {};
                                    }
                                    message.messageButtons[1].title =
                                      e.target.value;
                                  } else {
                                    message.messageButtons = [
                                      {},
                                      { title: e.target.value }
                                    ];
                                  }
                                  messages[idx] = message;
                                  this.setState(
                                    {
                                      messages
                                    },
                                    () => this.props.onChange(this.state)
                                  );
                                }}
                              />
                              {this.state.rightBtnError ? (
                                <li style={{ color: "#f86c6b" }}>
                                  必填，仅支持汉字/字母/数字
                                </li>
                              ) : null}
                            </Col>
                          </Row>
                          <Row style={{ marginBottom: "8px" }}>
                            <Col>
                              <Label style={{ fontWeight: "normal" }}>
                                右侧按钮外链链接*
                              </Label>
                              <Input
                                type="url"
                                required
                                value={
                                  message &&
                                  message.messageButtons &&
                                  message.messageButtons[1] &&
                                  message.messageButtons[1].link
                                }
                                readOnly={readonly}
                                placeholder={`请输入右侧按钮外链链接`}
                                onChange={e => {
                                  if (message.messageButtons) {
                                    if (!message.messageButtons[1]) {
                                      message.messageButtons[1] = {};
                                    }
                                    message.messageButtons[1].link =
                                      e.target.value;
                                  } else {
                                    message.messageButtons = [
                                      {},
                                      { link: e.target.value }
                                    ];
                                  }
                                  messages[idx] = message;
                                  this.setState(
                                    {
                                      messages
                                    },
                                    () => this.props.onChange(this.state)
                                  );
                                }}
                              />
                            </Col>
                          </Row>
                          <Row style={{ marginBottom: "8px" }}>
                            <Col>
                              <Label style={{ fontWeight: "normal" }}>
                                点击监控链接
                              </Label>
                              <Input
                                type="url"
                                value={
                                  message &&
                                  message.messageButtons &&
                                  message.messageButtons[1] &&
                                  message.messageButtons[1].clickTrackLink
                                }
                                readOnly={readonly}
                                placeholder="请输入气泡点击监控链接"
                                onChange={e => {
                                  if (message.messageButtons) {
                                    if (!message.messageButtons[1]) {
                                      message.messageButtons[1] = {};
                                    }
                                    message.messageButtons[1].clickTrackLink =
                                      e.target.value;
                                  } else {
                                    message.messageButtons = [
                                      {},
                                      { clickTrackLink: e.target.value }
                                    ];
                                  }
                                  messages[idx] = message;
                                  this.setState(
                                    {
                                      messages
                                    },
                                    () => this.props.onChange(this.state)
                                  );
                                }}
                              />
                            </Col>
                          </Row>
                          <Row style={{ marginBottom: "8px" }}>
                            <Col>
                              <Label style={{ fontWeight: "normal" }}>
                                曝光监控链接
                              </Label>
                              <Input
                                type="url"
                                value={
                                  message &&
                                  message.messageButtons &&
                                  message.messageButtons[1] &&
                                  message.messageButtons[1].exposureTrackLink
                                }
                                readOnly={readonly}
                                placeholder="请输入气泡曝光监控链接"
                                onChange={e => {
                                  if (message.messageButtons) {
                                    if (!message.messageButtons[1]) {
                                      message.messageButtons[1] = {};
                                    }
                                    message.messageButtons[1].exposureTrackLink =
                                      e.target.value;
                                  } else {
                                    message.messageButtons = [
                                      {},
                                      { exposureTrackLink: e.target.value }
                                    ];
                                  }
                                  messages[idx] = message;
                                  this.setState(
                                    {
                                      messages
                                    },
                                    () => this.props.onChange(this.state)
                                  );
                                }}
                              />
                            </Col>
                          </Row>
                        </Fragment>
                      ) : null}
                      <Row style={{ marginBottom: "8px" }}>
                        <Col>
                          <Label style={{ fontWeight: "normal" }}>
                            展示持续时间*
                          </Label>
                          <Row>
                            <Col>
                              <Input
                                readOnly={readonly}
                                value={message.duration}
                                onChange={e => {
                                  message.duration = e.target.value >> 0;
                                  messages[idx] = message;
                                  this.setState(
                                    {
                                      messages
                                    },
                                    () => this.props.onChange(this.state)
                                  );
                                }}
                              />
                              {errorSchema &&
                                errorSchema.messages &&
                                Object.keys(errorSchema.messages).map(
                                  key =>
                                    errorSchema.messages[key].duration
                                      ? errorSchema.messages[
                                          key
                                        ].duration.__errors.map((err, idx) => (
                                          <li
                                            key={idx}
                                            style={{ color: "#f86c6b" }}
                                          >
                                            {err}
                                          </li>
                                        ))
                                      : null
                                )}
                            </Col>
                            <Col>
                              <span>秒</span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Col md="2">
                      {!readonly ? (
                        <button
                          type="button"
                          className="btn btn-danger array-item-remove"
                          onClick={e => {
                            this.deleteMessage(idx);
                          }}
                        >
                          <i className="glyphicon glyphicon-remove" />
                        </button>
                      ) : null}
                    </Col>
                  </Row>
                );
              })}

            {errorSchema &&
              errorSchema.messages &&
              errorSchema.messages.__errors &&
              errorSchema.messages.__errors.map((err, idx) => (
                <li key={idx} style={{ color: "#f86c6b" }}>
                  {err || "必填项"}
                </li>
              ))}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end"
              }}
            >
              {!readonly ? (
                <button
                  type="button"
                  className="btn btn-info btn-add col-md-2"
                  onClick={this.addMessage.bind(this)}
                >
                  <i className="glyphicon glyphicon-plus" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
