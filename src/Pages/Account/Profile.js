import "./Account.css";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import TextField from "../../Components/TextFields/TextField";
import { Routes } from '../../Constants/Environment';
import GenderSelector from "../../Components/GenderSelector/GenderSelector";
import DateSelector from "../../Components/DateSelector/DateSelector";
import Button from "../../Components/Button/Button";
import ErrorField from "../../Components/Errorhandlers/ErrorField";
import { updateAccountAsync, getAccount } from '../../Firebase/FirebaseEntitiesContext';
import { getAllCountries } from '../../Data/RapidApi';
import { Firebase } from '../../Constants/Messages';
import EditForm from '../../Components/EditForm/EditForm';
import CountrySelector from '../../Components/CountrySelector/CountrySelector';
import CustomLink from '../../Components/Base/CustomLink';
import { RapidApi } from '../../Constants/Messages';

function Profile() {
  const history = useHistory();
  const { logout, ...authState } = useContext(AuthenticationStateContext);

  let [firstname, setFirstname] = useState(null);
  let [surname, setSurname] = useState(null);
  let [gender, setGender] = useState(null);
  let [countrycode, setCountryCode] = useState(null);
  let [birthdate, setBirthdate] = useState(null);
  let [errorMessage, setErrorMessage] = useState(null);
  let [countries, setCountries] = useState(null);

  const handleNavigation = useCallback((path) => {
    history.push(path);
    history.goForward();
  }, [history]);

  useEffect(() => {
    if (!authState?.user?.uid) {
      handleNavigation(Routes.Login);
    }
    else if (!firstname && !surname && !gender && !birthdate && !countrycode) {
      getAccount(authState.user.uid).then((response) => {

        if (response?.Result && response?.Status === Firebase.Succes) {
          let account = response.Result;
          setFirstname(account.firstname);
          setSurname(account.surname);
          setGender(account.gender);
          setBirthdate(account.birthdate);
          setCountryCode(account.countrycode);
        }
      });
      
      Promise.resolve(getAllCountries()).then((data) => {
        if (data.Status === RapidApi.Succes) {
          setCountries(data.Result);
        }
      });
    }
  }, [countries, authState, birthdate, countrycode, firstname, gender, surname, handleNavigation]);

  async function handleUpdate() {
    if (
      window.confirm(
        "Are you sure you want to proceed?"
      )) {
      let result = Promise.resolve(updateAccountAsync(authState?.user?.uid, firstname, surname, gender, birthdate, countrycode));

      if (result?.Status === Firebase.Succes) {
        alert("Your profile has been succesfully updated.");
        handleNavigation(Routes.Browse);
      }
      else {
        setErrorMessage(result?.Status);
      }
    }
  }

  return (
    <main className="account">
      <header className="txt-center"></header>
      <section>
        <EditForm OnSubmit={e => { e.preventDefault(); handleUpdate(); }}>
          <TextField Id="firstname" DisplayName="Firstname" Placeholder="Firstname" Value={firstname} OnInput={setFirstname} />
          <TextField Id="surname" DisplayName="Surname" Placeholder="Surname" Value={surname} OnInput={setSurname} />
          <GenderSelector Id="gender" DisplayName="Gender" Value={gender} OnChange={setGender} />
          <DateSelector Id="birthdate" DisplayName="Birthdate" Value={birthdate} OnChange={setBirthdate} />
          <CountrySelector Id="country" DisplayName="Country" Value={countrycode} Items={countries} OnChange={setCountryCode} />
          <Button Text={"Change password"} Type={"button"} OnClick={() => handleNavigation(Routes.PasswordUpdate)} />
          <Button Text={"Update"} Type={"submit"} />
          <CustomLink Title="Delete account" To={Routes.AccountDelete} />
          <ErrorField ErrorMessage={errorMessage} />
          <Button Text={"Back"} Type="button" OnClick={() => history.goBack()} />
        </EditForm>
      </section>
    </main>
  );
}

export default Profile;