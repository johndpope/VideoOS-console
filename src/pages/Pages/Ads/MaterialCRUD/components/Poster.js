import React, { Component, Fragment } from "react";
import { Label, Input, Row, Col } from "reactstrap";
import { Feedback } from "@icedesign/base";

import { addMaterialFile } from "../api";
export default class Poster extends Component {
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

  addVote = () => {
    let { voteList = [] } = this.state;
    voteList.push({
      imageUrl: null,
      title: null
    });
    this.setState({ voteList }, () => this.props.onChange(this.state));
  };

  deleteVote = idx => {
    let { voteList = [] } = this.state;
    voteList.splice(idx, 1);
    this.setState({ voteList }, () => this.props.onChange(this.state));
  };

  render() {
    let { schema, errorSchema } = this.props;
    let {
      readonly,
      imageUrl,
      isShowAds = true,
      isShowClose = true,
      linkUrl,
      creativeIdList = []
    } = this.state;
    const { creativeName, interactionTemplateId } = this.state;
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
        </div>
        <div style={{ marginTop: "2rem" }}>热点编辑</div>
        <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <div>
            <Label>热点图片*</Label>
            <Row>
              <Col>
                {imageUrl ? (
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
                        src={imageUrl}
                        style={{
                          maxWidth: "360px",
                          maxHeight: "360px"
                        }}
                      />
                      {!readonly ? (
                        <button
                          type="button"
                          className="btn btn-danger array-item-remove"
                          onClick={e => {
                            this.setState({ imageUrl: "" }, () =>
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
                      border: "1px solid rgb(204, 204, 204)",
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
                      placeholder="上传气泡图片"
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
                              imageUrl = result.data.fileUrl;
                              if (
                                Array.isArray(creativeIdList) &&
                                creativeIdList.indexOf(
                                  result.data.creativeFileId
                                ) === -1
                              ) {
                                creativeIdList.push(result.data.creativeFileId);
                              }
                              this.setState({ imageUrl, creativeIdList }, () =>
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
                )}
              </Col>
            </Row>
            {errorSchema &&
              errorSchema.imageUrl &&
              errorSchema.imageUrl.__errors &&
              errorSchema.imageUrl.__errors.map((err, idx) => (
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
          <div className="array-item">
            <Label>跳转外链链接</Label>
            <Input
              type="url"
              value={linkUrl}
              readOnly={readonly}
              placeholder="请输入链接"
              onChange={e => {
                linkUrl = e.target.value;
                if (linkUrl === "") linkUrl = undefined;
                this.setState({ linkUrl }, () =>
                  this.props.onChange(this.state)
                );
              }}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
