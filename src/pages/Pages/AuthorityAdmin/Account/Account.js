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
import { getAccounts, addAccountModalToggle, addAccount, queryAllAccountTypes } from './actions';
import reducer from './reducer';
import AccountTable from './components/Table';
import AddAccount from './components/AddAccount';

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
    const { aaAccount, addAccountModalToggle, addAccount, queryAllAccountTypes } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="app">
        <AddAccount 
          shouldOpen={aaAccount && aaAccount.shouldAddAccountModalOpen} 
          toggle={addAccountModalToggle}
          addAccount={addAccount}
          resMsg={aaAccount.addAccountResErr}
          roleTypes={aaAccount.roleTypes || []}
        />
        <IceContainer>
          <Button onClick={addAccountModalToggle}>添加账号</Button>
        </IceContainer>
        <IceContainer>
          <AccountTable 
            isLoading={aaAccount && aaAccount.isLoading}
            dataSource={aaAccount && aaAccount.accountResult}
            addAccountModalToggle={addAccountModalToggle}
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