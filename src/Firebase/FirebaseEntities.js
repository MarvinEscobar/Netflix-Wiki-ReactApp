export const Tables = {
  Account: "Account",
};

export class Account {
  constructor(firstname, surname, gender, birthdate) {
    this.Firstname = firstname;
    this.Surname = surname;
    this.Gender = gender;
    this.Birthdate = birthdate;
  }
}

export class Result {
  constructor(result, status) {
    this.Result = result;
    this.Status = status;
  }
}