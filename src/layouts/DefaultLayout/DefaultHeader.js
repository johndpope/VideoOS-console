import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import { userLogout, resetPasswordModalToggle } from './actions';
import reducer from './reducer';
import logo from '../../assets/img/brand/logo.svg';
import sygnet from '../../assets/img/brand/sygnet.svg';
import PasswordReset from './PasswordReset'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { dHeader, resetPasswordModalToggle, userLogout, children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <PasswordReset 
          toggle={resetPasswordModalToggle}
          shouldOpen={dHeader && dHeader.shouldPasswordResetModalOpen}
        />
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'os-console Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'os-console Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src="assets/img/avatars/6.jpg" className="img-avatar" alt="admin" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={resetPasswordModalToggle}><i className="fa fa-lock" /> 修改密码</DropdownItem>
              <DropdownItem onClick={userLogout}><i className="fa fa-unlock" /> 退出登录</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-lg-none" mobile /> */}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  userLogout,
  resetPasswordModalToggle,
};
  
const mapStateToProps = (state) => {
  return {};
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'dHeader', reducer });

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default compose(
  withReducer,
  withConnect
)(DefaultHeader);
