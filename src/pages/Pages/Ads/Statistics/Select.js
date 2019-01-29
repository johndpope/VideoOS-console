/* * @Author: zhouzhe  * @Date: 2019-01-29 15:13:52 */
import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
/**
 * props {
 *  list:Array//需要展示的数据
 *  name:str,
 *  event:function//回调
 *  keyName:str//需要展示的键值
 * }
 */
class Selectc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      showStr: ""
    };
  }
  render() {
    let domArr = [];
    this.props.list.forEach(item => {
      domArr.push(
        <DropdownItem
          onClick={() => this.selectClick(item)}
          key={item.interactionId}
        >
          {item.interactionTypeName}
        </DropdownItem>
      );
      return item.interactionId;
    });
    return (
      <ButtonDropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle.bind(this)}
      >
        <div className="dropBox">
          <DropdownToggle color="" caret>
            {this.state.showStr || this.props.name}
          </DropdownToggle>
        </div>

        <DropdownMenu>{domArr}</DropdownMenu>
      </ButtonDropdown>
    );
  }
  selectClick(item) {
    this.setState({
      showStr: item[this.props.keyName]
    });
    this.props.event(item);
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
}
export default Selectc;
