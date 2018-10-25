import React, { Component, Fragment } from "react";
import { Label, Input, Row, Col } from "reactstrap";

import { addMaterialFile } from "../api";

export default class Bubbles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData,
      messageType: 1,
      interactionTemplateId:
        props.schema.properties.interactionTemplateId.enum[0],
      readonly: Boolean(props.uiSchema["ui:disabled"])
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.formData,
      readonly: Boolean(nextProps.uiSchema["ui:disabled"])
    });
  }

  onChange = name => {
    return event => {
      this.setState(
        {
          [name]: event.target.value
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
    this.setState({ roles });
    this.props.onChange(this.state);
  };

  deleteRole = idx => {
    let { roles = [], messages = [] } = this.state;
    if (JSON.stringify(messages).includes(roles[idx].roleName)) {
      if (!window.confirm("对话内容中有该角色，确认删除该角色吗？")) {
        return;
      }
    }
    roles.splice(idx, 1);
    this.setState({ roles });
    this.props.onChange(this.state);
  };

  addMessage = () => {
    let { messages = [] } = this.state;
    messages.push({
      duration: null
    });
    this.setState({ messages });
    this.props.onChange(this.state);
  };

  deleteMessage = idx => {
    let { messages = [] } = this.state;
    messages.splice(idx, 1);
    this.setState({ messages });
    this.props.onChange(this.state);
  };

  changeMessageType = value => {
    this.setState({
      messageType: value
    });
  };

  render() {
    let { schema } = this.props;
    let { roles = [], messages = [], messageType, readonly } = this.state;
    const {
      creativeName,
      interactionTemplateId,
      isShowAds = true,
      isShowClose = true,
      duration
    } = this.state;

    return (
      <Fragment>
        <div className="array-item">
          <Label>素材名称*</Label>
          <Input
            value={creativeName}
            onChange={this.onChange("creativeName")}
            maxLength={10}
            required
            readOnly={readonly}
            pattern={/[0-9A-Za-z\u4e00-\u9fa5-]+$/}
          />
        </div>
        <div className="array-item">
          <Label>素材类型</Label>
          <Input type="select" disabled>
            {schema &&
              schema.properties &&
              schema.properties.interactionTypeId &&
              schema.properties.interactionTypeId.enum.map((em, idx) => (
                <option value={em} key={idx}>
                  {schema.properties.interactionTypeId.enumNames[idx]}
                </option>
              ))}
          </Input>
        </div>
        <div className="array-item">
          <Label>素材模板*</Label>
          <Input
            type="select"
            readOnly={readonly}
            value={interactionTemplateId}
            onChange={this.onChange("interactionTemplateId")}
          >
            {schema &&
              schema.properties &&
              schema.properties.interactionTemplateId &&
              schema.properties.interactionTemplateId.enum.map((em, idx) => (
                <option value={em} key={idx}>
                  {schema.properties.interactionTemplateId.enumNames[idx]}
                </option>
              ))}
          </Input>
        </div>
        <div className="array-item">
          <Label check>
            <Input
              checked
              type="checkbox"
              disabled={readonly ? "disabled" : false}
              value={isShowAds}
              onChange={this.onChange("isShowAds")}
            />
            {`  广告标识是否可见`}
          </Label>
        </div>
        <div className="array-item">
          <Label check>
            <Input
              checked
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
                <Row key={idx} style={{ marginBottom: "8px" }}>
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
                        <input
                          type="file"
                          onChange={e => {
                            if (e.target.files.length > 0) {
                              addMaterialFile({ file: e.target.files[0] }).then(
                                result => {
                                  if (result.status === 200) {
                                    if (
                                      result.data &&
                                      result.data.resCode === "00"
                                    ) {
                                      role.roleAvatar = result.data.fileUrl;
                                      roles[idx] = role;
                                      this.setState({ roles });
                                      this.props.onChange(this.state);
                                    }
                                  }
                                  // console.log(result);
                                }
                              );
                            }
                          }}
                        />
                      </div>
                    )}
                  </Col>
                  <Col md="5">
                    <input
                      type="text"
                      readOnly={readonly}
                      placeholder="请输入角色名称"
                      onChange={e => {
                        role.roleName = e.target.value;
                        roles[idx] = role;
                        this.setState({ roles });
                        this.props.onChange(this.state);
                      }}
                    />
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
                          defaultValue="1"
                          onChange={e => {
                            const { value } = e.target;
                            if (value !== "2") {
                              const data = value.split(",");
                              message.name = data[0];
                              message.avatar = data[1];
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
                              .filter(role => role.roleAvatar && role.roleName)
                              .map((role, idx) => (
                                <option
                                  key={idx + 2}
                                  value={`${role.roleName},${role.roleAvatar}`}
                                >
                                  {role.roleName}
                                </option>
                              ))}
                        </Input>
                      </Col>
                      <Col>
                        <Input
                          type="select"
                          readOnly={readonly}
                          defaultValue="1"
                          onChange={e => {
                            this.changeMessageType(e.target.value);
                          }}
                        >
                          <option value={`${idx}1`}>文本对话</option>
                          <option value={`${idx}2`}>气泡图片</option>
                          <option value={`${idx}3`}>按钮选择对话</option>
                        </Input>
                      </Col>
                    </Row>
                    {messageType === `${idx}1` ? (
                      <Row style={{ marginBottom: "8px" }}>
                        <Col>
                          <Input
                            type="textarea"
                            readOnly={readonly}
                            maxLength={100}
                            placeholder="请输入文本对话内容"
                            onChange={e => {
                              message.content = e.target.value || "";
                            }}
                          />
                        </Col>
                      </Row>
                    ) : null}
                    {messageType === `${idx}2` ? (
                      <Fragment>
                        <Row style={{ marginBottom: "8px" }}>
                          <Col>
                            {message.content ? (
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
                                    src={JSON.parse(message.content).fileUrl}
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
                                        message.content = null;
                                        messages[idx] = message;
                                        this.setState({ messages });
                                        this.props.onChange(this.state);
                                      }}
                                    >
                                      <i className="glyphicon glyphicon-remove" />
                                    </button>
                                  ) : null}
                                </div>
                              </Fragment>
                            ) : (
                              <Input
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
                                        message.content = JSON.stringify(
                                          result.data
                                        );
                                        messages[idx] = message;
                                        this.setState({ messages });
                                        this.props.onChange(this.state);
                                      }
                                    }
                                  });
                                }}
                              />
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
                              placeholder="请输入气泡外链链接"
                              onChange={e => {
                                message.link = e.target.value;
                                messages[idx] = message;
                                this.setState({ messages });
                                this.props.onChange(this.state);
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
                              placeholder="请输入气泡点击监控链接"
                              onChange={e => {
                                message.clickTrackLink = e.target.value;
                                messages[idx] = message;
                                this.setState({ messages });
                                this.props.onChange(this.state);
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
                              readOnly={readonly}
                              placeholder="请输入气泡曝光监控链接"
                              onChange={e => {
                                message.exposureTrackLink = e.target.value;
                                messages[idx] = message;
                                this.setState({ messages });
                                this.props.onChange(this.state);
                              }}
                            />
                          </Col>
                        </Row>
                      </Fragment>
                    ) : null}
                    {messageType === `${idx}3` ? (
                      <Fragment>
                        <Row style={{ marginBottom: "8px" }}>
                          <Col>
                            <Label style={{ fontWeight: "normal" }}>
                              左侧按钮*
                            </Label>
                            <Input
                              readOnly={readonly}
                              placeholder={`请输入左侧按钮文案`}
                              onChange={e => {
                                if (message.messageButtons) {
                                  message.messageButtons[0].title =
                                    e.target.value;
                                } else {
                                  message.messageButtons = [
                                    { title: e.target.value }
                                  ];
                                }
                              }}
                            />
                          </Col>
                        </Row>
                        <Row style={{ marginBottom: "8px" }}>
                          <Col>
                            <Label style={{ fontWeight: "normal" }}>
                              左侧按钮外链链接*
                            </Label>
                            <Input
                              type="url"
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
                              placeholder={`请输入右侧按钮文案`}
                              onChange={e => {
                                if (message.messageButtons) {
                                  message.messageButtons[1].title =
                                    e.target.value;
                                } else {
                                  message.messageButtons = [
                                    ,
                                    { title: e.target.value }
                                  ];
                                }
                              }}
                            />
                          </Col>
                        </Row>
                        <Row style={{ marginBottom: "8px" }}>
                          <Col>
                            <Label style={{ fontWeight: "normal" }}>
                              右侧按钮外链链接*
                            </Label>
                            <Input
                              type="url"
                              readOnly={readonly}
                              placeholder={`请输入右侧按钮外链链接`}
                              onChange={e => {
                                if (message.messageButtons) {
                                  message.messageButtons[1].link =
                                    e.target.value;
                                } else {
                                  message.messageButtons = [
                                    ,
                                    { link: e.target.value }
                                  ];
                                }
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
                              readOnly={readonly}
                              placeholder="请输入气泡点击监控链接"
                              onChange={e => {
                                if (message.messageButtons) {
                                  message.messageButtons[1].clickTrackLink =
                                    e.target.value;
                                } else {
                                  message.messageButtons = [
                                    ,
                                    { clickTrackLink: e.target.value }
                                  ];
                                }
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
                              readOnly={readonly}
                              placeholder="请输入气泡曝光监控链接"
                              onChange={e => {
                                if (message.messageButtons) {
                                  message.messageButtons[1].exposureTrackLink =
                                    e.target.value;
                                } else {
                                  message.messageButtons = [
                                    ,
                                    { exposureTrackLink: e.target.value }
                                  ];
                                }
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
                        <Input
                          readOnly={readonly}
                          value={duration}
                          onChange={e => {
                            this.setState({
                              duration: e.target.value
                            });
                          }}
                        />
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
      </Fragment>
    );
  }
}
