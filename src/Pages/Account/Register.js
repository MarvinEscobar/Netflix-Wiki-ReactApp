import "./Account.css";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router';
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import EmailField from "../../Components/TextFields/EmailField";
import TextField from "../../Components/TextFields/TextField";
import PasswordField from "../../Components/TextFields/PasswordField";
import { Routes } from '../../Constants/Environment';
import GenderSelector from "../../Components/GenderSelector/GenderSelector";
import DateSelector from "../../Components/DateSelector/DateSelector";
import Button from "../../Components/Button/Button";
import ErrorField from "../../Components/Errorhandlers/ErrorField";
import { handleRegistrationAsync } from '../../Firebase/FirebaseEntitiesContext';
import { Firebase, RapidApi } from '../../Constants/Messages';
import EditForm from '../../Components/EditForm/EditForm';
import CountrySelector from '../../Components/CountrySelector/CountrySelector';
import { getAllCountries } from '../../Data/RapidApi';

function Register() {
  const { newemail } = useParams();
  const history = useHistory();
  const { ...authState } = useContext(AuthenticationStateContext);

  let [email, setEmail] = useState(newemail);
  let [password, setPassword] = useState(null);
  let [confirmedPassword, setConfirmedPassword] = useState(null);
  let [firstname, setFirstname] = useState(null);
  let [surname, setSurname] = useState(null);
  let [gender, setGender] = useState(null);
  let [country, setCountry] = useState(null);
  let [birthdate, setBirthdate] = useState(new Date().toISOString().slice(0, 10));
  let [errorMessage, setErrorMessage] = useState(null);
  let [countries, setCountries] = useState(null);

  const handleNavigation = useCallback((path) => {
    history.push(path);
    history.goForward();
  }, [history]);

  useEffect(() => {
    if (authState.user) {
      handleNavigation(Routes.Browse);
    } else {
      Promise.resolve(getAllCountries()).then((data) => {

        if (data?.Status === RapidApi.Succes) {
          setCountries(data.Result);
        }
      })
    }
  }, [setCountries, handleNavigation, authState.user]);

  async function handleNewRegistration() {

    let result = await Promise.resolve(handleRegistrationAsync(email, password, firstname, surname, confirmedPassword, gender, birthdate, country.country, country.countrycode, country.id));

    if (result?.Status === Firebase.Succes) {
      handleNavigation(Routes.Browse);
    }
    else {
      setErrorMessage(result?.Status);
    }
  }

  return (
    <main className="register">
      <header className="txt-center"></header>

      <section>
        <EditForm OnSubmit={e => { e.preventDefault(); handleNewRegistration(); }}>
          <EmailField Id="emailadres" Value={email} DisplayName="Emailaddress" OnInput={setEmail} />
          <PasswordField AutoComplete="new-password" Id="password" DisplayName="Password" Placeholder="Password" OnInput={setPassword} />
          <PasswordField AutoComplete="new-password" Id="confirmedPassword" DisplayName="Confirm password" Placeholder="Confirm password" OnInput={setConfirmedPassword} />
          <TextField Id="firstname" DisplayName="Firstname" Placeholder="Firstname" OnInput={setFirstname} />
          <TextField Id="surname" DisplayName="Surname" Placeholder="Surname" OnInput={setSurname} />
          <GenderSelector Id="gender" DisplayName="Gender" OnChange={setGender} />
          <DateSelector Id="birthdate" DisplayName="Birthdate" Value={birthdate} OnChange={setBirthdate} />
          <CountrySelector Id="country" DisplayName="Country" Value={country} Items={countries ?? [{}]} OnChange={setCountry} />
          <ErrorField ErrorMessage={errorMessage} />

          <Button Text={"Register"} Type={"submit"} />
        </EditForm>
      </section>
    </main>
  );
}

export default Register;
