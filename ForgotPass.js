function chengePassword() {
  const email = document.getElementById("email").value;

  const password1 = document.getElementById("password1").value;
  const password2 = document.getElementById("password2").value;

  const err = document.getElementById("err");

  if (email == "" || password1 == "" || password2 == "") {
    err.innerText = "Please fill out Empty field";

    setTimeout(() => {
      err.innerText = "";
    }, 5000);
  } else if (email == localStorage.getItem("email") && password1 == password2) {
    const isvalidPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(
        password1
      );

    isvalidPass ? localStorage.setItem("password", password1) : null;

    window.location.href = "Login.html";
  } else {
    err.innerText = "Both password are not the Same or Invalid Email Id";
  }
}
