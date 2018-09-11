import React, { Component } from 'react';
import { Button, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { getRoles, addRoleModalToggle, addRole, queryAllRoleTypes, deleteRoleModalToggle, deleteRole, updateRole, setCurrentPage, setFormData } from './actions';
import reducer from './reducer';
import RoleTable from './components/Table';
import AddRole from './components/AddRole';
import DeleteRole from './components/DeleteRole';

class AARole extends Component {

  componentDidMount() {
    const { getRoles, queryAllRoleTypes } = this.props;
    getRoles();
    queryAllRoleTypes();
  }
  
  render() {
    const { aaRole, addRoleModalToggle, addRole, deleteRoleModalToggle, deleteRole, updateRole, getRoles, setCurrentPage, setFormData } = this.props;
    return (
      <div className="app">
        <AddRole 
          shouldOpen={aaRole && aaRole.shouldAddRoleModalOpen} 
          toggle={addRoleModalToggle}
          addRole={addRole}
          updateRole={updateRole}
          roleAuthorities={aaRole && aaRole.roleAuthorities || []}
          formData= {aaRole && aaRole.formData}
          record={aaRole.record}
          setFormData={setFormData}
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
              <div style={{display: 'flex', flexDirection: 'row-reverse', padding: '10px 0'}}>
              <Pagination 
                total={aaRole.total}
                current={aaRole.currentPage || 1}
                pageSize={aaRole.pageSize || 20}
                onChange={(currentPage) => {
                  setCurrentPage({currentPage});
                  getRoles({
                    currentPage,
                    pageSize: 20,
                  })
                }}
              />
              </div>
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
  setCurrentPage,
  setFormData,
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