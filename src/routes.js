import React from "react";
import App from "./containers/AppContainer";
import About from "./components/About/About";
import Login from "./components/Login/login";
import Registration from "./components/Registration/registration";

import {BrowserRouter as Router, Route} from "react-router-dom";

const Routes = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Registration} />
        <Route exact path="/about" component={About} />
      </div>
    </Router>
  );
};

export default Routes;
