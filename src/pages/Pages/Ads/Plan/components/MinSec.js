import React, { Fragment } from "react";
import { Row, Col, Input } from "reactstrap";
import { Button, Icon, Feedback } from "@icedesign/base";

const MinSec = ({ time, idx, setFormData, isRead, launchTimes }) => {
  let temp_ms = /:/gi.test(time) ? time.split(":") : ["", ""];
  const firstOne = idx === 0 ? true : false;
  return (
    <Fragment>
      <Row>
        <Col md="3">
          <Input
            type="tel"
            disabled={isRead ? "disabled" : false}
            maxLength={2}
            defaultValue={temp_ms[0]}
            onChange={e => {
              if (!/^[0-9]+$/gi.test(e.target.value)) {
                Feedback.toast.error("请输入有效分钟数");
                return;
              }
              temp_ms[0] = e.target.value || "";
              if (temp_ms[1]) {
                const ms_txt = temp_ms.join(":");
                if (launchTimes) {
                  if (!launchTimes.includes(ms_txt)) {
                    launchTimes[idx] = ms_txt;
                  } else {
                    Feedback.toast.error("该投放时间已添加");
                    return;
                  }
                } else {
                  launchTimes = [];
                  launchTimes.push(ms_txt);
                }
                setFormData({ launchTimes });
              }
            }}
          />
        </Col>
        <Col md="1">分</Col>
        <Col md="3">
          <Input
            type="tel"
            disabled={isRead ? "disabled" : false}
            maxLength={2}
            defaultValue={temp_ms[1]}
            onChange={e => {
              if (
                !/^[0-9]+$/gi.test(e.target.value) ||
                Number(e.target.value) > 60
              ) {
                Feedback.toast.error("请输入有效秒数");
                return;
              }
              temp_ms[1] = e.target.value || "";
              if (temp_ms[0]) {
                const ms_txt = temp_ms.join(":");
                if (launchTimes) {
                  if (!launchTimes.includes(ms_txt)) {
                    launchTimes[idx] = ms_txt;
                  } else {
                    Feedback.toast.error("该投放时间已添加");
                    return;
                  }
                } else {
                  launchTimes = [];
                  launchTimes.push(temp_ms.join(":"));
                }
                setFormData({ launchTimes });
              }
            }}
          />
        </Col>
        <Col md="1">秒</Col>
        {!firstOne && !isRead ? (
          <Col md="2">
            <Button
              onClick={() => {
                launchTimes.splice(idx, 1);
                setFormData({ launchTimes });
              }}
            >
              <Icon type="ashbin" />
            </Button>
          </Col>
        ) : null}
      </Row>
    </Fragment>
  );
};

export default MinSec;
