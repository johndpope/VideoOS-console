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
import { getAccounts, addAccountModalToggle, addAccount } from './actions';
import reducer from './reducer';
import AccountTable from './components/Table';
import AddAccount from './components/AddAccount';

class AAAcount extends Component {

  state = {
    currentPage: 1,
  }

  componentDidMount() {
  }
  
  render() {
    const { aaAccount, addAccountModalToggle, addAccount } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="app">
        <AddAccount 
          shouldOpen={aaAccount && aaAccount.shouldAddAccountModalOpen} 
          toggle={addAccountModalToggle}
          addAccount={addAccount}
          resMsg={aaAccount.addAccountResErr}
        />
        <IceContainer>
          <Button onClick={addAccountModalToggle}>添加账号</Button>
        </IceContainer>
        <IceContainer>
          <AccountTable />
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