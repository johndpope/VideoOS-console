import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { createHashHistory } from "history";

import configureStore from "./configureStore";
// Styles
// bootstrap
import "venders/bootstrap/dist/css/bootstrap.min.css";
// CoreUI Icons Set
import "@coreui/icons/css/coreui-icons.min.css";
// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";

import "./App.css";

// Import Main styles for this application
import "./scss/style.css";

// layouts
import DefaultLayout from "./layouts";
// Pages
import { Login, Page404, Page500, Register } from "./pages/Pages";

// Create redux store with history
const initialState = {};
const history = createHashHistory();
const store = configureStore(initialState, history);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/login" name="登录" component={Login} />
            <Route
              exact
              path="/register"
              name="Register Page"
              component={Register}
            />
            <Route exact path="/404" name="404" component={Page404} />
            <Route exact path="/500" name="500" component={Page500} />
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
