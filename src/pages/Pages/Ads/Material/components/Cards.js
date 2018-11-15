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
      hotspotArray = [],
      readonly,
      imageUrl,
      voteImageUrl,
      voteTitle,
      exposureTrackLink,
      clickTrackLink,
      voteBtnImage,
      voteBtnExposureTrackLink,
      voteBtnClickTrackLink,
      voteRule,
      creativeIdList = [{}, {}]
    } = this.state;

    return (
      <Fragment>
        <h3>1.基本信息：</h3>
        <div className="array-item">
          <Label>素材名称*</Label>
          <Input
            value={creativeName}
            onChange={this.onChange("creativeName")}
            maxLength={10}
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
              <Input
                type="url"
                readOnly={readonly}
                value={hotspotArray[0].imageUrl}
                onChange={e => {
                  hotspotArray[0].imageUrl = e.target.value;
                  this.setState({ hotspotArray }, () =>
                    this.props.onChange(this.state)
                  );
                }}
              />
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
                onChange={e => {
                  hotspotArray[0].title = e.target.value;
                  this.setState({ hotspotArray }, () =>
                    this.props.onChange(this.state)
                  );
                }}
              />
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
                  hotspotArray[0].clickTrackLink = e.target.value;
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
                  hotspotArray[0].exposureTrackLink = e.target.value;
                  this.setState({ hotspotArray }, () =>
                    this.props.onChange(this.state)
                  );
                }}
              />
            </Col>
          </Row>
        </div>
        <div className="array-item">
          {hotspotArray &&
            hotspotArray.map((hsa, idx) => (
              <Row>
                <Col md="10">
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
                <Col />
              </Row>
            ))}
        </div>
        <h3>3.收集成功后续：</h3>
      </Fragment>
    );
  }
}
