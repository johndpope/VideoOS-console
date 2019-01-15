import React, { Component, Fragment } from "react";
import { Label, Input, Row, Col } from "reactstrap";
import { Feedback } from "@icedesign/base";

import { addMaterialFile } from "../api";

export default class Votes extends Component {
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
      voteList = [],
      readonly,
      imageUrl,
      voteImageUrl,
      voteTitle,
      voteRule,
      creativeIdList = []
    } = this.state;
    const {
      creativeName,
      interactionTemplateId,
      isShowClose = true
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
              关闭按钮是否可见*
            </Label>
          </div>
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
                          maxWidth: "64px",
                          maxHeight: "64px"
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
            <p>图片尺寸为宽200PX*高75PX</p>
            {errorSchema &&
              errorSchema.imageUrl &&
              errorSchema.imageUrl.__errors &&
              errorSchema.imageUrl.__errors.map((err, idx) => (
                <li key={idx} style={{ color: "#f86c6b" }}>
                  {err}
                </li>
              ))}
          </div>
        </div>
        <div style={{ marginTop: "2rem" }}>信息层编辑</div>
        <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <div className="array-item">
            <Label>投票弹窗icon*</Label>
            <Row style={{ marginBottom: "8px" }}>
              <Col>
                {voteImageUrl ? (
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
                        src={voteImageUrl}
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
                            this.setState({ voteImageUrl: "" }, () =>
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
                                voteImageUrl = result.data.fileUrl;
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
                                  { voteImageUrl, creativeIdList },
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
                    <p>图片尺寸为宽30PX*高30PX</p>
                    {errorSchema &&
                      errorSchema.voteImageUrl &&
                      errorSchema.voteImageUrl.__errors &&
                      errorSchema.voteImageUrl.__errors.map((err, idx) => (
                        <li key={idx} style={{ color: "#f86c6b" }}>
                          {err}
                        </li>
                      ))}
                  </Fragment>
                )}
              </Col>
            </Row>
          </div>
          <div className="array-item">
            <Label>投票弹窗标题*</Label>
            <Input
              type="url"
              readOnly={readonly}
              value={voteTitle}
              maxLength={10}
              placeholder="请输入投票弹窗标题"
              onChange={e => {
                voteTitle = e.target.value;
                this.setState({ voteTitle }, () =>
                  this.props.onChange(this.state)
                );
              }}
            />
            {errorSchema &&
              errorSchema.voteTitle &&
              errorSchema.voteTitle.__errors &&
              errorSchema.voteTitle.__errors.map((err, idx) => (
                <li key={idx} style={{ color: "#f86c6b" }}>
                  {err}
                </li>
              ))}
          </div>
          <div>
            <Label>信息选项*</Label>
            {voteList &&
              voteList.length > 0 &&
              voteList.map((vote, idx) => {
                return (
                  <Row
                    key={idx}
                    className="array-item"
                    style={{ marginBottom: "8px" }}
                  >
                    <Col md="4">
                      {vote.imageUrl ? (
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
                            src={vote.imageUrl}
                            style={{ maxWidth: "128px", maxHeight: "128px" }}
                          />
                          {!readonly ? (
                            <button
                              type="button"
                              className="btn btn-danger array-item-remove"
                              onClick={e => {
                                vote.imageUrl = null;
                                voteList[idx] = vote;
                                this.setState({ voteList });
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
                            flexDirection: "column",
                            justifyMessage: "center",
                            alignItems: "center"
                          }}
                        >
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
                            请上传投票图片
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
                                        vote.imageUrl = result.data.fileUrl;
                                        voteList[idx] = vote;
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
                                          { voteList, creativeIdList },
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
                                    // console.log(result);
                                  });
                                }
                              }}
                            />
                          </div>
                          {errorSchema &&
                          errorSchema.voteList &&
                          errorSchema.voteList[idx]
                            ? errorSchema.voteList[idx].imageUrl.__errors.map(
                                (err, idx) => (
                                  <li key={idx} style={{ color: "#f86c6b" }}>
                                    未上传投票图片
                                  </li>
                                )
                              )
                            : null}
                          <p style={{ fontSize: "12px" }}>
                            图片尺寸为宽60PX*高60PX
                          </p>
                        </div>
                      )}
                    </Col>
                    <Col md="5">
                      <Input
                        type="text"
                        value={vote.title}
                        maxLength={5}
                        readOnly={readonly}
                        placeholder="请输入投票对象名称"
                        onChange={e => {
                          vote.title = e.target.value;
                          voteList[idx] = vote;
                          this.setState({ voteList }, () =>
                            this.props.onChange(this.state)
                          );
                        }}
                      />
                      {errorSchema &&
                      errorSchema.voteList &&
                      errorSchema.voteList[idx] &&
                      errorSchema.voteList[idx].title
                        ? errorSchema.voteList[idx].title.__errors.map(
                            (err, idx) => (
                              <li key={idx} style={{ color: "#f86c6b" }}>
                                {err}
                              </li>
                            )
                          )
                        : null}
                    </Col>
                    <Col md="2">
                      {!readonly ? (
                        <button
                          type="button"
                          className="btn btn-danger array-item-remove"
                          onClick={e => {
                            this.deleteVote(idx);
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
            errorSchema.voteList &&
            errorSchema.voteList.hasOwnProperty("__errors")
              ? errorSchema.voteList.__errors.map((err, idx) => (
                  <li key={idx} style={{ color: "#f86c6b" }}>
                    {err}
                  </li>
                ))
              : null}
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
                  onClick={this.addVote.bind(this)}
                >
                  <i className="glyphicon glyphicon-plus" />
                </button>
              ) : null}
            </div>
          </div>
          <div className="array-item">
            <Label>投票规则</Label>
            <textarea
              style={{
                border: "1px solid rgb(204, 204, 204)",
                borderRadius: "0.25rem",
                width: "100%"
              }}
              readOnly={readonly}
              value={voteRule}
              placeholder="请输入投票规则内容，不填则不展示投票规则"
              onChange={e => {
                voteRule = e.target.value;
                this.setState({ voteRule }, () =>
                  this.props.onChange(this.state)
                );
              }}
            />
            {errorSchema &&
              errorSchema.voteRule &&
              errorSchema.voteRule.__errors &&
              errorSchema.voteRule.__errors.map((err, idx) => (
                <li key={idx} style={{ color: "#f86c6b" }}>
                  {err}
                </li>
              ))}
          </div>
        </div>
      </Fragment>
    );
  }
}
