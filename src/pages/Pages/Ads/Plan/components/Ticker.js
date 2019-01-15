import React, { Component, Fragment } from "react";

let launchTm;
let currentTm;

class Ticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      INTERVEL: 0
    };
  }

  componentDidMount() {
    const {
      launchLenTime,
      launchStartTime,
      setPlanResult,
      planResult,
      index
    } = this.props;
    launchTm = new Date(launchStartTime).getTime();
    currentTm = new Date().getTime();
    let INTERVEL =
      launchTm + launchLenTime * 1000 - currentTm > 0
        ? Math.floor((launchTm + launchLenTime * 1000 - currentTm) / 1000)
        : 0;
    this.setState({ INTERVEL });
    let st = setInterval(() => {
      currentTm = new Date().getTime();
      INTERVEL =
        launchTm + launchLenTime * 1000 - currentTm > 0
          ? Math.floor((launchTm + launchLenTime * 1000 - currentTm) / 1000)
          : 0;
      this.setState({ INTERVEL });
      if (INTERVEL === 0) {
        // setReLaunch({reLaunch: true});
        if (Array.isArray(planResult)) {
          planResult[index].launchStatus = 2;
          setPlanResult({ planResult });
        }
        clearTimeout(st);
      }
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
