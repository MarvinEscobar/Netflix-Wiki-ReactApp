import "./Home.css";
import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../Components/Button/Button";
import EmailField from "../../Components/TextFields/EmailField";
import { Routes } from "../../Constants/Environment";

function Home() {
  const history = useHistory();
  const [newRegister, setEmail] = React.useState(null);

  function handleRegistration() {
    if (newRegister) handleNavigation(Routes.Register + "/" + newRegister);
  }

  function handleNavigation(path) {
    history.push(path);
    history.goForward();
  }

  return (
    <main className="home">
      <header className="txt-center">
        <h1>Unlimited information about the available movies on Netflix.</h1>
        <p>
          Cancel at any time.Ready? Enter your email to create or restart your
          membership.
        </p>
      </header>

      <section>
        <form onSubmit={e => {e.preventDefault(); handleRegistration();}}>
          <EmailField Placeholder="Emailaddress" OnInput={setEmail} />
          <Button Text={"Register"}  />
        </form>
      </section>
    </main>
  );
}

export default Home;
