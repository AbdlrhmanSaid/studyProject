let signUpForm = document.querySelector(".signUpForm");
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
        position: "admin",
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
    window.location.reload();
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    const table = document.querySelector("table");
    if (data.length === 0) {
      const noAccountsText = document.createElement("p");
      noAccountsText.classList.add("no-news");
      noAccountsText.textContent = "No Account Found";
      table.style.display = "block";
      table.appendChild(noAccountsText);
    } else {
      data.forEach((account) => {
        const delBtn = document.createElement("button");
        delBtn.textContent = "Del";
        delBtn.classList.add("deletBtn");
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${account.name}</td>
        <td>${account.password}</td>
        <td>${account.position}</td>
        <td>${account.class}</td>
        `;
        const delCell = document.createElement("td");
        delCell.appendChild(delBtn);
        row.appendChild(delCell);
        table.appendChild(row);

        delBtn.addEventListener("click", () => {
          deletePost(account.id);
        });

        function deletePost(id) {
          fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.ok) {
                fetchPostsAndUpdateHTML();
                window.location.reload();
              } else {
                console.error("فشلت عملية حذف المنشور");
              }
            })
            .catch((error) => console.error("Error deleting post:", error));
          window.location.reload();
        }
      });
    }
  } catch (error) {
    console.error("حدث خطأ أثناء جلب البيانات:", error);
  }
});
