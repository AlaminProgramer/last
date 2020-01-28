
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PrivateRoute from "./components/common/PrivateRoute";

import AdminLayout from "./layouts/Admin/Admin.jsx";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from './components/Home.jsx'
import Header from './components/Navbars/Header.jsx'
import "./assets/scss/black-dashboard-react.scss";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";

import UserProfile from './views/UserProfile'
import chagePassword from './components/chagePassword'







import PageNotFound from './components/PageNotFound'

const hist = createBrowserHistory();

const token=localStorage.getItem('token')
ReactDOM.render(
  <Router history={hist}>
    <div>
      <Header />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path ="/profile" component={UserProfile} />
        <Route path ="/changePassword" component={chagePassword} />
        <ProtectedRoute path="/" exact component={Home} />
        <PrivateRoute path="/admin" component={AdminLayout} />
        <Route path="/" component={PageNotFound} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);
