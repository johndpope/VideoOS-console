import React, { Fragment } from "react";
import {
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { Button, Icon, Feedback } from "@icedesign/base";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import MinSec from "./MinSec";

const AddMaterial = ({
  shouldOpen,
  toggle,
  addPlan,
  updatePlan,
  formData,
  setFormData,
  setEditState,
  record,
  materialTypes,
  currentPage,
  isEdit,
  isConflict
}) => {
  const { opType } = record || {};
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
    <Fragment>
      <Modal isOpen={shouldOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {isRead ? "投放计划信息" : isUpdate ? "投放计划修改" : "新增投放计划"}
        </ModalHeader>
        <ModalBody>
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
          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>投放视频id</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              placeholder="请输入投放视频id"
              disabled={isRead ? "disabled" : false}
              defaultValue={
                isRead || isUpdate ? formData && formData.launchVideoId : ""
              }
              onChange={e => {
                setFormData({ launchVideoId: e.target.value });
              }}
            />
          </InputGroup>
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
                  launchTimes: []
                });
              }}
            >
              <option value="">请选择</option>
              <option value="1">即时（仅适用于投放至直播内容）</option>
              <option value="0">视频时间（仅适用于投放至点播内容）</option>
              <option value="2">北京时间（仅适用于投放至直播内容）</option>
            </Input>
          </InputGroup>
          {formData &&
          formData.launchTimeType &&
          (formData.launchTimeType === "0" || formData.launchTimeType === 0) ? (
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
                              if (formData && formData.launchTime[0]) {
                                formData.launchTime[0].push("");
                              } else {
                                formData.launchTime[0] = [""];
                              }

                              setFormData({ launchTime: formData.launchTime });
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
                    isRead || isUpdate ? formData && formData.launchLenTime : ""
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
                    isRead || isUpdate ? formData && formData.launchLenTime : ""
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
              {formData &&
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
                          formData.launchTime[0] &&
                          formData.launchTime[0].map((lt, idx) => (
                            <Row className="full-child-height-bj">
                              <Col>
                                <DatePicker
                                  style={{
                                    height: "31.98px"
                                  }}
                                  key={lt + idx}
                                  disabled={isRead ? true : false}
                                  selected={
                                    lt && /:/gi.test(lt)
                                      ? moment(`2018-09-10 ${lt}`)
                                      : formData &&
                                        formData.launchTime &&
                                        (Array.isArray(formData.launchTime)
                                          ? moment(
                                              `2018-09-10 ${
                                                formData.launchTime[0]
                                              }`
                                            )
                                          : formData.launchTime)
                                  }
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeIntervals={1}
                                  dateFormat="LT"
                                  timeCaption="Time"
                                  onChange={e => {
                                    const ms_txt = `${
                                      e.hours() > 9 ? e.hours() : "0" + e.hour()
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
                              formData.launchTime[0].push("");
                              setFormData({ launchTime: formData.launchTime });
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
                                      lt && /:/gi.test(lt)
                                        ? moment(`2018-09-10 ${time}`)
                                        : formData &&
                                          formData.launchTime &&
                                          (Array.isArray(formData.launchTime)
                                            ? moment(
                                                `2018-09-10 ${
                                                  formData.launchTime[0]
                                                }`
                                              )
                                            : formData.launchTime)
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
                    isRead || isUpdate ? formData && formData.launchLenTime : ""
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
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>取消</Button>
          <Button
            type="primary"
            onClick={() => {
              const tempHash = [];
              let repeatState = false;
              let invalidState = false;
              if (isRead) {
                toggle && toggle();
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
              if (
                formData.launchTimeType === "0" ||
                formData.launchTimeType === "2"
              ) {
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
              if (
                formData.launchLenTime &&
                !/^[0-9]+$/gi.test(formData.launchLenTime)
              ) {
                Feedback.toast.error("投放时长为数字");
                return;
              }
              if (
                isConflict({
                  launchTime: formData.launchTime,
                  launchTimeLen: formData.launchLenTime
                })
              ) {
                Feedback.toast.error('"投放时间有冲突"');
                return;
              }
              // if (formData.interactionTypeName) {
              //   delete formData.interactionTypeName;
              // }
              if (isUpdate) {
                updatePlan({ ...formData, currentPage });
              } else {
                if (formData.v_minutes) delete formData.v_minutes;
                if (formData.v_seconds) delete formData.v_seconds;
                addPlan({ ...formData, currentPage });
              }
            }}
          >
            {isUpdate ? "确认修改" : isRead ? "确认" : "确认新增"}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default AddMaterial;
