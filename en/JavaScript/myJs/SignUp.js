سlet signUpForm = document.querySelector(".signUpForm");
let usinput = document.querySelector("#usn");
let classinput = document.querySelector("#cat");
let psinput = document.querySelector("#pwd");

signUpForm.addEventListener("submit", (e) => {
  let totalName = `${document.querySelector("#usnFirst").value} ${
    document.querySelector("#usnSecond").value
  } ${document.querySelector("#usnFamily").value}`;
  e.preventDefault();

  if (totalName == "" || psinput.value == "" || classinput.value == "") {
    console.log("Error: Please fill in all fields");
  } else {
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: totalName,
        password: psinput.value,
        class: classinput.value,
        position: "normal",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
    window.location.href = "sign.html";
  }
});
