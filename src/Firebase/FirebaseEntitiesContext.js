import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  getAuth,
  signOut,
  onAuthStateChanged,
  updatePassword
} from "firebase/auth";
import { auth, db } from "./Firebase";
import { doc, setDoc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { Tables, Result } from "./FirebaseEntities";
import { underAgeValidate } from "../Helpers/DateHelpers";
import { Error, Firebase } from "../Constants/Messages";

export async function handleRegistrationAsync(
  email,
  password,
  firstname,
  surname,
  confirmedPassword,
  gender,
  birthdate,
  country
) {
  if (
    !email ||
    !password ||
    !firstname ||
    !surname ||
    !confirmedPassword ||
    !gender ||
    gender === '' ||
    !birthdate ||
    !country ||
    country === ''
  )
    return new Result(null, Error.AllFieldsRequired);

  if (password !== confirmedPassword)
    return new Result(null, Error.ConfirmedPasswordDoesNotMatch);

  if (!underAgeValidate(birthdate)) return new Result(null, Error.AgeLimition);

  return await Promise.resolve(
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await setDoc(doc(db, Tables.Account, user.uid), {
          firstname,
          surname,
          gender,
          birthdate,
          country,
        });
        return new Result(user, Firebase.Succes);
      })
      .catch((error) => {
        let message = ReadFireBaseErrorCode(error.code);
        return new Result(null, message);
      })
  );
}

export async function loginAsync(email, password) {
  const auth = getAuth();
  return await Promise.resolve(
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return new Result(user, Firebase.Succes);
      })
      .catch((error) => {
        let message = ReadFireBaseErrorCode(error.code);
        return new Result(null, message);
      })
  );
}

export async function logoutAsync() {
  const auth = getAuth();
  return await Promise.resolve(
    await signOut(auth)
      .then(() => {
        return new Result(true, Firebase.Succes);
      })
      .catch((error) => {
        let message = ReadFireBaseErrorCode(error.code);
        return new Result(false, message);
      })
  );
}

export async function deleteAsync(user) {
  return await Promise.resolve(
    await deleteUser(user)
      .then(async () => {
        await deleteDoc(doc(db, Tables.Account, user.uid));
        return new Result(true, Firebase.Succes);
      })
      .catch((error) => {
        let message = ReadFireBaseErrorCode(error.code);
        return new Result(false, message);
      })
  );
}

export function getAuthState() {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      return user;
    } else {
      return null;
    }
  });
}

export async function getAccount(uid) {
  try {
    const docRef = doc(db, Tables.Account, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return new Result(docSnap.data(), Firebase.Succes);
    } else {
      return new Result(null, Firebase.Default);
    }
  } catch (error) {
    let message = ReadFireBaseErrorCode(error.code);
    return new Result(null, message);
  }
}

export async function updateAccountAsync(
  uid,
  firstname,
  surname,
  gender,
  birthdate,
  country
) {
  try {

    if (
      !firstname ||
      !surname ||
      !gender ||
      gender === '' ||
      !birthdate ||
      !country ||
      country === ''
    )
      return new Result(null, Error.AllFieldsRequired);

    if (!underAgeValidate(birthdate)) return new Result(null, Error.AgeLimition);

    const docRef = doc(db, Tables.Account, uid);
    await updateDoc(docRef, {
      firstname,
      surname,
      gender,
      birthdate,
      country,
    });
    return new Result(true, Firebase.Succes);
  } catch (error) {
    let message = ReadFireBaseErrorCode(error.code);
    return new Result(false, message);
  }
}


export async function changePassword(user, newPassword, confirmedPassword) {

  if (newPassword !== confirmedPassword)
    return new Result(null, Error.ConfirmedPasswordDoesNotMatch);

  return await Promise.resolve(
    await updatePassword(user, newPassword)
      .then(async () => {

        return new Result(true, Firebase.Succes);
      })
      .catch((error) => {
        let message = ReadFireBaseErrorCode(error.code);
        return new Result(false, message);
      })
  );
}

function ReadFireBaseErrorCode(errorCode) {
  if (!errorCode) return Firebase.Default;

  return errorCode.replace(Firebase.Prefix, "").split("-").join(" ");
}
