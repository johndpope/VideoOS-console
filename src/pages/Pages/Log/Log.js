import React, { Component } from "react";
import { Pagination } from "@icedesign/base";
import { connect } from "react-redux";
import { compose } from "redux";
import injectReducer from "utils/injectReducer";
import reducer from "./reducer";
import { getLogs, setCurrentPage } from "./actions";
import LogTable from "./components/Table";

class Log extends Component {
  componentDidMount() {
    const { getLogs } = this.props;
    getLogs();
  }

  componentWillUnmount() {
    const { setCurrentPage } = this.props;
    setCurrentPage({
      currentPage: 1
    });
  }

  render() {
    const { log, setCurrentPage, getLogs } = this.props;
    return (
      <div className="app">
        <LogTable
          isLoading={log && log.isLoading}
          dataSource={(log && log.logResult) || []}
        />
        {log && !log.isLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              padding: "10px 0"
            }}
          >
            <Pagination
              total={log.total}
              current={log.currentPage || 1}
              pageSize={log.pageSize || 20}
              onChange={currentPage => {
                setCurrentPage({
                  currentPage
                });
                getLogs({
                  currentPage,
                  pageSize: 20
                });
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = {
  getLogs,
  setCurrentPage
};

const mapStateToProps = state => {
  return {
    log: state.log
  };
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
