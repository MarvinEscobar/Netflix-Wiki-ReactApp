import "./Account.css";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import PasswordField from "../../Components/TextFields/PasswordField";
import { Routes } from "../../Constants/Environment";
import Button from "../../Components/Button/Button";
import ErrorField from "../../Components/Errorhandlers/ErrorField";
import {
  changePassword,
  loginAsync,
} from "../../Firebase/FirebaseEntitiesContext";
import { Firebase } from "../../Constants/Messages";
import EditForm from "../../Components/EditForm/EditForm";
import EmailField from "../../Components/TextFields/EmailField";

function PasswordUpdate() {
  const history = useHistory();
  const { logout, ...authState } = useContext(AuthenticationStateContext);

  let [currentPassword, setCurrentPassword] = useState(null);
  let [newPassword, setNewPassword] = useState(null);
  let [confirmedPassword, setConfirmedPassword] = useState(null);
  let [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!authState.user) {
      handleNavigation(Routes.Login);
    }
  });

  async function handleUpdate() {
    
    setErrorMessage(null);
    if (
      window.confirm(
        "Are you sure you want to proceed?"
      )
    ) {
      let response = await Promise.resolve(loginAsync(authState.user.email, currentPassword));
      
      if (response.Result && response.Status === Firebase.Succes) {
        let result = await Promise.resolve(
          changePassword(authState.user, newPassword, confirmedPassword)
        );

        if (result?.Status === Firebase.Succes) {
          alert("Your password has been succesfully updated.");
          handleNavigation(Routes.Browse);
        } else {
          setErrorMessage(result?.Status);
        }
      }else{
        setErrorMessage(response?.Status);
      }
    }
  }

  function handleNavigation(path) {
    history.push(path);
    history.goForward();
  }

  return (
    <main className="account">
      <header className="txt-center"></header>

      <section>
        <EditForm
          OnSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          
          <EmailField Id="emailadres" Value={authState?.user?.email} DisplayName="Emailaddress"  Disabled={true}/>
          <PasswordField
            Id="current-password"
            AutoComplete="current-password"
            DisplayName="Current password"
            Placeholder="Current password"
            OnInput={setCurrentPassword}
          />
          <PasswordField
            Id="new-password"
            AutoComplete="new-password"
            DisplayName="Password"
            Placeholder="Password"
            OnInput={setNewPassword}
          />
          <PasswordField
            Id="confirmed-password"
            AutoComplete="new-password"
            DisplayName="Confirm password"
            Placeholder="Confirm password"
            OnInput={setConfirmedPassword}
          />
          <ErrorField ErrorMessage={errorMessage} />

          <Button Text={"Update"} Type={"submit"} />
          <Button Text={"Back"} Type="button" OnClick={() => history.goBack()} />
        </EditForm>
      </section>
    </main>
  );
}

export default PasswordUpdate;
