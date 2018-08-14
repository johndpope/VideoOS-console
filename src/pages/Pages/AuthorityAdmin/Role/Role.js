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
import { getRoles, addRoleModalToggle } from './actions';
import reducer from './reducer';
import RoleTable from './components/Table';
import AddRole from './components/AddRole';

class AARole extends Component {

  state = {
    currentPage: 1,
  }

  componentDidMount() {
  }
  
  render() {
    const { aaRole, addRoleModalToggle } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="app">
        <AddRole shouldOpen={aaRole && aaRole.shouldAddRoleModalOpen} toggle={addRoleModalToggle}/>
        <IceContainer>
          <Button onClick={addRoleModalToggle}>添加角色</Button>
        </IceContainer>
        <IceContainer>
          <RoleTable />
          {
            aaRole && !aaRole.isLoading ? (
              <Pagination 
                total={aaRole.total}
                current={currentPage}
                pageSize={aaRole.pageSize || 20}
              />
            ) : null
          }
        </IceContainer>
      </div>   
    ) 
  }  
}

const mapDispatchToProps = {
  getRoles,
  addRoleModalToggle,
};
  
const mapStateToProps = (state) => {
  return { aaRole: state.aaRole };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'aaRole', reducer });

export default compose(
  withReducer,
  withConnect
)(AARole);