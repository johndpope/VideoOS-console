import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import { createHashHistory } from "history";
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
// sidebar nav config
import menuConfig from "../../menuConfig";
// routes config
import routerConfig from "../../routerConfig";
// import DefaultFooter from './DefaultFooter';
import DefaultHeader from "./DefaultHeader";
import Welcome from "./Welcome";

const history = createHashHistory();

class DefaultLayout extends Component {
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
            if (authorList.includes(mcd.id)) {
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

            <AppBreadcrumb appRoutes={routerConfig} />
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

export default DefaultLayout;
