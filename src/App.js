import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopMenu from "./Components/TopMenu/TopMenu";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Account/Register";
import Browse from "./Pages/Browse/Browse";
import AccountDelete from "./Pages/Account/AccountDelete";
import Login from "./Pages/Authentication/Login";
import Logout from "./Pages/Authentication/Logout";
import PasswordUpdate from "./Pages/Account/PasswordUpdate";
import Profile from "./Pages/Account/Profile";
import ProductDetails from "./Pages/Browse/ProductDetails";
import Search from "./Pages/Browse/Search";
import {Routes} from './Constants/Environment';

function App() {
  return (
    <Router>
      <TopMenu />
      <Switch>
        <Route exact path={Routes.Home}>
          <Home />
        </Route>
        <Route path={Routes.RegisterParams} >
          <Register />
        </Route>
        <Route exact path={Routes.Browse}>
          <Browse />
        </Route>
        <Route path={Routes.AccountDelete}>
          <AccountDelete />
        </Route>
        <Route path={Routes.Login}>
          <Login />
        </Route>
        <Route path={Routes.Logout}>
          <Logout />
        </Route>
        <Route path={Routes.Profile}>
          <Profile />
        </Route>
        <Route path={Routes.PasswordUpdate}>
          <PasswordUpdate/>
        </Route>
        <Route path={Routes.Search}>
          <Search/>
        </Route>
        <Route path={Routes.ProductDetails}>
          <ProductDetails/>
        </Route>
      </Switch>
      <footer className="txt-center">Deze web aplicatie is in opdracht van Novi hogeshool gemaakt.</footer>
    </Router>
  );
}

export default App;
