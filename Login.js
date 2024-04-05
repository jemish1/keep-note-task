function validateAndLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const checkEmail = localStorage.getItem("email");
  const checkPassword = localStorage.getItem("password");

  const err = document.getElementById("err");

  if (email == "" || password == "") {
    err.innerText = "Please fill out Empty field.";

    setTimeout(() => {
      err.innerText = "";
    }, 5000);
  } else {
    if (email === checkEmail && password === checkPassword) {
      window.location.href = "Dashbord.html";
    } else {
      err.innerText = "Email or Password is Incorrect";
    }
  }
}
