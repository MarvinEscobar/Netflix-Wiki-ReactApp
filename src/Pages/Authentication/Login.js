import "./Login.css";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import EmailField from "../../Components/TextFields/EmailField";
import PasswordField from "../../Components/TextFields/PasswordField";
import Button from "../../Components/Button/Button";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import EditForm from "../../Components/EditForm/EditForm";
import { Routes } from "../../Constants/Environment";

function Login() {
  let history = useHistory();
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const { login, ...authState } = useContext(AuthenticationStateContext);

  useEffect(() => {
    if (authState.user) {
      handleNavigation(Routes.Browse);
    }
  });

  async function handleLogin() {
    if (email && password && login(email, password)) {
      handleNavigation(Routes.Browse);
    }
  }

  function handleNavigation(path) {
    history.push(path);
    history.goForward();
  }

  return (
    <main className="authentication">
      <header className="txt-center"></header>

      <section>
        <EditForm
          OnSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <label>Emailaddress</label>
          <EmailField Placeholder="Emailaddress" OnInput={setEmail} />

          <label>Password</label>
          <PasswordField AutoComplete="current-password" Placeholder="Password" OnInput={setPassword} />

          <Button Class="btn-primary" Text={"Login"} Type="submit" />
        </EditForm>
      </section>
    </main>
  );
}

export default Login;
