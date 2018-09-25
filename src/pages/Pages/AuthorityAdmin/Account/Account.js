import React, { Component } from "react";
import { Button, Pagination } from "@icedesign/base";
import IceContainer from "@icedesign/container";
import { connect } from "react-redux";
import { compose } from "redux";
import { AUTH_KEYS } from "src/maps";
import { getUserInfoLocal } from "utils/authority";
import injectReducer from "utils/injectReducer";
import {
  getAccounts,
  addAccountModalToggle,
  addAccount,
  updateAccount,
  queryAllAccountTypes,
  deleteAccount,
  deleteAccountModalToggle,
  setCurrentPage,
  setFormData
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

  componentWillUnmount() {
    const { setCurrentPage } = this.props;
    setCurrentPage({
      currentPage: 1
    });
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
      setCurrentPage,
      setFormData
    } = this.props;
    const { authorList } = getUserInfoLocal();
    return (
      <div className="app">
        <AddAccount
          shouldOpen={aaAccount && aaAccount.shouldAddAccountModalOpen}
          toggle={addAccountModalToggle}
          addAccount={addAccount}
          updateAccount={updateAccount}
          setFormData={setFormData}
          resMsg={aaAccount && aaAccount.addAccountResErr}
          roleTypes={aaAccount.roleTypes || []}
          record={aaAccount.record}
          currentPage={aaAccount && aaAccount.currentPage}
          formData={aaAccount && aaAccount.formData}
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
            readOnly={
              authorList ? authorList.includes(AUTH_KEYS.ACCOUNT_READ) : false
            }
            currentPage={aaAccount.currentPage || 1}
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
  setCurrentPage,
  setFormData
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
