import React, { Component, Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { Input } from "@icedesign/base";
import { FormBinderWrapper, FormBinder } from "@icedesign/form-binder";
import { connect } from "react-redux";
import { compose } from "redux";
import injectReducer from "utils/injectReducer";
import reducer from "./reducer";

class Log extends Component {
  render() {
    return <div className="app">log</div>;
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {};
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "log", reducer });

export default compose(
  withReducer,
  withConnect
)(Log);
