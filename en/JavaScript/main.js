// mobile menu
document.addEventListener("DOMContentLoaded", function () {
  var button = document.querySelector(".mobile-header .container .menu-btn");
  var menu = document.querySelector(".mobile-header .container nav");

  button.addEventListener("click", function () {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  });

  document.addEventListener("click", function (event) {
    var isClickInside =
      menu.contains(event.target) || button.contains(event.target);
    if (!isClickInside) {
      menu.style.display = "none";
    }
  });
});

const username = sessionStorage.getItem("username");
let loginBtn = document.querySelector(".login-btn");
let adminUser = sessionStorage.getItem("admin");
let fixedBtn = document.querySelector(".fixedBtn");
let fixedBtnUsers = document.querySelector(".fixedBtnUsers");
let loginBtnSM = document.querySelector(".login-btnSM");

if (username !== null && username !== "") {
  loginBtn.innerHTML = "Log Out";
  loginBtnSM.innerHTML = "Log Out";
} else {
  loginBtn.innerHTML = "login";
  loginBtnSM.innerHTML = "login";
}

loginBtn.addEventListener("click", () => {
  if (username !== null) {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("admin");
    sessionStorage.removeItem("userid");
    loginBtn.innerHTML = "login";
    loginBtnSM.innerHTML = "login";
  }
});

if (adminUser === "admin") {
  fixedBtn.style.display = "block";
  fixedBtnUsers.style.display = "block";
} else if (adminUser === "normal") {
  fixedBtnUsers.style.display = "block";
}
