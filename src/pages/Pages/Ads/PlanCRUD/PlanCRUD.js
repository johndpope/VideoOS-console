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

import {
  goBack,
  setFormData,
  getAdMaterials,
  setEditState,
  queryInteractionInfo,
  gotoNext,
  setWhichStep
} from "./actions";
import reducer from "./reducer";

let opType;
let qs;

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

let params = { pageSize: 20 };

class SelectTheme extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getAdMaterials, location, setFormData } = this.props;
    let qs = querystring.parse(location && location.search.substring(1));
    setFormData({ interactionTypeName: qs && qs.interactionTypeName });
    getAdMaterials({ interactionType: qs && qs.id });
  }

  render() {
    const {
      setEditState,
      goBack,
      setFormData,
      planCRUDResult,
      gotoNext,
      setWhichStep
    } = this.props;
    const { formData, materialTypes, isEdit, whichStep } = planCRUDResult;
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
        <IceContainer>
          <h4>
            新增投放计划（
            {whichStep}
            /2）
          </h4>
        </IceContainer>
        {whichStep === 1 ? (
          <Fragment>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>投放名称</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="请输入投放名称"
                disabled={isRead ? "disabled" : false}
                defaultValue={
                  isRead || isUpdate ? formData && formData.launchPlanName : ""
                }
                onChange={e => {
                  setFormData({ launchPlanName: e.target.value });
                }}
                maxLength={10}
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
                defaultValue={
                  isRead || isUpdate ? formData && formData.launchVideoId : ""
                }
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
                    defaultValue={
                      isRead || isUpdate
                        ? formData && formData.launchLenTime
                        : ""
                    }
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
                    defaultValue={
                      isRead || isUpdate
                        ? formData && formData.launchLenTime
                        : ""
                    }
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
                    defaultValue={
                      isRead || isUpdate
                        ? formData && formData.launchLenTime
                        : ""
                    }
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
        {whichStep === 2 ? <Fragment>step 2</Fragment> : null}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={goBack}>返回</Button>
          <Button onClick={gotoNext}>
            {whichStep === 1 ? "下一步" : "确定"}
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  goBack,
  setFormData,
  getAdMaterials,
  setEditState,
  queryInteractionInfo,
  gotoNext,
  setWhichStep
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
