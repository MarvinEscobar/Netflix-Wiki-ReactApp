import "./TopMenu.css";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../Resources/Images/Logo.svg";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import { Routes } from '../../Constants/Environment';
import Navbar from './Navbar';

function TopMenu() {
  const history = useHistory();
  const { ...authState } = useContext(AuthenticationStateContext);

  useEffect(() => {
    if (authState.user) {
      handleNavigation(Routes.Browse);
    }
  });

  function handleNavigation(path) {
    history.push(path);
    history.goForward();
  }

  return (
    <div className="topmenu">
      <div
        className="logo-area"
        onClick={() => handleNavigation(authState.user ? Routes.Browse : Routes.Home)}
      >
        <img src={Logo} className="App-logo" alt="logo" />
      </div>
      <Navbar />
    </div>
  );
}

export default TopMenu;
