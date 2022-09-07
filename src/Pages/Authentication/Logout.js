import "./Login.css";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import { Routes } from "../../Constants/Environment";

function Login() {
  let history = useHistory();
  const { logout } = useContext(AuthenticationStateContext);

  useEffect(() => {
    logout();
    handleNavigation(Routes.Login);
  });

  function handleNavigation(path) {
    history.push(path);
    history.goForward();
  }

  return (
    <main className="authentication">
      <header className="txt-center"></header>
      <section>
        <p>pending</p>
      </section>
    </main>
  );
}

export default Login;
