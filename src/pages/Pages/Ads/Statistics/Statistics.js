/* * @Author: zhouzhe  * @Date: 2019-01-25 15:29:43 */
import React, { Component } from "react";
import { DatePicker, Grid, Input, Icon } from "@icedesign/base";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Tooltip
} from "reactstrap";
import utils from "src/utils/utils";
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
const { ONEDAY, ONEWEEK, ONEMONTH } = utils.timeConst;
console.dir(Icon);
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
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      toolti1: false,
      toolti2: false,
      dropSelect: "全部",
      searData: ""
    };
  }
  render() {
    return (
      <div
        style={{
          width: "100%"
        }}
      >
        <Row className="mb-3">
          <Col
            children="选择时间:"
            span="3"
            style={{
              minWidth: "100px"
            }}
            align="center"
          />
          <Col span="20">
            <RangePicker ranges={quickRanges} onChange={this.changeTime} />
            <Icon
              type="help"
              size="small"
              className="mx-1"
              href="#"
              id="TooltipExample"
            />
            <Tooltip
              placement="right"
              isOpen={this.state.toolti1}
              target="TooltipExample"
              toggle={this.toolOpen.bind(this, "toolti1")}
            >
              “今日”数据展示从今日0点至今日上个整点时刻的数据
            </Tooltip>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col
            children="选择小程序:"
            span="3"
            style={{
              minWidth: "100px"
            }}
            align="center"
          />
          <Col span="20">
            <ButtonDropdown
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle}
            >
              <div className="dropBox">
                <DropdownToggle color="" caret>
                  {this.state.dropSelect}
                </DropdownToggle>
              </div>

              <DropdownMenu>
                <DropdownItem>Header</DropdownItem>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Ansother Action</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col
            children="输入视频:"
            span="3"
            style={{
              minWidth: "100px"
            }}
            align="center"
          />
          <Col span="20">
            <Input
              addonAfter={
                <Icon
                  type="search"
                  size="xs"
                  onClick={this.searchClick.bind(this)}
                  style={{ cursor: "pointer" }}
                />
              }
              placeholder="请输入视频链接"
              value={this.state.searData}
              onChange={this.searChange.bind(this)}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col
            span="3"
            style={{
              minWidth: "100px"
            }}
            align="center"
          >
            <h2 href="#" className="d-inline-block">
              视频数据
            </h2>
            <Icon
              type="help"
              size="small"
              className="mx-1"
              href="#"
              id="toolti2"
            />
            <Tooltip
              placement="right"
              isOpen={this.state.toolti2}
              target="toolti2"
              toggle={this.toolOpen.bind(this, "toolti2")}
            >
              仅统计含投放计划的视频数据
            </Tooltip>
          </Col>
          <Col span="20">
            <div className="dataShow">
              <h2>111</h2>
              <h2>视频播放次数</h2>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
  changeTime(val) {
    console.log(val);
  }
  dropdowm(e) {
    console.log(e);
  }
  searchClick() {
    //点击搜索
    console.log(this);
  }
  searChange(v) {
    this.setState({ searData: v });
  }
  toolOpen(str) {
    let obj = {};
    obj[str] = !this.state[str];
    this.setState(obj);
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
}
export default Statistics;
