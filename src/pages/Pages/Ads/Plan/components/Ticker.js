import React, { Component, Fragment } from "react";

let launchTm;
let currentTm;
let st;

class Ticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      INTERVEL: 0
    };
  }

  componentDidMount() {
    const { launchLenTime, launchStartTime } = this.props;
    launchTm = new Date(launchStartTime).getTime();
    currentTm = new Date().getTime();
    let INTERVEL =
      launchTm + launchLenTime * 1000 - currentTm > 0
        ? Math.floor((launchTm + launchLenTime * 1000 - currentTm) / 1000)
        : 0;
    this.setState({ INTERVEL });
    st = setInterval(() => {
      launchTm = new Date("2019-01-11 14:20").getTime();
      currentTm = new Date().getTime();
      INTERVEL =
        launchTm + launchLenTime * 1000 - currentTm > 0
          ? Math.floor((launchTm + launchLenTime * 1000 - currentTm) / 1000)
          : 0;
      this.setState({ INTERVEL });
      if (INTERVEL === 0) clearTimeout(st);
    }, 1000);
  }

  render() {
    const { INTERVEL } = this.state;
    return (
      <Fragment>{INTERVEL > 0 ? `投放中(${INTERVEL}s)` : "投放"}</Fragment>
    );
  }
}

export default Ticker;
