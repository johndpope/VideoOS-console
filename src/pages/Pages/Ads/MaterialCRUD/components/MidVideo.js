import React, { Component, Fragment } from "react";
import { Label, Input, Row, Col } from "reactstrap";
import { Feedback } from "@icedesign/base";

import { addMaterialFile } from "../api";

export default class MidVideo extends Component {
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
      videoUrl: null,
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
      videoUrl,
      closeAfter,
      isShowAds = true,
      isShowClose = true,
      exposureTrackLink,
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
        <div style={{ marginTop: "2rem" }}>信息层编辑</div>
        <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <div>
            <Label>广告视频*</Label>
            <Row>
              <Col>
                {videoUrl ? (
                  <Fragment>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyMessage: "center",
                        alignItems: "center"
                      }}
                    >
                      <video
                        controls
                        src={videoUrl}
                        style={{
                          maxWidth: "400px"
                        }}
                      />
                      {!readonly ? (
                        <button
                          type="button"
                          className="btn btn-danger array-item-remove"
                          onClick={e => {
                            this.setState({ videoUrl: "" }, () =>
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
                    上传视频
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
                      accept="video/*"
                      type="file"
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
                              videoUrl = result.data.fileUrl;
                              if (
                                Array.isArray(creativeIdList) &&
                                creativeIdList.indexOf(
                                  result.data.creativeFileId
                                ) === -1
                              ) {
                                creativeIdList.push(result.data.creativeFileId);
                              }
                              this.setState({ videoUrl, creativeIdList }, () =>
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
              errorSchema.videoUrl &&
              errorSchema.videoUrl.__errors &&
              errorSchema.videoUrl.__errors.map((err, idx) => (
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
              广告是否可以关闭
            </Label>
          </div>
          {isShowClose ? (
            <div className="array-item">
              <Label>广告播放多久后可关闭*</Label>
              <Input
                type="url"
                readOnly={readonly}
                value={closeAfter}
                placeholder=""
                onChange={e => {
                  closeAfter = Number(e.target.value);
                  this.setState({ closeAfter }, () =>
                    this.props.onChange(this.state)
                  );
                }}
              />
              <p>
                该时间需要小于中插视频时间；
                <br />
                如果填0，则表示该广告随时可关闭.
              </p>
              {errorSchema &&
                errorSchema.closeAfter &&
                errorSchema.closeAfter.__errors &&
                errorSchema.closeAfter.__errors.map((err, idx) => (
                  <li key={idx} style={{ color: "#f86c6b" }}>
                    {err}
                  </li>
                ))}
            </div>
          ) : null}
          <div className="array-item">
            <Label>广告外链链接</Label>
            <Input
              type="url"
              readOnly={readonly}
              value={exposureTrackLink}
              placeholder="请输入中插外链链接"
              onChange={e => {
                exposureTrackLink = e.target.value;
                this.setState({ exposureTrackLink }, () =>
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
