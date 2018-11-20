import React, { Component, Fragment } from "react";
import { Label, Input, Row, Col } from "reactstrap";
import { Feedback } from "@icedesign/base";

import { addMaterialFile } from "../api";

export default class Cards extends Component {
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

  addHotspot = () => {
    let { hotspotArray = [] } = this.state;
    hotspotArray.push({
      imageUrl: null,
      title: null
    });
    this.setState({ hotspotArray }, () => this.props.onChange(this.state));
  };

  deleteHotspot = idx => {
    let { hotspotArray = [] } = this.state;
    hotspotArray.splice(idx, 1);
    this.setState({ hotspotArray }, () => this.props.onChange(this.state));
  };

  render() {
    let { schema, errorSchema } = this.props;
    let {
      creativeName,
      interactionTemplateId,
      isShowAds = true,
      isShowClose = true,
      hotspotArray = [{}, {}],
      readonly,
      success = {},
      collect = { linkType: 2 },
      creativeIdList = []
    } = this.state;

    return (
      <Fragment>
        <h3>1.基本信息：</h3>
        <div className="array-item">
          <Label>素材名称*</Label>
          <Input
            value={creativeName}
            onChange={this.onChange("creativeName")}
            maxLength={30}
            required
            readOnly={readonly}
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
          <Label>所属应用*</Label>
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
          <Label>素材主题*</Label>
          <Input
            type="select"
            readOnly={readonly}
            disabled={readonly ? "disabled" : false}
            value={interactionTemplateId}
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
        <h3>2.配置卡牌（2-3张）：</h3>
        <div className="array-item">
          <Label>热点1：</Label>
          <Row style={{ marginBottom: "8px" }}>
            <Col>
              <Label style={{ fontWeight: "normal" }}>热点图片*</Label>
              <Row style={{ marginBottom: "8px" }}>
                <Col>
                  {hotspotArray[0] && hotspotArray[0].imageUrl ? (
                    <Fragment>
                      <div
                        key="hsa1"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyMessage: "center",
                          alignItems: "center"
                        }}
                      >
                        <img
                          alt=""
                          src={hotspotArray[0].imageUrl}
                          style={{
                            maxWidth: "240px",
                            maxHeight: "240px"
                          }}
                        />
                        {!readonly ? (
                          <button
                            type="button"
                            className="btn btn-danger array-item-remove"
                            onClick={e => {
                              hotspotArray[0] = {
                                ...hotspotArray[0],
                                imageUrl: ""
                              };
                              this.setState({ hotspotArray }, () =>
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
                    <Fragment>
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
                        上传热点图片
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
                          placeholder="上传图片"
                          onChange={e => {
                            const { files } = e.target;
                            if (!files || files.length <= 0) {
                              return;
                            }
                            addMaterialFile({
                              file: files[0]
                            }).then(result => {
                              if (result.status === 200) {
                                if (
                                  result.data &&
                                  result.data.resCode === "00"
                                ) {
                                  hotspotArray[0] = {
                                    ...hotspotArray[0],
                                    imageUrl: result.data.fileUrl
                                  };
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
                                    { hotspotArray, creativeIdList },
                                    () => this.props.onChange(this.state)
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
                            });
                          }}
                        />
                      </div>
                      {errorSchema &&
                        errorSchema.hotspotArray &&
                        errorSchema.hotspotArray[0] &&
                        errorSchema.hotspotArray[0].imageUrl &&
                        errorSchema.hotspotArray[0].imageUrl.__errors &&
                        errorSchema.hotspotArray[0].imageUrl.__errors.map(
                          (err, idx) => (
                            <li key={idx} style={{ color: "#f86c6b" }}>
                              请上传图片
                            </li>
                          )
                        )}
                    </Fragment>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ marginBottom: "8px" }}>
            <Col>
              <Label style={{ fontWeight: "normal" }}>热点标题*</Label>
              <Input
                type="url"
                readOnly={readonly}
                value={hotspotArray[0].title}
                placeholder="请输入卡牌热点标题"
                maxLength={10}
                onChange={e => {
                  hotspotArray[0] = {
                    ...hotspotArray[0],
                    title: e.target.value
                  };
                  this.setState({ hotspotArray }, () =>
                    this.props.onChange(this.state)
                  );
                }}
              />
              {errorSchema &&
                errorSchema.hotspotArray &&
                errorSchema.hotspotArray[0] &&
                errorSchema.hotspotArray[0].title &&
                errorSchema.hotspotArray[0].title.__errors &&
                errorSchema.hotspotArray[0].title.__errors.map((err, idx) => (
                  <li key={idx} style={{ color: "#f86c6b" }}>
                    {err}
                  </li>
                ))}
            </Col>
          </Row>
          <Row style={{ marginBottom: "8px" }}>
            <Col>
              <Label style={{ fontWeight: "normal" }}>气泡点击监控链接</Label>
              <Input
                type="url"
                readOnly={readonly}
                value={hotspotArray[0].clickTrackLink}
                placeholder="请输入气泡点击监控链接"
                onChange={e => {
                  hotspotArray[0] = {
                    ...hotspotArray[0],
                    clickTrackLink: e.target.value
                  };
                  this.setState({ hotspotArray }, () =>
                    this.props.onChange(this.state)
                  );
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "8px" }}>
            <Col>
              <Label style={{ fontWeight: "normal" }}>气泡曝光监控链接</Label>
              <Input
                type="url"
                value={hotspotArray[0].exposureTrackLink}
                readOnly={readonly}
                placeholder="请输入气泡曝光监控链接"
                onChange={e => {
                  hotspotArray[0] = {
                    ...hotspotArray[0],
                    exposureTrackLink: e.target.value
                  };
                  this.setState({ hotspotArray }, () =>
                    this.props.onChange(this.state)
                  );
                }}
              />
            </Col>
          </Row>
        </div>
        <div className="array-item">
          <Label>热点2：</Label>
          <Row style={{ marginBottom: "8px" }}>
            <Col>
              <Label style={{ fontWeight: "normal" }}>热点图片*</Label>
              <Row style={{ marginBottom: "8px" }}>
                <Col>
                  {hotspotArray[1] && hotspotArray[1].imageUrl ? (
                    <Fragment>
                      <div
                        key="hsa2"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyMessage: "center",
                          alignItems: "center"
                        }}
                      >
                        <img
                          alt=""
                          src={hotspotArray[1].imageUrl}
                          style={{
                            maxWidth: "240px",
                            maxHeight: "240px"
                          }}
                        />
                        {!readonly ? (
                          <button
                            type="button"
                            className="btn btn-danger array-item-remove"
                            onClick={e => {
                              hotspotArray[1].imageUrl = "";
                              this.setState({ hotspotArray }, () =>
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
                    <Fragment>
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
                        上传热点图片
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
                          placeholder="上传图片"
                          onChange={e => {
                            const { files } = e.target;
                            if (!files || files.length <= 0) {
                              return;
                            }
                            addMaterialFile({
                              file: files[0]
                            }).then(result => {
                              if (result.status === 200) {
                                if (
                                  result.data &&
                                  result.data.resCode === "00"
                                ) {
                                  hotspotArray[1].imageUrl =
                                    result.data.fileUrl;
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
                                    { hotspotArray, creativeIdList },
                                    () => this.props.onChange(this.state)
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
                            });
                          }}
                        />
                      </div>
                      {errorSchema &&
                        errorSchema.hotspotArray &&
                        errorSchema.hotspotArray[1] &&
                        errorSchema.hotspotArray[1].imageUrl &&
                        errorSchema.hotspotArray[1].imageUrl.__errors &&
                        errorSchema.hotspotArray[1].imageUrl.__errors.map(
                          (err, idx) => (
                            <li key={idx} style={{ color: "#f86c6b" }}>
                              请上传图片
                            </li>
                          )
                        )}
                    </Fragment>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ marginBottom: "8px" }}>
            <Col>
              <Label style={{ fontWeight: "normal" }}>热点标题*</Label>
              <Input
                type="url"
                readOnly={readonly}
                maxLength={10}
                value={hotspotArray[1].title}
                placeholder="请输入卡牌热点标题"
                onChange={e => {
                  hotspotArray[1].title = e.target.value;
                  this.setState({ hotspotArray }, () =>
                    this.props.onChange(this.state)
                  );
                }}
              />
              {errorSchema &&
                errorSchema.hotspotArray &&
                errorSchema.hotspotArray[1] &&
                errorSchema.hotspotArray[1].title &&
                errorSchema.hotspotArray[1].title.__errors &&
                errorSchema.hotspotArray[1].title.__errors.map((err, idx) => (
                  <li key={idx} style={{ color: "#f86c6b" }}>
                    {err}
                  </li>
                ))}
            </Col>
          </Row>
          <Row style={{ marginBottom: "8px" }}>
            <Col>
              <Label style={{ fontWeight: "normal" }}>气泡点击监控链接</Label>
              <Input
                type="url"
                readOnly={readonly}
                value={hotspotArray[1].clickTrackLink}
                placeholder="请输入气泡点击监控链接"
                onChange={e => {
                  hotspotArray[1].clickTrackLink = e.target.value;
                  this.setState({ hotspotArray }, () =>
                    this.props.onChange(this.state)
                  );
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "8px" }}>
            <Col>
              <Label style={{ fontWeight: "normal" }}>气泡曝光监控链接</Label>
              <Input
                type="url"
                value={hotspotArray[1].exposureTrackLink}
                readOnly={readonly}
                placeholder="请输入气泡曝光监控链接"
                onChange={e => {
                  hotspotArray[1].exposureTrackLink = e.target.value;
                  this.setState({ hotspotArray }, () =>
                    this.props.onChange(this.state)
                  );
                }}
              />
            </Col>
          </Row>
        </div>
        {hotspotArray &&
          hotspotArray.length > 2 &&
          hotspotArray.slice(2).map((hsa, idx) => (
            <div className="array-item" key={idx}>
              <Label>
                热点
                {idx + 3}：
              </Label>
              <Row>
                <Col md="10">
                  <Row style={{ marginBottom: "8px" }}>
                    <Col>
                      <Label style={{ fontWeight: "normal" }}>热点图片*</Label>
                      <Row style={{ marginBottom: "8px" }}>
                        <Col>
                          {hsa && hsa.imageUrl ? (
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
                                  src={hsa.imageUrl}
                                  style={{
                                    maxWidth: "240px",
                                    maxHeight: "240px"
                                  }}
                                />
                                {!readonly ? (
                                  <button
                                    type="button"
                                    className="btn btn-danger array-item-remove"
                                    onClick={e => {
                                      hsa.imageUrl = "";
                                      this.setState({ hotspotArray }, () =>
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
                            <Fragment>
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
                                上传热点图片
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
                                  placeholder="上传图片"
                                  onChange={e => {
                                    const { files } = e.target;
                                    if (!files || files.length <= 0) {
                                      return;
                                    }
                                    addMaterialFile({
                                      file: files[0]
                                    }).then(result => {
                                      if (result.status === 200) {
                                        if (
                                          result.data &&
                                          result.data.resCode === "00"
                                        ) {
                                          hsa.imageUrl = result.data.fileUrl;
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
                                            { hotspotArray, creativeIdList },
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
                                          `${result.status}：上传出错了，请重试`
                                        );
                                      }
                                    });
                                  }}
                                />
                              </div>
                            </Fragment>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "8px" }}>
                    <Col>
                      <Label style={{ fontWeight: "normal" }}>热点标题*</Label>
                      <Input
                        type="url"
                        readOnly={readonly}
                        value={hsa.title}
                        maxLength={10}
                        placeholder="请输入卡牌热点标题"
                        onChange={e => {
                          hsa.title = e.target.value;
                          this.setState({ hotspotArray }, () =>
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
                        value={hsa.clickTrackLink}
                        placeholder="请输入气泡点击监控链接"
                        onChange={e => {
                          hsa.clickTrackLink = e.target.value;
                          hotspotArray[idx] = hsa;
                          this.setState({ hotspotArray }, () =>
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
                        value={hsa.exposureTrackLink}
                        readOnly={readonly}
                        placeholder="请输入气泡曝光监控链接"
                        onChange={e => {
                          hsa.exposureTrackLink = e.target.value;
                          hotspotArray[idx] = hsa;
                          this.setState({ hotspotArray }, () =>
                            this.props.onChange(this.state)
                          );
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
                        this.deleteHotspot(idx + 2);
                      }}
                    >
                      <i className="glyphicon glyphicon-remove" />
                    </button>
                  ) : null}
                </Col>
              </Row>
            </div>
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
              onClick={this.addHotspot.bind(this)}
            >
              <i className="glyphicon glyphicon-plus" />
            </button>
          ) : null}
        </div>
        <h3>3.收集成功后续：</h3>
        <div className="array-item">
          <Label>收集成功弹窗内容</Label>
          <textarea
            style={{
              border: "1px solid #e4e7ea",
              borderRadius: "0.25rem",
              width: "100%"
            }}
            placeholder="请输入内容，非必填"
            value={(collect && collect.content) || ""}
            maxLength={50}
            required
            readOnly={readonly}
            onChange={e => {
              collect.content = e.target.value;
              this.setState({ collect }, () => this.props.onChange(this.state));
            }}
          />
        </div>
        <div className="array-item">
          <Label>奖励图片*</Label>
          <Row style={{ marginBottom: "8px" }}>
            <Col>
              {collect && collect.imageUrl ? (
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
                      src={collect.imageUrl}
                      style={{
                        maxWidth: "240px",
                        maxHeight: "240px"
                      }}
                    />
                    {!readonly ? (
                      <button
                        type="button"
                        className="btn btn-danger array-item-remove"
                        onClick={e => {
                          collect.imageUrl = "";
                          this.setState({ collect }, () =>
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
                <Fragment>
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
                      placeholder="上传图片"
                      onChange={e => {
                        const { files } = e.target;
                        if (!files || files.length <= 0) {
                          return;
                        }
                        addMaterialFile({
                          file: files[0]
                        }).then(result => {
                          if (result.status === 200) {
                            if (result.data && result.data.resCode === "00") {
                              collect.imageUrl = result.data.fileUrl;
                              if (
                                Array.isArray(creativeIdList) &&
                                creativeIdList.indexOf(
                                  result.data.creativeFileId
                                ) === -1
                              ) {
                                creativeIdList.push(result.data.creativeFileId);
                              }
                              this.setState({ collect, creativeIdList }, () =>
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
                        });
                      }}
                    />
                  </div>
                </Fragment>
              )}
            </Col>
          </Row>
        </div>
        <div className="array-item">
          <Label>领奖按钮文案*</Label>
          <Input
            value={collect && collect.btn_title}
            placeholder="请输入领奖按钮文案"
            maxLength={5}
            required
            readOnly={readonly}
            onChange={e => {
              collect.btn_title = e.target.value;
              this.setState({ collect }, () => this.props.onChange(this.state));
            }}
          />
        </div>
        <div className="array-item">
          <Label>收集成功弹窗的曝光监控链接</Label>
          <Input
            value={collect && collect.exposureTrackLink}
            placeholder="请输入链接"
            required
            readOnly={readonly}
            onChange={e => {
              collect.exposureTrackLink = e.target.value;
              this.setState({ collect }, () => this.props.onChange(this.state));
            }}
          />
        </div>
        <div className="array-item">
          <Label>“领取”奖励按钮点击监控链接</Label>
          <Input
            value={collect && collect.clickTrackLink}
            placeholder="请输入链接"
            required
            readOnly={readonly}
            onChange={e => {
              collect.clickTrackLink = e.target.value;
              this.setState({ collect }, () => this.props.onChange(this.state));
            }}
          />
        </div>
        <div className="array-item">
          <Label>领奖按钮跳转链接*</Label>
          <Row>
            <Col>
              <div className="array-item checkbox">
                <Label check>
                  <Input
                    type="radio"
                    name="linkType"
                    checked={
                      Number(collect && collect.linkType) === 2
                        ? "checked"
                        : false
                    }
                    disabled={readonly ? "disabled" : false}
                    value={collect && collect.linkType}
                    onChange={() => {
                      collect.linkType = 2;
                      success.itemId = "";
                      this.setState({ collect, success }, () =>
                        this.props.onChange(this.state)
                      );
                    }}
                  />
                  {`  跳转至H5`}
                </Label>
              </div>
              <Input
                disabled={
                  collect && Number(collect.linkType) === 2 ? false : "disabled"
                }
                placeholder="请输入链接"
                readOnly={readonly}
                value={collect && collect.linkUrl}
                onChange={e => {
                  collect.linkUrl = e.target.value;
                  this.setState({ collect }, () =>
                    this.props.onChange(this.state)
                  );
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="array-item checkbox">
                <Label check>
                  <Input
                    type="radio"
                    name="linkType"
                    checked={
                      Number(collect && collect.linkType) === 1
                        ? "checked"
                        : false
                    }
                    disabled={readonly ? "disabled" : false}
                    value={collect && collect.linkType}
                    onChange={() => {
                      collect.linkType = 1;
                      collect.linkUrl = "";
                      this.setState({ collect }, () =>
                        this.props.onChange(this.state)
                      );
                    }}
                  />
                  {`  直接领取奖励`}
                </Label>
              </div>
              <Input
                disabled={
                  collect && Number(collect.linkType) === 1 ? false : "disabled"
                }
                placeholder="请输入道具ID"
                readOnly={readonly}
                value={success && success.itemId}
                onChange={e => {
                  success.itemId = e.target.value;
                  this.setState({ success }, () =>
                    this.props.onChange(this.state)
                  );
                }}
              />
            </Col>
          </Row>
        </div>
        {collect && collect.linkType && Number(collect.linkType) === 1 ? (
          <Fragment>
            <div className="array-item">
              <Label>领奖成功弹窗标题*</Label>
              <Input
                value={success && success.title}
                placeholder="请输入领奖成功弹窗标题"
                onChange={e => {
                  success.title = e.target.value;
                  this.setState({ success }, () =>
                    this.props.onChange(this.state)
                  );
                }}
                maxLength={10}
                required
                readOnly={readonly}
              />
            </div>
            <div className="array-item">
              <Label>领奖成功图片*</Label>
              <Row style={{ marginBottom: "8px" }}>
                <Col>
                  {success && success.imageUrl ? (
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
                          src={success.imageUrl}
                          style={{
                            maxWidth: "240px",
                            maxHeight: "240px"
                          }}
                        />
                        {!readonly ? (
                          <button
                            type="button"
                            className="btn btn-danger array-item-remove"
                            onClick={e => {
                              success.imageUrl = "";
                              this.setState({ success }, () =>
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
                    <Fragment>
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
                          placeholder="上传图片"
                          onChange={e => {
                            const { files } = e.target;
                            if (!files || files.length <= 0) {
                              return;
                            }
                            addMaterialFile({
                              file: files[0]
                            }).then(result => {
                              if (result.status === 200) {
                                if (
                                  result.data &&
                                  result.data.resCode === "00"
                                ) {
                                  success.imageUrl = result.data.fileUrl;
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
                                    { success, creativeIdList },
                                    () => this.props.onChange(this.state)
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
                            });
                          }}
                        />
                      </div>
                    </Fragment>
                  )}
                </Col>
              </Row>
            </div>
          </Fragment>
        ) : null}
      </Fragment>
    );
  }
}
