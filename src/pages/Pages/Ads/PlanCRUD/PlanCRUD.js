import React, { Component, Fragment } from "react";
import querystring from "querystring";
import {
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from "reactstrap";
import IceContainer from "@icedesign/container";
import { connect } from "react-redux";
import { compose } from "redux";
import injectReducer from "utils/injectReducer";
import { Button, Feedback, Icon } from "@icedesign/base";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import MinSec from "./components/MinSec";

import * as actions from "./actions";
import reducer from "./reducer";

let opType;

/**
 * 判断投放时间是否冲突
 * @param {object} payload
 * @return {boolean} status
 */
const isConflict = payload => {
  let status = false;
  const { launchTime, launchTimeLen, launchTimeType } = payload;
  if (Array.isArray(launchTime) && launchTime.length > 1) {
    let launchTimeLX = launchTime
      .join(",")
      .split(",")
      .map(lt => {
        const ltArr = lt.split(":");
        return Number(launchTimeType) !== 2
          ? Number(ltArr[0]) * 60 + Number(ltArr[1])
          : Number(ltArr[0]) * 60 * 60 + Number(ltArr[1]) * 60;
      });
    launchTimeLX = launchTimeLX.sort((val1, val2) => {
      let val = 0;
      if (val1 > val2) {
        val = 1;
      }
      if (val1 === val2) {
        val = 0;
      }
      if (val1 < val2) {
        val = -1;
      }
      return val;
    });
    const launchTimeWithIncrement = launchTimeLX.map(
      ltlx => ltlx + Number(launchTimeLen)
    );
    launchTimeWithIncrement.forEach((ltwi, idx) => {
      if (
        ltwi >= launchTimeLX[idx + 1] &&
        idx !== launchTimeWithIncrement.length - 1
      ) {
        status = true;
      }
    });
  }
  return status;
};

class SelectTheme extends Component {
  componentDidMount() {
    const {
      getAdMaterials,
      location,
      setFormData,
      getAdPlanInfo,
      setWhichStep
    } = this.props;
    let qs = querystring.parse(location && location.search.substring(1));
    opType = qs && qs.opType;
    setFormData({
      interactionTypeName: qs && qs.interactionTypeName,
      interactionTypeId: qs && (qs.id || qs.launchPlanId)
    });
    setWhichStep({ whichStep: 1 });

    getAdMaterials({ interactionType: (qs && qs.launchPlanId) || qs.id });
    if (qs && qs.launchPlanId) {
      getAdPlanInfo({ launchPlanId: qs.launchPlanId });
    }
  }

  componentWillUnmount() {
    const { setFormData } = this.props;
    opType = null;
    setFormData({});
  }

  _goBack() {
    const { planCRUDResult, goBack, setWhichStep } = this.props;
    if (planCRUDResult) {
      if (planCRUDResult.whichStep === 1) {
        goBack();
      } else if (planCRUDResult.whichStep === 2) {
        setWhichStep({ whichStep: 1 });
      }
    }
  }

  _gotoNext() {
    const { gotoNext, planCRUDResult, addPlan, updatePlan } = this.props;
    const tempHash = [];
    const { formData } = planCRUDResult;
    let repeatState = false;
    let invalidState = false;

    const isRead = opType === "read";
    const isUpdate = opType === "update";
    if (isRead) {
      return;
    }
    if (!formData) {
      Feedback.toast.error("请输入完整信息");
      return;
    }
    if (!formData.launchPlanName) {
      Feedback.toast.error("请输入“投放名称”");
      return;
    }
    if (!formData.interactionTypeName) {
      Feedback.toast.error("“投放类型”缺失");
      return;
    }
    if (!formData.creativeId) {
      Feedback.toast.error("请选择“投放素材”");
      return;
    }
    if (!formData.launchVideoId) {
      Feedback.toast.error("请输入“投放视频id”");
      return;
    }
    if (!formData.launchTimeType) {
      Feedback.toast.error("请选择“投放时间类型”");
      return;
    }
    if (formData.launchTimeType === "0" || formData.launchTimeType === "2") {
      if (!formData.launchDateStart) {
        Feedback.toast.error('"请选择“投放开始日期”"');
        return;
      }
      if (!formData.launchDateEnd) {
        Feedback.toast.error('"请选择“投放结束日期”"');
        return;
      }
      if (
        !formData.launchTimes ||
        !Array.isArray(formData.launchTime) ||
        formData.launchTime.length === 0
      ) {
        Feedback.toast.error('"请添加“投放时间”"');
        return;
      }
      formData.launchTime.forEach((lt, idx) => {
        lt.forEach((time, idx) => {
          if (!tempHash.includes(time)) {
            tempHash.push(time);
          } else {
            repeatState = true;
          }
          if (!/^[0-9]{1,2}:[0-9]{1,2}$/gi.test(time)) {
            invalidState = true;
          }
        });
      });
      if (invalidState) {
        Feedback.toast.error('"请输入有效分秒值且不能为空"');
        return;
      }
      if (repeatState) {
        Feedback.toast.error('"投放时间有重复"');
        return;
      }
    }
    if (!formData.launchLenTime) {
      Feedback.toast.error("请输入“投放时长”");
      return;
    }
    if (formData.launchLenTime && !/^[0-9]+$/gi.test(formData.launchLenTime)) {
      Feedback.toast.error("投放时长为数字");
      return;
    }
    if (
      isConflict({
        launchTime: formData.launchTime,
        launchTimeLen: formData.launchLenTime,
        launchTimeType: formData.launchTimeType
      })
    ) {
      Feedback.toast.error('"投放时间有冲突"');
      return;
    }
    if (planCRUDResult.whichStep === 1) {
      gotoNext({
        creativeId:
          planCRUDResult &&
          planCRUDResult.formData &&
          planCRUDResult.formData.creativeId
      });
    } else {
      if (isUpdate) {
        updatePlan({ ...formData });
      } else {
        if (formData.v_minutes) delete formData.v_minutes;
        if (formData.v_seconds) delete formData.v_seconds;
        addPlan({ ...formData });
      }
    }
  }

  render() {
    const { setEditState, setFormData, planCRUDResult } = this.props;
    const {
      formData,
      materialTypes,
      isEdit,
      whichStep,
      monitorLinkInfo
    } = planCRUDResult;
    const isRead = opType === "read";
    const isUpdate = opType === "update";
    if (
      formData &&
      formData.launchDateStart &&
      typeof formData.launchDateStart === "string"
    ) {
      formData.launchDateStart = moment(formData.launchDateStart);
    }
    if (
      formData &&
      formData.launchDateEnd &&
      typeof formData.launchDateEnd === "string"
    ) {
      formData.launchDateEnd = moment(formData.launchDateEnd);
    }
    if (formData) {
      formData.launchTimeType = String(
        formData && formData.hasOwnProperty("launchTimeType")
          ? String(formData.launchTimeType)
          : ""
      );
    }
    if (isEdit && !(isRead || isUpdate) && formData) {
      let lts = [];
      if (formData.hotSpotNum > 1) {
        for (let i = formData.hotSpotNum; i > 0; i--) {
          lts.push([""]);
        }
      } else {
        lts = [[""]];
      }
      formData.launchTime = lts;
      setFormData({ launchTime: formData.launchTime });
      setEditState({ isEdit: false });
    }
    return (
      <div className="app">
        {!isRead ? (
          <IceContainer>
            <h4>
              新增投放计划（
              {whichStep}
              /2）
            </h4>
          </IceContainer>
        ) : null}
        {isRead || isUpdate || whichStep === 1 ? (
          <Fragment>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>投放名称</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="请输入投放名称"
                disabled={isRead ? "disabled" : false}
                value={(formData && formData.launchPlanName) || ""}
                onChange={e => {
                  setFormData({ launchPlanName: e.target.value });
                }}
                maxLength={30}
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>投放应用</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                disabled
                readOnly
                defaultValue={(formData && formData.interactionTypeName) || ""}
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>投放素材</InputGroupText>
              </InputGroupAddon>
              <Input
                type="select"
                disabled={isRead ? "disabled" : false}
                value={
                  (formData &&
                    formData.creativeId &&
                    `${formData.creativeId}**${formData.hotSpotNum}`) ||
                  ""
                }
                onChange={e => {
                  const values = e.target.value.split("**");
                  setEditState({ isEdit: true });
                  setFormData({
                    creativeId: values[0],
                    hotSpotNum: Number(values[1])
                  });
                }}
              >
                {isRead ? (
                  <option value="">
                    {(formData && formData.creativeName) || ""}
                  </option>
                ) : (
                  <option value="">请选择</option>
                )}

                {materialTypes &&
                  Array.isArray(materialTypes) &&
                  materialTypes.length > 0 &&
                  materialTypes.map((mt, idx) => (
                    <option
                      key={idx}
                      value={`${mt.creativeId}**${mt.hotSpotNum}`}
                    >
                      {mt.creativeName}
                    </option>
                  ))}
              </Input>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>视频/直播间的ID/URL</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="请输入视频/直播间的ID/URL"
                disabled={isRead ? "disabled" : false}
                value={(formData && formData.launchVideoId) || ""}
                onChange={e => {
                  setFormData({ launchVideoId: e.target.value });
                }}
              />
            </InputGroup>
            <p>如需填写多个ID/URL，请用英文的“,”分隔即可</p>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>投放时间类型</InputGroupText>
              </InputGroupAddon>
              <Input
                type="select"
                disabled={isRead ? "disabled" : false}
                value={
                  formData && formData.hasOwnProperty("launchTimeType")
                    ? String(formData.launchTimeType)
                    : ""
                }
                onChange={e => {
                  if (
                    formData &&
                    (!formData.creativeId || formData.creativeId === "")
                  ) {
                    Feedback.toast.error("请先选择“投放素材”");
                    return;
                  }
                  setEditState({ isEdit: true });
                  setFormData({
                    launchTimeType: e.target.value,
                    launchTime: [],
                    launchTimes: []
                  });
                }}
              >
                <option value="">请选择</option>
                {formData &&
                (!formData.hotSpotNum || formData.hotSpotNum <= 1) ? (
                  <option value="1">即时（仅适用于投放至直播内容）</option>
                ) : null}

                <option value="0">视频时间（仅适用于投放至点播内容）</option>
                <option value="2">北京时间（仅适用于投放至直播内容）</option>
              </Input>
            </InputGroup>
            {formData &&
            formData.launchTimeType &&
            (formData.launchTimeType === "0" ||
              formData.launchTimeType === 0) ? (
              <Fragment>
                <InputGroup className="mb-4 full-child-height">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>投放日期</InputGroupText>
                  </InputGroupAddon>
                  <DatePicker
                    locale="cn-gb"
                    disabled={isRead ? true : false}
                    selected={formData && formData.launchDateStart}
                    startDate={formData && formData.launchDateStart}
                    endDate={formData && formData.launchDateEnd}
                    minDate={moment()}
                    selectsStart
                    onChange={e => {
                      if (
                        formData.launchDateEnd &&
                        e.valueOf() >= formData.launchDateEnd.valueOf()
                      ) {
                        setFormData({ launchDateEnd: e });
                      }
                      setFormData({ launchDateStart: e });
                    }}
                    placeholderText="请选择开始日期"
                  />
                  <DatePicker
                    disabled={isRead ? true : false}
                    selected={formData && formData.launchDateEnd}
                    startDate={formData && formData.launchDateStart}
                    endDate={formData && formData.launchDateEnd}
                    minDate={moment()}
                    selectsEnd
                    onChange={e => {
                      if (
                        formData.launchDateStart &&
                        e.valueOf() <= formData.launchDateStart.valueOf()
                      ) {
                        setFormData({ launchDateStart: e });
                      }
                      setFormData({ launchDateEnd: e });
                    }}
                    placeholderText="请选择结束日期"
                  />
                </InputGroup>
                {!isRead &&
                !isUpdate &&
                formData &&
                (!formData.hotSpotNum ||
                  (formData.hotSpotNum && formData.hotSpotNum <= 1)) ? (
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>投放时间</InputGroupText>
                    </InputGroupAddon>
                    <span
                      style={{
                        flex: "1 1 auto",
                        marginLeft: "8px",
                        width: "1%",
                        float: "left"
                      }}
                    >
                      <Row>
                        <Col md="10">
                          {formData.launchTime &&
                            formData.launchTime[0] &&
                            formData.launchTime[0].length > 0 &&
                            formData.launchTime[0].map((time, idx) => (
                              <MinSec
                                time={time}
                                key={time + idx}
                                launchTimes={formData.launchTime[0]}
                                idx={idx}
                                launchTime={formData.launchTime}
                                setFormData={setFormData}
                                isRead={isRead}
                              />
                            ))}
                        </Col>

                        {!isRead ? (
                          <Col md="1">
                            <Button
                              onClick={() => {
                                if (
                                  formData &&
                                  formData.launchTime &&
                                  formData.launchTime[0]
                                ) {
                                  formData.launchTime[0].push("");
                                } else {
                                  formData.launchTime[0] = [""];
                                }

                                setFormData({
                                  launchTime: formData.launchTime
                                });
                              }}
                            >
                              <Icon type="add" />
                            </Button>
                          </Col>
                        ) : null}
                      </Row>
                    </span>
                  </InputGroup>
                ) : null}
                {formData &&
                  formData.hotSpotNum &&
                  formData.hotSpotNum > 1 &&
                  formData.launchTime.map((lt, idx) => (
                    <InputGroup className="mb-4" key={idx}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          热点
                          {idx + 1}
                          投放时间
                        </InputGroupText>
                      </InputGroupAddon>
                      <span
                        style={{
                          flex: "1 1 auto",
                          marginLeft: "8px",
                          width: "1%",
                          float: "left"
                        }}
                      >
                        <Row>
                          <Col md="9">
                            {lt &&
                              lt.length > 0 &&
                              lt.map((time, idx) => (
                                <MinSec
                                  time={time}
                                  key={time + idx}
                                  launchTimes={lt}
                                  launchTime={formData.launchTime}
                                  idx={idx}
                                  setFormData={setFormData}
                                  isRead={isRead}
                                />
                              ))}
                          </Col>

                          {!isRead ? (
                            <Col md="1">
                              <Button
                                onClick={() => {
                                  if (lt) {
                                    lt.push("");
                                  } else {
                                    lt = [""];
                                  }

                                  setFormData({
                                    launchTime: formData.launchTime
                                  });
                                }}
                              >
                                <Icon type="add" />
                              </Button>
                            </Col>
                          ) : null}
                        </Row>
                      </span>
                    </InputGroup>
                  ))}
                {(isRead || isUpdate) &&
                  formData &&
                  formData.launchTime.map((lt, idx) => (
                    <InputGroup className="mb-4" key={idx}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          热点
                          {idx + 1}
                          投放时间
                        </InputGroupText>
                      </InputGroupAddon>
                      <span
                        style={{
                          flex: "1 1 auto",
                          marginLeft: "8px",
                          width: "1%",
                          float: "left"
                        }}
                      >
                        <Row>
                          <Col md="9">
                            {lt &&
                              lt.length > 0 &&
                              lt.map((time, idx) => (
                                <MinSec
                                  time={time}
                                  key={time + idx}
                                  launchTimes={lt}
                                  launchTime={formData.launchTime}
                                  idx={idx}
                                  setFormData={setFormData}
                                  isRead={isRead}
                                />
                              ))}
                          </Col>

                          {!isRead ? (
                            <Col md="1">
                              <Button
                                onClick={() => {
                                  if (lt) {
                                    lt.push("");
                                  } else {
                                    lt = [""];
                                  }

                                  setFormData({
                                    launchTime: formData.launchTime
                                  });
                                }}
                              >
                                <Icon type="add" />
                              </Button>
                            </Col>
                          ) : null}
                        </Row>
                      </span>
                    </InputGroup>
                  ))}
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>投放时长</InputGroupText>
                  </InputGroupAddon>

                  <Input
                    type="tel"
                    disabled={isRead ? "disabled" : false}
                    value={(formData && formData.launchLenTime) || ""}
                    placeholder="请输入投放时长"
                    onChange={e => {
                      setFormData({ launchLenTime: e.target.value });
                    }}
                  />
                  <span style={{ paddingLeft: "8px", lineHeight: "33.99px" }}>
                    秒
                  </span>
                </InputGroup>
                <p>
                  注：请准确填写投放时长，系统将用于判断投放计划的排期是否冲突
                </p>
              </Fragment>
            ) : null}
            {formData &&
            formData.launchTimeType &&
            formData.launchTimeType === "1" ? (
              <Fragment>
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>投放时长</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="tel"
                    disabled={isRead ? "disabled" : false}
                    value={(formData && formData.launchLenTime) || ""}
                    placeholder="请输入投放时长"
                    onChange={e => {
                      setFormData({ launchLenTime: e.target.value });
                    }}
                  />
                  <span style={{ paddingLeft: "8px", lineHeight: "33.99px" }}>
                    秒
                  </span>
                </InputGroup>
                <p>
                  注：请准确填写投放时长，系统将用于判断投放计划的排期是否冲突
                </p>
              </Fragment>
            ) : null}
            {formData &&
            formData.launchTimeType &&
            formData.launchTimeType === "2" ? (
              <Fragment>
                <InputGroup className="mb-4 full-child-height">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>投放日期</InputGroupText>
                  </InputGroupAddon>
                  <DatePicker
                    locale="cn-gb"
                    disabled={isRead ? true : false}
                    selected={formData && formData.launchDateStart}
                    startDate={formData && formData.launchDateStart}
                    endDate={formData && formData.launchDateEnd}
                    minDate={moment()}
                    selectsStart
                    onChange={e => {
                      if (
                        formData.launchDateEnd &&
                        e.valueOf() >= formData.launchDateEnd.valueOf()
                      ) {
                        setFormData({ launchDateEnd: e });
                      }
                      setFormData({ launchDateStart: e });
                    }}
                    placeholderText="请选择开始日期"
                  />
                  <DatePicker
                    disabled={isRead ? true : false}
                    selected={formData && formData.launchDateEnd}
                    startDate={formData && formData.launchDateStart}
                    endDate={formData && formData.launchDateEnd}
                    minDate={moment()}
                    selectsEnd
                    onChange={e => {
                      if (
                        formData.launchDateStart &&
                        e.valueOf() <= formData.launchDateStart.valueOf()
                      ) {
                        setFormData({ launchDateStart: e });
                      }
                      setFormData({ launchDateEnd: e });
                    }}
                    placeholderText="请选择结束日期"
                  />
                </InputGroup>
                {!isRead &&
                !isUpdate &&
                formData &&
                (!formData.hotSpotNum ||
                  (formData.hotSpotNum && formData.hotSpotNum <= 1)) ? (
                  <InputGroup className="mb-4 full-child-height">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>投放时间</InputGroupText>
                    </InputGroupAddon>
                    <span
                      style={{
                        flex: "1 1 auto",
                        marginLeft: "8px",
                        width: "1%",
                        float: "left"
                      }}
                    >
                      <Row>
                        <Col md="10">
                          {formData &&
                            formData.launchTime &&
                            Array.isArray(formData.launchTime) &&
                            formData.launchTime[0] &&
                            Array.isArray(formData.launchTime[0]) &&
                            formData.launchTime[0].map((lt, idx) => (
                              <Row className="full-child-height-bj" key={idx}>
                                <Col>
                                  <DatePicker
                                    style={{
                                      height: "31.98px"
                                    }}
                                    disabled={isRead ? true : false}
                                    selected={
                                      lt &&
                                      /:/gi.test(lt) &&
                                      moment(`2018-09-10 ${lt}`)
                                    }
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={1}
                                    dateFormat="LT"
                                    timeCaption="Time"
                                    onChange={e => {
                                      const ms_txt = `${
                                        e.hours() > 9
                                          ? e.hours()
                                          : "0" + e.hour()
                                      }:${
                                        e.minutes() > 9
                                          ? e.minutes()
                                          : "0" + e.minutes()
                                      }`;
                                      if (lt) {
                                        formData.launchTime[0][idx] = ms_txt;
                                      } else {
                                        formData.launchTime[0] = [ms_txt];
                                      }
                                      setFormData({
                                        launchTime: formData.launchTime
                                      });
                                    }}
                                    placeholderText="请添加投放时间"
                                  />
                                </Col>
                                {idx !== 0 && !isRead ? (
                                  <Col>
                                    <Button
                                      onClick={() => {
                                        formData.launchTime[0].splice(idx, 1);
                                        setFormData({
                                          launchTime: formData.launchTime
                                        });
                                      }}
                                    >
                                      <Icon type="ashbin" />
                                    </Button>
                                  </Col>
                                ) : null}
                              </Row>
                            ))}
                        </Col>
                        {!isRead ? (
                          <Col md="1">
                            <Button
                              onClick={() => {
                                if (
                                  formData &&
                                  formData.launchTime &&
                                  Array.isArray(formData.launchTime) &&
                                  Array.isArray(formData.launchTime[0])
                                ) {
                                  formData.launchTime[0].push(" ");
                                } else {
                                  formData.launchTime = [[" "]];
                                }
                                setFormData({
                                  launchTime: formData.launchTime
                                });
                              }}
                            >
                              <Icon type="add" />
                            </Button>
                          </Col>
                        ) : null}
                      </Row>
                    </span>
                  </InputGroup>
                ) : null}
                {formData &&
                  formData.hotSpotNum &&
                  formData.hotSpotNum > 1 &&
                  formData.launchTime.map((lt, idx) => (
                    <InputGroup className="mb-4 full-child-height">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          热点
                          {idx + 1}
                          投放时间
                        </InputGroupText>
                      </InputGroupAddon>
                      <span
                        style={{
                          flex: "1 1 auto",
                          marginLeft: "8px",
                          width: "1%",
                          float: "left"
                        }}
                      >
                        <Row>
                          <Col md="10">
                            {lt &&
                              lt.length > 0 &&
                              lt.map((time, idx) => (
                                <Row className="full-child-height-bj">
                                  <Col>
                                    <DatePicker
                                      style={{
                                        height: "31.98px"
                                      }}
                                      key={time + idx}
                                      disabled={isRead ? true : false}
                                      selected={
                                        /:/gi.test(time) &&
                                        moment(`2018-09-10 ${time}`)
                                      }
                                      showTimeSelect
                                      showTimeSelectOnly
                                      timeIntervals={1}
                                      dateFormat="LT"
                                      timeCaption="Time"
                                      onChange={e => {
                                        const ms_txt = `${
                                          e.hours() > 9
                                            ? e.hours()
                                            : "0" + e.hour()
                                        }:${
                                          e.minutes() > 9
                                            ? e.minutes()
                                            : "0" + e.minutes()
                                        }`;
                                        if (lt) {
                                          lt[idx] = ms_txt;
                                        } else {
                                          lt = [ms_txt];
                                        }
                                        setFormData({
                                          launchTime: formData.launchTime
                                        });
                                      }}
                                      placeholderText="请添加投放时间"
                                    />
                                  </Col>
                                  {idx !== 0 && !isRead ? (
                                    <Col>
                                      <Button
                                        onClick={() => {
                                          lt.splice(idx, 1);
                                          setFormData({
                                            launchTime: formData.launchTime
                                          });
                                        }}
                                      >
                                        <Icon type="ashbin" />
                                      </Button>
                                    </Col>
                                  ) : null}
                                </Row>
                              ))}
                          </Col>
                          {!isRead ? (
                            <Col md="1">
                              <Button
                                onClick={() => {
                                  lt.push("");
                                  setFormData({
                                    launchTime: formData.launchTime
                                  });
                                }}
                              >
                                <Icon type="add" />
                              </Button>
                            </Col>
                          ) : null}
                        </Row>
                      </span>
                    </InputGroup>
                  ))}
                {(isRead || isUpdate) &&
                  formData &&
                  formData.launchTime &&
                  formData.launchTime.map((lt, idx) => (
                    <InputGroup className="mb-4 full-child-height">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          热点
                          {idx + 1}
                          投放时间
                        </InputGroupText>
                      </InputGroupAddon>
                      <span
                        style={{
                          flex: "1 1 auto",
                          marginLeft: "8px",
                          width: "1%",
                          float: "left"
                        }}
                      >
                        <Row>
                          <Col md="10">
                            {lt &&
                              lt.length > 0 &&
                              lt.map((time, idx) => (
                                <Row className="full-child-height-bj">
                                  <Col>
                                    <DatePicker
                                      style={{
                                        height: "31.98px"
                                      }}
                                      key={time + idx}
                                      disabled={isRead ? true : false}
                                      selected={
                                        /:/gi.test(time) &&
                                        moment(`2018-09-10 ${time}`)
                                      }
                                      showTimeSelect
                                      showTimeSelectOnly
                                      timeIntervals={1}
                                      dateFormat="LT"
                                      timeCaption="Time"
                                      onChange={e => {
                                        const ms_txt = `${
                                          e.hours() > 9
                                            ? e.hours()
                                            : "0" + e.hour()
                                        }:${
                                          e.minutes() > 9
                                            ? e.minutes()
                                            : "0" + e.minutes()
                                        }`;
                                        if (lt) {
                                          lt[idx] = ms_txt;
                                        } else {
                                          lt = [ms_txt];
                                        }
                                        setFormData({
                                          launchTime: formData.launchTime
                                        });
                                      }}
                                      placeholderText="请添加投放时间"
                                    />
                                  </Col>
                                  {idx !== 0 && !isRead ? (
                                    <Col>
                                      <Button
                                        onClick={() => {
                                          lt.splice(idx, 1);
                                          setFormData({
                                            launchTime: formData.launchTime
                                          });
                                        }}
                                      >
                                        <Icon type="ashbin" />
                                      </Button>
                                    </Col>
                                  ) : null}
                                </Row>
                              ))}
                          </Col>
                          {!isRead ? (
                            <Col md="1">
                              <Button
                                onClick={() => {
                                  lt.push("");
                                  setFormData({
                                    launchTime: formData.launchTime
                                  });
                                }}
                              >
                                <Icon type="add" />
                              </Button>
                            </Col>
                          ) : null}
                        </Row>
                      </span>
                    </InputGroup>
                  ))}
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>投放时长</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="tel"
                    disabled={isRead ? "disabled" : false}
                    value={(formData && formData.launchLenTime) || ""}
                    placeholder="请输入投放时长"
                    onChange={e => {
                      setFormData({ launchLenTime: e.target.value });
                    }}
                  />
                  <span style={{ paddingLeft: "8px", lineHeight: "33.99px" }}>
                    秒
                  </span>
                </InputGroup>
                <p>
                  注：请准确填写投放时长，系统将用于判断投放计划的排期是否冲突
                </p>
              </Fragment>
            ) : null}
          </Fragment>
        ) : null}
        {(isRead || isUpdate) &&
          formData &&
          formData.hotspotTrackLink &&
          Array.isArray(formData.hotspotTrackLink) &&
          formData.hotspotTrackLink.map((hstl, idx) => (
            <div>
              <h5>{`${(formData && formData.interactionTypeName) || ""}热点${
                idx !== 0 ? idx + 1 : ""
              }`}</h5>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>曝光监控链接：</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="url"
                  disabled={isRead ? "disabled" : false}
                  value={
                    (formData &&
                      Array.isArray(formData.hotspotTrackLink) &&
                      formData.hotspotTrackLink[idx] &&
                      formData.hotspotTrackLink[idx].exposureTrackLink) ||
                    ""
                  }
                  placeholder="请输入链接"
                  onChange={e => {
                    if (
                      formData &&
                      Array.isArray(formData.hotspotTrackLink) &&
                      formData.hotspotTrackLink[idx]
                    ) {
                      formData.hotspotTrackLink[idx].exposureTrackLink =
                        e.target.value;
                    } else {
                      if (!Array.isArray(formData.hotspotTrackLink)) {
                        formData.hotspotTrackLink = [];
                      }
                      formData.hotspotTrackLink[idx] = {
                        exposureTrackLink: e.target.value,
                        clickTrackLink: ""
                      };
                    }
                    setFormData({
                      hotspotTrackLink: formData.hotspotTrackLink
                    });
                  }}
                />
              </InputGroup>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>点击监控链接：</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="url"
                  disabled={isRead ? "disabled" : false}
                  value={
                    (formData &&
                      Array.isArray(formData.hotspotTrackLink) &&
                      formData.hotspotTrackLink[idx] &&
                      formData.hotspotTrackLink[idx].clickTrackLink) ||
                    ""
                  }
                  placeholder="请输入链接"
                  onChange={e => {
                    if (
                      formData &&
                      Array.isArray(formData.hotspotTrackLink) &&
                      formData.hotspotTrackLink[idx]
                    ) {
                      formData.hotspotTrackLink[idx].clickTrackLink =
                        e.target.value;
                    } else {
                      formData.hotspotTrackLink[idx] = {
                        exposureTrackLink: "",
                        clickTrackLink: e.target.value
                      };
                    }
                    setFormData({
                      hotspotTrackLink: formData.hotspotTrackLink
                    });
                  }}
                />
              </InputGroup>
            </div>
          ))}
        {(isRead || isUpdate) &&
          formData &&
          formData.infoTrackLink &&
          Array.isArray(formData.infoTrackLink) &&
          formData.infoTrackLink.map((hstl, idx) => (
            <div>
              <h5>{`${(formData && formData.infoTrackLinkTitle) || "信息层"}${
                idx !== 0 ? idx + 1 : ""
              }`}</h5>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>曝光监控链接：</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="url"
                  disabled={isRead ? "disabled" : false}
                  value={
                    (formData &&
                      Array.isArray(formData.infoTrackLink) &&
                      formData.infoTrackLink[idx] &&
                      formData.infoTrackLink[idx].exposureTrackLink) ||
                    ""
                  }
                  placeholder="请输入链接"
                  onChange={e => {
                    if (
                      formData &&
                      Array.isArray(formData.infoTrackLink) &&
                      formData.infoTrackLink[idx]
                    ) {
                      formData.infoTrackLink[idx].exposureTrackLink =
                        e.target.value;
                    } else {
                      if (!Array.isArray(formData.infoTrackLink)) {
                        formData.infoTrackLink = [];
                      }
                      formData.infoTrackLink[idx] = {
                        exposureTrackLink: e.target.value,
                        clickTrackLink: ""
                      };
                    }
                    setFormData({
                      infoTrackLink: formData.infoTrackLink
                    });
                  }}
                />
              </InputGroup>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>点击监控链接：</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="url"
                  disabled={isRead ? "disabled" : false}
                  value={
                    (formData &&
                      Array.isArray(formData.infoTrackLink) &&
                      formData.infoTrackLink[idx] &&
                      formData.infoTrackLink[idx].clickTrackLink) ||
                    ""
                  }
                  placeholder="请输入链接"
                  onChange={e => {
                    if (
                      formData &&
                      Array.isArray(formData.infoTrackLink) &&
                      formData.infoTrackLink[idx]
                    ) {
                      formData.infoTrackLink[idx].clickTrackLink =
                        e.target.value;
                    } else {
                      formData.infoTrackLink[idx] = {
                        exposureTrackLink: "",
                        clickTrackLink: e.target.value
                      };
                    }
                    setFormData({
                      infoTrackLink: formData.infoTrackLink
                    });
                  }}
                />
              </InputGroup>
            </div>
          ))}
        {whichStep === 2 ? (
          <Fragment>
            <h4>数据监控（非必填）</h4>
            {(() => {
              let mlis = [];
              for (
                let i = 0;
                i < (monitorLinkInfo && Number(monitorLinkInfo.hotspot));
                i++
              ) {
                mlis.push(
                  <div>
                    <h5>{`${(formData && formData.interactionTypeName) ||
                      ""}热点${i !== 0 ? i + 1 : 1}`}</h5>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>曝光监控链接：</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="url"
                        disabled={isRead ? "disabled" : false}
                        value={
                          (formData &&
                            Array.isArray(formData.hotspotTrackLink) &&
                            formData.hotspotTrackLink[i] &&
                            formData.hotspotTrackLink[i].exposureTrackLink) ||
                          ""
                        }
                        placeholder="请输入链接"
                        onChange={e => {
                          if (
                            formData &&
                            Array.isArray(formData.hotspotTrackLink) &&
                            formData.hotspotTrackLink[i]
                          ) {
                            formData.hotspotTrackLink[i].exposureTrackLink =
                              e.target.value;
                          } else {
                            if (!Array.isArray(formData.hotspotTrackLink)) {
                              formData.hotspotTrackLink = [];
                            }
                            formData.hotspotTrackLink[i] = {
                              exposureTrackLink: e.target.value,
                              clickTrackLink: ""
                            };
                          }
                          setFormData({
                            hotspotTrackLink: formData.hotspotTrackLink
                          });
                        }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>点击监控链接：</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="url"
                        disabled={isRead ? "disabled" : false}
                        value={
                          (formData &&
                            Array.isArray(formData.hotspotTrackLink) &&
                            formData.hotspotTrackLink[i] &&
                            formData.hotspotTrackLink[i].clickTrackLink) ||
                          ""
                        }
                        placeholder="请输入链接"
                        onChange={e => {
                          if (
                            formData &&
                            Array.isArray(formData.hotspotTrackLink) &&
                            formData.hotspotTrackLink[i]
                          ) {
                            formData.hotspotTrackLink[i].clickTrackLink =
                              e.target.value;
                          } else {
                            formData.hotspotTrackLink[i] = {
                              exposureTrackLink: "",
                              clickTrackLink: e.target.value
                            };
                          }
                          setFormData({
                            hotspotTrackLink: formData.hotspotTrackLink
                          });
                        }}
                      />
                    </InputGroup>
                  </div>
                );
              }
              return mlis;
            })()}
            {(() => {
              if (
                /infoTrackLink/gi.test(
                  monitorLinkInfo && monitorLinkInfo.interactionInfo
                )
              ) {
                const interactionInfo = JSON.parse(
                  monitorLinkInfo.interactionInfo
                );
                return (
                  <div>
                    <h5>
                      {interactionInfo.properties.infoTrackLink.title || ""}
                    </h5>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>曝光监控链接：</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="url"
                        disabled={isRead ? "disabled" : false}
                        value={
                          (formData &&
                            Array.isArray(formData.infoTrackLink) &&
                            formData.infoTrackLink[0] &&
                            formData.infoTrackLink[0].exposureTrackLink) ||
                          ""
                        }
                        placeholder="请输入链接"
                        onChange={e => {
                          if (
                            formData &&
                            Array.isArray(formData.infoTrackLink) &&
                            formData.infoTrackLink[0]
                          ) {
                            formData.infoTrackLink[0].exposureTrackLink =
                              e.target.value;
                          } else {
                            if (!Array.isArray(formData.infoTrackLink)) {
                              formData.infoTrackLink = [];
                            }
                            formData.infoTrackLink[0] = {
                              exposureTrackLink: e.target.value,
                              clickTrackLink: ""
                            };
                          }
                          setFormData({
                            infoTrackLink: formData.infoTrackLink
                          });
                        }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>点击监控链接：</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="url"
                        disabled={isRead ? "disabled" : false}
                        value={
                          (formData &&
                            Array.isArray(formData.infoTrackLink) &&
                            formData.infoTrackLink[0] &&
                            formData.infoTrackLink[0].clickTrackLink) ||
                          ""
                        }
                        placeholder="请输入链接"
                        onChange={e => {
                          if (
                            formData &&
                            Array.isArray(formData.infoTrackLink) &&
                            formData.infoTrackLink[0]
                          ) {
                            formData.infoTrackLink[0].clickTrackLink =
                              e.target.value;
                          } else {
                            formData.infoTrackLink[0] = {
                              exposureTrackLink: "",
                              clickTrackLink: e.target.value
                            };
                          }
                          setFormData({
                            infoTrackLink: formData.infoTrackLink
                          });
                        }}
                      />
                    </InputGroup>
                  </div>
                );
              }
            })()}
          </Fragment>
        ) : null}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={this._goBack.bind(this)}>返回</Button>
          {opType !== "read" && opType !== "update" ? (
            <Button onClick={this._gotoNext.bind(this)}>
              {whichStep === 1 ? "下一步" : "确定"}
            </Button>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  ...actions
};

const mapStateToProps = state => {
  return { planCRUDResult: state.planCRUD };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "planCRUD", reducer });

export default compose(
  withReducer,
  withConnect
)(SelectTheme);
