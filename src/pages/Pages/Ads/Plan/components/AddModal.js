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
  ModalHeader,
  Badge
} from "reactstrap";
import { Button, Icon, Feedback } from "@icedesign/base";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const AddMaterial = ({
  shouldOpen,
  toggle,
  addPlan,
  updatePlan,
  formData,
  setFormData,
  record,
  materialTypes,
  currentPage
}) => {
  const { opType } = record || {};
  const isRead = opType === "read";
  const isUpdate = opType === "update";
  let launchTimes =
    (formData && formData.launchTimes) ||
    (formData.launchTime && formData.launchTime.split(",")) ||
    [];
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
    formData.launchTimeType = String(formData.launchTimeType);
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
              <InputGroupText>投放类型</InputGroupText>
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
              value={(formData && formData.creativeId) || ""}
              onChange={e => {
                setFormData({ creativeId: e.target.value });
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
                  <option key={idx} value={mt.creativeId}>
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
              value={(formData && formData.launchTimeType) || ""}
              onChange={e => {
                setFormData({
                  launchTimeType: e.target.value,
                  launchTimes: []
                });
              }}
            >
              <option value="">请选择</option>
              <option value="1">即时</option>
              <option value="0">视频时间</option>
              <option value="2">北京时间</option>
            </Input>
          </InputGroup>
          {formData &&
          formData.launchTimeType &&
          formData.launchTimeType === "0" ? (
            <Fragment>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>投放日期</InputGroupText>
                </InputGroupAddon>
                <DatePicker
                  locale="cn-gb"
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
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>投放时间</InputGroupText>
                </InputGroupAddon>
                {!isRead ? (
                  <span
                    style={{
                      flex: "1 1 auto",
                      marginLeft: "8px",
                      width: "1%",
                      float: "left"
                    }}
                  >
                    <Row>
                      <Col md="3">
                        <Input
                          maxLength={2}
                          onChange={e => {
                            setFormData({
                              v_minutes: e.target.value
                            });
                          }}
                        />
                      </Col>
                      <Col md="1">分</Col>
                      <Col md="3">
                        <Input
                          maxLength={2}
                          onChange={e => {
                            setFormData({
                              v_seconds: e.target.value
                            });
                          }}
                        />
                      </Col>
                      <Col md="1">秒</Col>
                      <Col md="1">
                        <Button
                          onClick={() => {
                            if (!formData.v_minutes) {
                              Feedback.toast.error("请输入分");
                              return;
                            }
                            if (!/^[0-9]+$/gi.test(formData.v_minutes)) {
                              Feedback.toast.error("请输入有效分钟");
                              return;
                            }
                            if (!formData.v_seconds) {
                              Feedback.toast.error("请输入秒");
                              return;
                            }
                            if (!/^[0-9]+$/gi.test(formData.v_seconds)) {
                              Feedback.toast.error("请输入有效秒数");
                              return;
                            }
                            if (
                              !launchTimes.includes(
                                `${formData.v_minutes}:${formData.v_seconds}`
                              )
                            ) {
                              launchTimes.push(
                                `${formData.v_minutes}:${formData.v_seconds}`
                              );
                              setFormData({ launchTimes });
                            }
                          }}
                        >
                          <Icon type="add" />
                          <Badge>点击“+”添加</Badge>
                        </Button>
                      </Col>
                    </Row>
                  </span>
                ) : null}
              </InputGroup>
              <div
                style={{
                  padding: "0 0 1em 6em"
                }}
              >
                {launchTimes &&
                  launchTimes.length > 0 &&
                  launchTimes.map((lt, idx) => (
                    <div key={idx}>
                      <span>{lt}</span>
                      <Button
                        onClick={() => {
                          launchTimes.splice(idx, 1);
                          setFormData({ launchTimes });
                        }}
                      >
                        <Icon type="ashbin" />
                      </Button>
                    </div>
                  ))}
              </div>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>投放时长</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="select"
                  disabled={isRead ? "disabled" : false}
                  defaultValue={
                    isRead || isUpdate ? formData && formData.launchLenTime : ""
                  }
                  onChange={e => {
                    setFormData({ launchLenTime: e.target.value });
                  }}
                >
                  <option value="default">请选择</option>
                  <option value="10">10秒</option>
                  <option value="20">20秒</option>
                  <option value="30">30秒</option>
                  <option value="60">60秒</option>
                  <option value="120">120秒</option>
                  <option value="自定义">自定义</option>
                </Input>
              </InputGroup>
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
                  type="select"
                  disabled={isRead ? "disabled" : false}
                  defaultValue={
                    isRead || isUpdate ? formData && formData.launchLenTime : ""
                  }
                  onChange={e => {
                    setFormData({ launchLenTime: e.target.value });
                  }}
                >
                  <option value="default">请选择</option>
                  <option value="10">10秒</option>
                  <option value="20">20秒</option>
                  <option value="30">30秒</option>
                  <option value="60">60秒</option>
                  <option value="120">120秒</option>
                  <option value="自定义">自定义</option>
                </Input>
              </InputGroup>
            </Fragment>
          ) : null}
          {formData &&
          formData.launchTimeType &&
          formData.launchTimeType === "2" ? (
            <Fragment>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>投放日期</InputGroupText>
                </InputGroupAddon>
                <DatePicker
                  locale="cn-gb"
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
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>投放时间</InputGroupText>
                </InputGroupAddon>
                <DatePicker
                  selected={
                    formData &&
                    formData.launchTime &&
                    (typeof formData.launchTime === "string"
                      ? moment(
                          `2018-09-10 ${formData.launchTime.split(",")[0]}`
                        )
                      : formData.launchTime)
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={5}
                  dateFormat="LT"
                  timeCaption="Time"
                  isClearable={true}
                  onChange={e => {
                    setFormData({ launchTime: e });
                  }}
                  placeholderText="请添加投放时间"
                />
                <Button
                  onClick={() => {
                    const { launchTime } = formData;
                    if (!launchTime) {
                      Feedback.toast.error("请选择投放时间");
                      return;
                    }
                    const ltStr = `${
                      launchTime.hours() > 9
                        ? launchTime.hours()
                        : "0" + launchTime.hours()
                    }:${
                      launchTime.minutes() > 9
                        ? launchTime.minutes()
                        : "0" + launchTime.minutes()
                    }`;
                    if (!launchTimes.includes(ltStr)) {
                      launchTimes.push(ltStr);
                      setFormData({ launchTimes });
                    }
                  }}
                >
                  <Icon type="add" />
                  <Badge>点击“+”添加</Badge>
                </Button>
              </InputGroup>
              <div
                style={{
                  padding: "0 0 1em 6em"
                }}
              >
                {launchTimes &&
                  launchTimes.length > 0 &&
                  launchTimes.map((lt, idx) => (
                    <div key={idx}>
                      <span>{lt}</span>
                      <Button
                        onClick={() => {
                          launchTimes.splice(idx, 1);
                          setFormData({ launchTimes });
                        }}
                      >
                        <Icon type="ashbin" />
                      </Button>
                    </div>
                  ))}
              </div>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>投放时长</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="select"
                  disabled={isRead ? "disabled" : false}
                  defaultValue={
                    isRead || isUpdate ? formData && formData.launchLenTime : ""
                  }
                  onChange={e => {
                    setFormData({ launchLenTime: e.target.value });
                  }}
                >
                  <option value="default">请选择</option>
                  <option value="10">10秒</option>
                  <option value="20">20秒</option>
                  <option value="30">30秒</option>
                  <option value="60">60秒</option>
                  <option value="120">120秒</option>
                  <option value="自定义">自定义</option>
                </Input>
              </InputGroup>
            </Fragment>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>取消</Button>
          <Button
            type="primary"
            onClick={() => {
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
                  !Array.isArray(formData.launchTimes) ||
                  formData.launchTimes.length === 0
                ) {
                  Feedback.toast.error('"请添加“投放时间”"');
                  return;
                }
              }
              if (!formData.launchLenTime) {
                Feedback.toast.error("请选择“投放时长”");
                return;
              }
              if (isUpdate) {
                if (formData.launchTimes) {
                  formData.launchTime = formData.launchTimes.join(",");
                }
                delete formData.launchTimes;
                updatePlan({ ...formData, currentPage });
              } else {
                formData.launchTime =
                  formData.launchTimes && formData.launchTimes.join(",");
                delete formData.launchTimes;
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
