export const Tables = {
  Accounts: "Accounts",
  Countries: "Countries",
};

export class Account {
  constructor(firstname, surname, gender, birthdate) {
    this.Firstname = firstname;
    this.Surname = surname;
    this.Gender = gender;
    this.Birthdate = birthdate;
  }
}

export class Country {
  constructor(country, countrycode, id) {
    this.Country = country;
    this.Countrycode = countrycode;
    this.Id = id;
  }
}

export class Result {
  constructor(result, status) {
    this.Result = result;
    this.Status = status;
  }
}