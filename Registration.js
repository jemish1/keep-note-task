function isVAlidPass(pw) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(
    pw
  );
}

function isValidEmail(email) {
  const regexEmail = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

  return regexEmail.test(email);
}

function isValidMobileNum(num) {
  return num.toString().length == 10;
}

function handleFormValidation() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobileNumber = document.getElementById("mobile").value;
  const password = document.getElementById("password").value;
  const date = document.getElementById("date").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const err = document.getElementById("err");

  if (
    name == "" ||
    email == "" ||
    date == "" ||
    mobileNumber == "" ||
    password == "" ||
    gender == ""
  ) {
    err.innerText = "Please fill out Empty field.";

    setTimeout(() => {
      err.innerText = "";
    }, 5000);
  } else {
    if (isValidEmail(email) && isVAlidPass(password)) {
      localStorage.setItem("email", email);

      localStorage.setItem("password", password);

      if (localStorage.getItem("email") && localStorage.getItem("password")) {
        window.location.href = "Login.html";
      }
    } else {
      err.innerText =
        "Email is InValid or Password must contain at least one number,one special, one lowercase, one uppercase, and be at least 8 characters long";
    }

    if (name && isValidMobileNum(mobileNumber) && gender && date) {
      localStorage.setItem("name", name);
      localStorage.setItem("mobile", mobileNumber);
      localStorage.setItem("gender", gender);
      localStorage.setItem("date", date);
    }
  }
}
