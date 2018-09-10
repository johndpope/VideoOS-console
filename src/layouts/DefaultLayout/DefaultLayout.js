import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { createHashHistory } from 'history';
import {
  AppBreadcrumb,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import { getAuthority } from 'utils/authority';
// sidebar nav config
import menuConfig from '../../menuConfig';
// routes config
import routerConfig from '../../routerConfig';
// import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import Welcome from './Welcome';

const history = createHashHistory();

class DefaultLayout extends Component {
  render() {
    const isAuthorized = getAuthority();
    if (!Boolean(isAuthorized)) {
      history.push('/login');
    }
    const { pathname } = this.props.location;
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={menuConfig} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main"> 
            {
              pathname === '/home' ? <Welcome /> : null
            }
            
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
