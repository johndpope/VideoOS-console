import React, { Component, Fragment } from "react";
import { Label, Input, Row, Col } from "reactstrap";

import { addMaterialFile } from "../api";

export default class Bubbles extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.formData, contentType: 1 };
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
    let { roles = [] } = this.state;
    roles.splice(idx, 1);
    this.setState({ roles });
    this.props.onChange(this.state);
  };

  addContent = () => {
    let { contents = [] } = this.state;
    contents.push({
      duration: null
    });
    this.setState({ contents });
    this.props.onChange(this.state);
  };

  deleteContent = idx => {
    let { contents = [] } = this.state;
    contents.splice(idx, 1);
    this.setState({ contents });
    this.props.onChange(this.state);
  };

  changeContentType = value => {
    this.setState({
      contentType: Number(value)
    });
  };

  render() {
    let { schema } = this.props;
    let { roles = [], contents = [], contentType } = this.state;
    const {
      creativeName,
      interactionTypeId,
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
          />
        </div>
        <div className="array-item">
          <Label>素材类型</Label>
          <Input type="select" disabled>
            {schema &&
              schema.properties &&
              schema.properties.interactionTypeId &&
              schema.properties.interactionTypeId.enum.map((em, idx) => (
                <option value={em}>
                  {schema.properties.interactionTypeId.enumNames[idx]}
                </option>
              ))}
          </Input>
        </div>
        <div className="array-item">
          <Label>素材模板*</Label>
          <Input
            type="select"
            value={interactionTemplateId}
            onChange={this.onChange("interactionTemplateId")}
          >
            {schema &&
              schema.properties &&
              schema.properties.interactionTemplateId &&
              schema.properties.interactionTemplateId.enum.map((em, idx) => (
                <option value={em}>
                  {schema.properties.interactionTemplateId.enumNames[idx]}
                </option>
              ))}
          </Input>
        </div>
        <div className="array-item">
          <Label check>
            <Input
              type="checkbox"
              value={isShowAds}
              onChange={this.onChange("isShowAds")}
            />
            {"  "}
            广告标识是否可见
          </Label>
        </div>
        <div className="array-item">
          <Label check>
            <Input
              type="checkbox"
              value={isShowClose}
              onChange={this.onChange("isShowClose")}
            />
            {"  "}
            关闭按钮是否可见
          </Label>
        </div>
        <div className="array-item">
          <Label>角色*</Label>
          {roles &&
            roles.length > 0 &&
            roles.map((role, idx) => {
              return (
                <Row key={idx}>
                  <Col md="5">
                    {role.roleAvatar ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <img
                          src={role.roleAvatar}
                          style={{ maxWidth: "128px", maxHeight: "128px" }}
                        />
                        <button
                          type="button"
                          className="btn btn-danger array-item-remove"
                          onClick={e => {
                            role.roleAvatar = null;
                            this.state.roles[idx] = role;
                            this.setState({ roles });
                          }}
                        >
                          <i className="glyphicon glyphicon-remove" />
                        </button>
                      </div>
                    ) : (
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
                                    this.state.roles[idx] = role;
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
                    )}
                  </Col>
                  <Col md="5">
                    <input
                      type="text"
                      placeholder="请输入角色名称"
                      onChange={e => {
                        role.roleName = e.target.value;
                        this.state.roles[idx] = role;
                        this.setState({ roles });
                        this.props.onChange(this.state);
                      }}
                    />
                  </Col>
                  <Col md="2">
                    <button
                      type="button"
                      className="btn btn-danger array-item-remove"
                      onClick={e => {
                        this.deleteRole(idx);
                      }}
                    >
                      <i className="glyphicon glyphicon-remove" />
                    </button>
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
            <button
              type="button"
              className="btn btn-info btn-add col-md-2"
              onClick={this.addRole.bind(this)}
            >
              <i className="glyphicon glyphicon-plus" />
            </button>
          </div>
        </div>
        <div className="array-item">
          <Label>对话内容*</Label>
          {contents &&
            contents.length > 0 &&
            contents.map((content, idx) => {
              return (
                <Row key={idx}>
                  <Col md="10">
                    <Row>
                      <Col>
                        <Input
                          type="select"
                          defaultValue="1"
                          onChange={e => {}}
                        >
                          <option value="1">用户（第一人称）</option>
                          {roles &&
                            roles.length > 0 &&
                            roles
                              .filter(role => role.roleAvatar && role.roleName)
                              .map((role, idx) => (
                                <option key={idx + 2}>{role.roleName}</option>
                              ))}
                        </Input>
                      </Col>
                      <Col>
                        <Input
                          type="select"
                          defaultValue="1"
                          onChange={e => {
                            this.changeContentType(e.target.value);
                          }}
                        >
                          <option value="1">文本对话</option>
                          <option value="2">气泡图片</option>
                          <option value="3">按钮选择对话</option>
                        </Input>
                      </Col>
                    </Row>
                    {contentType === 1 ? (
                      <Row>
                        <Col>
                          <Input
                            type="textarea"
                            placeholder="请输入文本对话内容"
                            onChange={e => {}}
                          />
                        </Col>
                      </Row>
                    ) : null}
                    {contentType === 2 ? (
                      <Fragment>
                        <Row>
                          <Col>
                            <Input
                              type="file"
                              onChange={e => {
                                addMaterialFile({
                                  file: e.target.files[0]
                                }).then(result => {
                                  if (result.status === 200) {
                                    if (
                                      result.data &&
                                      result.data.resCode === "00"
                                    ) {
                                      // TODO
                                      this.props.onChange(this.state);
                                    }
                                  }
                                });
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Label>气泡外链链接</Label>
                            <Input
                              placeholder="请输入气泡外链链接"
                              onChange={e => {}}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Label>气泡点击监控链接</Label>
                            <Input
                              placeholder="请输入气泡点击监控链接"
                              onChange={e => {}}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Label>气泡曝光监控链接</Label>
                            <Input
                              placeholder="请输入气泡曝光监控链接"
                              onChange={e => {}}
                            />
                          </Col>
                        </Row>
                      </Fragment>
                    ) : null}
                    {contentType === 3 ? (
                      <Fragment>
                        <Row>
                          <Col>
                            <Label>
                              {content && content.userType === 1 ? "左" : "右"}
                              侧按钮*
                            </Label>
                            <Input
                              placeholder={`请输入${
                                content && content.userType === 1 ? "左" : "右"
                              }侧按钮文案`}
                              onChange={e => {}}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Label>
                              {content && content.userType === 1 ? "左" : "右"}
                              侧按钮外链链接*
                            </Label>
                            <Input
                              placeholder={`请输入${
                                content && content.userType === 1 ? "左" : "右"
                              }侧按钮外链链接`}
                              onChange={e => {}}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Label>点击监控链接</Label>
                            <Input
                              placeholder="请输入气泡点击监控链接"
                              onChange={e => {}}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Label>曝光监控链接</Label>
                            <Input
                              placeholder="请输入气泡曝光监控链接"
                              onChange={e => {}}
                            />
                          </Col>
                        </Row>
                      </Fragment>
                    ) : null}
                    <Row>
                      <Col>
                        <Label>展示持续时间*</Label>
                        <Input
                          value={duration}
                          onChange={e => {
                            this.setState({
                              duration: Number(e.target.value)
                            });
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col md="2">
                    <button
                      type="button"
                      className="btn btn-danger array-item-remove"
                      onClick={e => {
                        this.deleteContent(idx);
                      }}
                    >
                      <i className="glyphicon glyphicon-remove" />
                    </button>
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
            <button
              type="button"
              className="btn btn-info btn-add col-md-2"
              onClick={this.addContent.bind(this)}
            >
              <i className="glyphicon glyphicon-plus" />
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}
