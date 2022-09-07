import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import {
  loginAsync,
  logoutAsync
} from "../Firebase/FirebaseEntitiesContext";
import { Firebase } from "../Constants/Messages";
import { StatusCode } from "../Constants/Environment";

export const AuthenticationStateContext = createContext(null);

function AuthenticationStateProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    status: StatusCode.Pending,
  });

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({
          user: user,
          status: StatusCode.Done,
        });
      } else {
        setAuthState({
          user: null,
          status: StatusCode.Done,
        });
      }
    });
  }, []);

  async function login(email, password) {
    setAuthState({
      user: null,
      status: StatusCode.Pending,
    });

    let result = await Promise.resolve(loginAsync(email, password));

    if (result?.Status === Firebase.Succes) {
      setAuthState({
        user: result.Result,
        status: result.Status,
      });
      return true;
    }

    setAuthState({
      user: null,
      status: StatusCode.Done,
    });
    return true;
  }

  async function logout() {
    let result = await Promise.resolve(logoutAsync());

    if (result) {
      setAuthState({
        user: null,
        status: StatusCode.Done,
      });
      return true;
    } else {
      return false;
    }
  }

  const data = {
    ...authState,
    login: login,
    logout: logout,
  };

  return (
    <AuthenticationStateContext.Provider value={data}>
      {authState.status === StatusCode.Pending ? <p>Loading...</p> : children}
    </AuthenticationStateContext.Provider>
  );
}

export default AuthenticationStateProvider;
