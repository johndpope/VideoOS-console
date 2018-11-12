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
      creativeIdList = []
    } = this.state;
    const {
      creativeName,
      interactionTemplateId,
      isShowClose = true
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
      </Fragment>
    );
  }
}
