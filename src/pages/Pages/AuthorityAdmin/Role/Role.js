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
import { getRoles, addRoleModalToggle, addRole, queryAllRoleTypes, deleteRoleModalToggle, deleteRole, updateRole } from './actions';
import reducer from './reducer';
import RoleTable from './components/Table';
import AddRole from './components/AddRole';
import DeleteRole from './components/DeleteRole';

class AARole extends Component {

  state = {
    currentPage: 1,
  }

  componentDidMount() {
    const { getRoles, queryAllRoleTypes } = this.props;
    getRoles();
    queryAllRoleTypes();
  }
  
  render() {
    const { aaRole, addRoleModalToggle, addRole, deleteRoleModalToggle, deleteRole, updateRole } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="app">
        <AddRole 
          shouldOpen={aaRole && aaRole.shouldAddRoleModalOpen} 
          toggle={addRoleModalToggle}
          addRole={addRole}
          updateRole={updateRole}
          roleAuthorities={aaRole.roleAuthorities || []}
          record={aaRole.record}
        />
        <DeleteRole 
          deleteRole={deleteRole} 
          shouldOpen={aaRole && aaRole.shouldDeleteRoleModalOpen} 
          toggle={() => {deleteRoleModalToggle(aaRole.record)}}
          record={aaRole.record}
        />
        <IceContainer>
          <Button onClick={addRoleModalToggle}>添加角色</Button>
        </IceContainer>
        <IceContainer>
          <RoleTable 
            isLoading={aaRole && aaRole.isLoading}
            dataSource={aaRole && aaRole.roleResult}
            addRoleModalToggle={addRoleModalToggle}
            deleteRoleModalToggle={deleteRoleModalToggle}
          />
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
  addRole,
  queryAllRoleTypes,
  deleteRoleModalToggle,
  deleteRole,
  updateRole,
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