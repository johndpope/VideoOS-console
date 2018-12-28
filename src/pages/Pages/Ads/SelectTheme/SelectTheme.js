import React, { Component, Fragment } from "react";
import IceContainer from "@icedesign/container";
import querystring from "querystring";
import { connect } from "react-redux";
import { compose } from "redux";
import injectReducer from "utils/injectReducer";
import { Button, Feedback, Icon } from "@icedesign/base";

import ThemeCard from "./components/Card";

import { queryAllModelTypes, goBack, gotoCRUD } from "./actions";
import reducer from "./reducer";

class SelectTheme extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { queryAllModelTypes } = this.props;
    queryAllModelTypes();
  }

  render() {
    const { selectThemeResult, goBack, gotoCRUD } = this.props;
    return (
      <div className="app">
        <IceContainer
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <h3 style={{ color: "#20a8d8" }}>请选择互动应用</h3>
          <Button onClick={goBack}>
            <Icon type="ashbin" />
          </Button>
        </IceContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginLeft: "-1rem"
          }}
        >
          {selectThemeResult &&
            selectThemeResult.modelTypes &&
            Array.isArray(selectThemeResult.modelTypes) &&
            selectThemeResult.modelTypes.map((mt, idx) => (
              <ThemeCard key={idx} info={mt} gotoCRUD={gotoCRUD} />
            ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  queryAllModelTypes,
  goBack,
  gotoCRUD
};

const mapStateToProps = state => {
  return { selectThemeResult: state.selectTheme };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "selectTheme", reducer });

export default compose(
  withReducer,
  withConnect
)(SelectTheme);
