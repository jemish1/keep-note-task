window.onload = function () {
  if (
    localStorage.getItem("email") == null &&
    localStorage.getItem("password") == null
  ) {
    window.location.href = "Login.html";
  }
};

document.getElementById("displayName").innerText =
  "Name: " + localStorage.getItem("name");
document.getElementById("displayEmail").innerText =
  "Email: " + localStorage.getItem("email");
document.getElementById("displayMobile").innerText =
  "Mobile Number: " + localStorage.getItem("mobile");
document.getElementById("displayGender").innerText =
  "Gender: " + localStorage.getItem("gender");
document.getElementById("displayDOB").innerText =
  "DOB: " + localStorage.getItem("date");

function changeToEdit() {
  document.getElementById("card-format").style.display = "none";
  document.getElementById("visible").style.display = "flex";
}

function isValidEmail(email) {
  const regexEmail = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

  return regexEmail.test(email);
}

function isValidMobileNum(num) {
  return num.toString().length == 10;
}

function changeUserData() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobileNumber = document.getElementById("mobile").value;
  const date = document.getElementById("date").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const err = document.getElementById("err");

  if (
    name == "" ||
    email == "" ||
    date == "" ||
    mobileNumber == "" ||
    gender.value == ""
  ) {
    err.innerText = "Please fill out Empty field.";

    setTimeout(() => {
      err.innerText = "";
    }, 5000);
  } else {
    if (isValidEmail(email)) {
      localStorage.setItem("email", email);
    } else {
      err.innerText = "Email is InValid";
    }

    if (name && isValidMobileNum(mobileNumber) && gender.value && date) {
      localStorage.setItem("name", name);
      localStorage.setItem("mobile", mobileNumber);
      localStorage.setItem("gender", gender.value);
      localStorage.setItem("date", date);
    }

    location.reload();
    document.getElementById("card-format").style.display = "flex";
    document.getElementById("visible").style.display = "none";
  }
}
