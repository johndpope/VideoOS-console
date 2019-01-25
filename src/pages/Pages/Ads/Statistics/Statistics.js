import React, { Component } from "react";
import { DatePicker } from "@icedesign/base";
import utils from "src/utils/utils";
const { RangePicker } = DatePicker;
const { ONEDAY, ONEWEEK, ONEMONTH } = utils.timeConst;
console.log(utils);
const now = new Date();
const last = now - ONEDAY;
const week = now - ONEWEEK;
const month = now - ONEMONTH;
const quickRanges = {
  今天: [now, now],
  昨天: [last, last],
  最近一周: [week, now],
  最近30天: [month, now]
};
class Statistics extends Component {
  render() {
    return (
      <div style={{ width: "100px" }}>
        <RangePicker ranges={quickRanges} onChange={this.changeTime} />
      </div>
    );
  }
  changeTime(val) {
    console.log(val);
  }
}
export default Statistics;
