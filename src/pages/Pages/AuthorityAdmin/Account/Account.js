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
import { getAccounts } from './actions';
import reducer from './reducer';
import AccountTable from './components/Table';

class AAAcount extends Component {

  state = {
    currentPage: 1,
  }

  componentDidMount() {
  }
  
  render() {
    const { aaAccount, addAccountToggle } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="app">
        <IceContainer>
          <Button onClick={addAccountToggle}>添加账号</Button>
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