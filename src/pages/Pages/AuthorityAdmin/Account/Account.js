import React, { Component } from "react";
import { Button, Pagination } from "@icedesign/base";
import IceContainer from "@icedesign/container";
import { connect } from "react-redux";
import { compose } from "redux";
import injectReducer from "utils/injectReducer";
import {
  getAccounts,
  addAccountModalToggle,
  addAccount,
  updateAccount,
  queryAllAccountTypes,
  deleteAccount,
  deleteAccountModalToggle,
  setCurrentPage
} from "./actions";
import reducer from "./reducer";
import AccountTable from "./components/Table";
import AddAccount from "./components/AddAccount";
import DeleteAccount from "./components/DeleteAccount";

class AAAcount extends Component {
  componentDidMount() {
    const { getAccounts, queryAllAccountTypes } = this.props;
    getAccounts();
    queryAllAccountTypes();
  }

  render() {
    const {
      aaAccount,
      addAccountModalToggle,
      addAccount,
      updateAccount,
      deleteAccount,
      deleteAccountModalToggle,
      getAccounts,
      setCurrentPage
    } = this.props;
    return (
      <div className="app">
        <AddAccount
          shouldOpen={aaAccount && aaAccount.shouldAddAccountModalOpen}
          toggle={addAccountModalToggle}
          addAccount={addAccount}
          updateAccount={updateAccount}
          resMsg={aaAccount && aaAccount.addAccountResErr}
          roleTypes={aaAccount.roleTypes || []}
          record={aaAccount.record}
          currentPage={aaAccount && aaAccount.currentPage}
        />
        <DeleteAccount
          deleteAccount={deleteAccount}
          shouldOpen={aaAccount && aaAccount.shouldDeleteAccountModalOpen}
          toggle={() => {
            deleteAccountModalToggle(aaAccount.record);
          }}
          record={aaAccount.record}
          currentPage={aaAccount && aaAccount.currentPage}
        />
        <IceContainer>
          <Button onClick={addAccountModalToggle}>添加账号</Button>
        </IceContainer>
        <IceContainer>
          <AccountTable
            isLoading={aaAccount && aaAccount.isLoading}
            dataSource={aaAccount && aaAccount.accountResult}
            addAccountModalToggle={addAccountModalToggle}
            deleteAccountModalToggle={deleteAccountModalToggle}
          />
          {aaAccount && !aaAccount.isLoading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                padding: "10px 0"
              }}
            >
              <Pagination
                total={aaAccount.total}
                current={aaAccount.currentPage || 1}
                pageSize={aaAccount.pageSize || 20}
                onChange={currentPage => {
                  setCurrentPage({ currentPage });
                  getAccounts({
                    currentPage,
                    pageSize: 20
                  });
                }}
              />
            </div>
          ) : null}
        </IceContainer>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getAccounts,
  addAccountModalToggle,
  addAccount,
  queryAllAccountTypes,
  deleteAccount,
  deleteAccountModalToggle,
  updateAccount,
  setCurrentPage
};

const mapStateToProps = state => {
  return { aaAccount: state.aaAccount };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "aaAccount", reducer });

export default compose(
  withReducer,
  withConnect
)(AAAcount);
