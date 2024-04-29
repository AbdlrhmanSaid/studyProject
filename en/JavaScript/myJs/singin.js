let loginForm = document.querySelector(".loginForm");
let pwdInput = document.querySelector("#pwd");
let usnInput = document.querySelector("#usn");
let signBtn = document.querySelector("#signBtn");
let error = document.querySelector(".error");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
});

let position;

async function checkData() {
  const response = await fetch("http://localhost:5000/users");
  const data = await response.json();
  signBtn.addEventListener("click", function () {
    let validCredentials = false;
    for (const user of data) {
      if (usnInput.value === user.name && pwdInput.value === user.password) {
        validCredentials = true;
        sessionStorage.setItem("userid", user.id);
        position = user.position;
        break;
      }
    }
    if (validCredentials) {
      window.location.href = "index.html";
      sessionStorage.setItem("username", usnInput.value);
      usnInput.value = "";
      pwdInput.value = "";
      if (position === "admin") {
        window.location.href = "admin-dashboard.html";
        sessionStorage.setItem("admin", position);
      } else {
        sessionStorage.setItem("admin", position);
        window.location.href = "courses.html";
      }
    } else {
      error.style.display = "block";
    }
  });
}

checkData();
