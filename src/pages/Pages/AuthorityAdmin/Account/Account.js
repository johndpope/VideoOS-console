import React, { Component, Fragment } from 'react';
import { Button, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { getAccounts, addAccountModalToggle, addAccount, updateAccount, queryAllAccountTypes, deleteAccount, deleteAccountModalToggle } from './actions';
import reducer from './reducer';
import AccountTable from './components/Table';
import AddAccount from './components/AddAccount';
import DeleteAccount from './components/DeleteAccount';

class AAAcount extends Component {

  state = {
    currentPage: 1,
  }

  componentDidMount() {
    const { getAccounts, queryAllAccountTypes } = this.props;
    getAccounts();
    queryAllAccountTypes();
  }
  
  render() {
    const { aaAccount, addAccountModalToggle, addAccount, updateAccount, deleteAccount, deleteAccountModalToggle } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="app">
        <AddAccount 
          shouldOpen={aaAccount && aaAccount.shouldAddAccountModalOpen} 
          toggle={addAccountModalToggle}
          addAccount={addAccount}
          updateAccount={updateAccount}
          resMsg={aaAccount.addAccountResErr}
          roleTypes={aaAccount.roleTypes || []}
          record={aaAccount.record}
        />
        <DeleteAccount 
          deleteAccount={deleteAccount} 
          shouldOpen={aaAccount && aaAccount.shouldDeleteAccountModalOpen} 
          toggle={() => {deleteAccountModalToggle(aaAccount.record)}}
          record={aaAccount.record}
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
          {
            aaAccount && !aaAccount.isLoading ? (
              <Pagination 
                total={aaAccount.total}
                current={currentPage}
                pageSize={aaAccount.pageSize || 20}
              />
            ) : null
          }
        </IceContainer>
      </div>   
    ) 
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
};
  
const mapStateToProps = (state) => {
  return { aaAccount: state.aaAccount };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'aaAccount', reducer });

export default compose(
  withReducer,
  withConnect
)(AAAcount);