import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import injectReducer from "utils/injectReducer";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import { createHashHistory } from "history";
import * as actions from "./actions";
import {
  AppBreadcrumb,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
import { getAuthority, getUserInfoLocal } from "utils/authority";
import reducer from "./reducer";
// sidebar nav config
import menuConfig from "../../menuConfig";
// routes config
import routerConfig from "../../routerConfig";
// import DefaultFooter from './DefaultFooter';
import DefaultHeader from "./DefaultHeader";
import Welcome from "./Welcome";

const history = createHashHistory();

class DefaultLayout extends Component {
  componentDidMount() {
    const { isTokenValid } = this.props;
    isTokenValid();
  }

  componentWillReceiveProps() {
    const { isTokenValid } = this.props;
    isTokenValid();
  }

  render() {
    const _menuConfig = { items: [] };
    const isAuthorized = getAuthority();
    if (!Boolean(isAuthorized)) {
      history.push("/login");
    }
    const { pathname } = this.props.location;
    const { authorList } = getUserInfoLocal();
    menuConfig &&
      Array.isArray(menuConfig.items) &&
      menuConfig.items.forEach((mc, idx) => {
        if (mc.external) {
          _menuConfig.items.push(mc);
        }
        if (mc.children) {
          const tmpChildren = [];
          mc.children.forEach((mcd, mIdx) => {
            if (authorList && authorList.includes(mcd.id)) {
              tmpChildren.push(mcd);
            }
          });
          if (tmpChildren.length > 0) {
            _menuConfig.items.push({
              id: mc.id,
              name: mc.name,
              path: mc.path,
              icon: mc.icon,
              readOnly: mc.readOnly || false,
              children: tmpChildren
            });
          }
        }
      });
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={_menuConfig} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {pathname === "/home" ? <Welcome /> : null}

            {pathname !== "/home" ? (
              <AppBreadcrumb appRoutes={routerConfig} />
            ) : null}
            <Container fluid>
              <Switch>
                {routerConfig.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/home" />
              </Switch>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

// export default DefaultLayout;
const mapDispatchToProps = {
  ...actions
};

const mapStateToProps = state => {
  return {
    dHeader: state.dHeader
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "dHeader", reducer });

export default compose(
  withReducer,
  withConnect
)(DefaultLayout);
