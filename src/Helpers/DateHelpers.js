export function underAgeValidate(birthday) {
  if (!birthday) {
    return false;
  }
  // it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
  var optimizedBirthday = birthday.replace(/-/g, "/");

  //set date based on birthday at 01:00:00 hours GMT+0100 (CET)
  var myBirthday = new Date(optimizedBirthday);

  // set current day on 01:00:00 hours GMT+0100 (CET)
  var currentDate = new Date().toJSON().slice(0, 10) + " 01:00:00";

  // calculate age comparing current date and borthday
  var myAge = ~~((Date.now(currentDate) - myBirthday) / 31557600000);

  if (myAge < 12) {
    return false;
  } else {
    return true;
  }
}
