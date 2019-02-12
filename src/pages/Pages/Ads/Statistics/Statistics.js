/* * @Author: zhouzhe  * @Date: 2019-01-25 15:29:43 */
import React, { Component } from "react";
import { DatePicker, Grid, Input, Icon, Feedback } from "@icedesign/base";
import { Tooltip } from "reactstrap";
import utils from "src/utils/utils";
import { getAllProgram, getStatistics } from "./api.js";
import Select from "./Select.js";
import moment from "moment";
console.dir(moment);
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
const { ONEDAY, ONEWEEK, ONEMONTH } = utils.timeConst;
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
let defTime = moment(now).format("YYYY-MM-DD");
class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolti1: false,
      toolti2: false,
      toolti3: false,
      toolti4: false,
      searData: "",
      selectData: [],
      chooseTime: [defTime, defTime], //选中的时间
      interactionId: "", //选中的小程序id
      showData: {},
      showAllList: [
        {
          name: "toolti2",
          title: "视频数据",
          // explain: "仅统计含投放计划的视频数据",
          list: [
            {
              title: "视频播放次数",
              key: "showExposureCount"
            }
          ]
        },
        {
          name: "toolti3",
          title: "热点数据",
          explain: "热点：投放到视频的互动/广告点位即为热点",
          list: [
            {
              title: "热点曝光次数",
              key: "hotspotShowExposureCount"
            },
            {
              title: "可点击的热点曝光次数",
              key: "hotspotClickExposureCount"
            },
            {
              title: "热点点击位点击次数",
              key: "hotspotClickEventCount"
            },
            {
              title: "热点点击位点击率",
              key: "hotspotClickRate"
            }
          ]
        },
        {
          name: "toolti4",
          title: "信息层数据",
          explain: "信息层：由热点打开的交互层即为信息层",
          list: [
            {
              title: "信息层曝光次数",
              key: "infoShowExposureCount"
            },
            {
              title: "信息层上的点击位曝光次数",
              key: "infoClickExposureCount"
            },
            {
              title: "信息层上的点击位点击次数",
              key: "infoClickEventCount"
            },
            {
              title: "信息层上的点击位点击率",
              key: "infoClickRate"
            }
          ]
        }
      ]
    };
  }
  async setSelectDom() {
    let data = await getAllProgram();
    let list = data.data.interactionInfoList;
    console.log(list);
    list.unshift({ interactionId: "", interactionTypeName: "全部" });
    this.setState({ selectData: list });
  }
  componentWillMount() {
    this.setSelectDom();
    this.searchClick();
  }
  render() {
    let showList = this.setShowDom();
    return (
      <div
        style={{
          width: "100%"
        }}
      >
        <div className="container-box">
          <Row className="mb-3">
            <Col
              children="选择时间:"
              span="2"
              style={{
                minWidth: "100px"
              }}
              align="center"
            />
            <Col span="20">
              <RangePicker
                ranges={quickRanges}
                defaultValue={[now, now]}
                onChange={this.changeTime.bind(this)}
              />
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
              span="2"
              style={{
                minWidth: "100px"
              }}
              align="center"
            />
            <Col span="20">
              <Select
                list={this.state.selectData}
                name="全部"
                event={this.selectClick.bind(this)}
                keyName="interactionTypeName"
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col
              children="输入视频:"
              span="2"
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
        </div>
        {showList}
      </div>
    );
  }
  setShowDom() {
    let domArr = [];
    this.state.showAllList.forEach(v => {
      let child = [];
      let dataNum = this.state.showData;
      for (let item of v.list) {
        let cade =
          item.key === "infoClickRate" || item.key === "hotspotClickRate"
            ? "%"
            : "";
        child.push(
          <div className="dataShow" key={item.title}>
            <h2>
              {dataNum[item.key] || 0}
              {cade}
            </h2>
            <h2>{item.title}</h2>
          </div>
        );
      }
      let tips = v.explain ? (
        <span>
          <Icon
            type="help"
            size="small"
            className="mx-1"
            href="#"
            id={v.name}
          />
          <Tooltip
            placement="right"
            isOpen={this.state[v.name]}
            target={v.name}
            toggle={this.toolOpen.bind(this, v.name)}
          >
            {v.explain}
          </Tooltip>
        </span>
      ) : (
        ""
      );
      domArr.push(
        <div className="container-box" key={v.title}>
          <Row className="mb-3">
            <Col
              span="3"
              style={{
                minWidth: "120px",
                maxWidth: "130px"
              }}
              align="center"
            >
              <h2 href="#" className="d-inline-block">
                {v.title}
              </h2>
              {tips}
            </Col>
            <Col span="20">{child}</Col>
          </Row>
        </div>
      );
    });
    return domArr;
  }
  async changeTime(...argus) {
    console.log(argus);
    await this.setState({ chooseTime: argus[1] });
    this.searchClick();
  }
  async searchClick() {
    if (!this.checkData()) {
      return false;
    }
    let time = this.state.chooseTime;
    let obj = {
      startDate: time[0],
      endDate: time[1],
      videoId: this.state.searData,
      interactionId: this.state.interactionId
    };
    //点击搜索
    let data = await getStatistics(obj);
    if (data.data.resMsg === "处理成功") {
      this.setState({ showData: data.data });
    } else {
      Feedback.toast.error(data.data.resMsg);
    }
    console.log(data);
  }
  checkData() {
    if (!this.state.chooseTime[0]) {
      Feedback.toast.error("请选择时间");
      return false;
    }
    return true;
  }
  searChange(v) {
    this.setState({ searData: v });
  }
  toolOpen(str) {
    let obj = {};
    obj[str] = !this.state[str];
    this.setState(obj);
  }
  async selectClick(item) {
    await this.setState({ interactionId: item.interactionId });
    this.searchClick();
  }
}
export default Statistics;
