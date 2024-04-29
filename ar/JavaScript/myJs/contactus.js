document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".formParent");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const firstName = document.querySelector(".firstName");
    const lastName = document.querySelector(".lastName");
    const totalName = `${firstName.value} ${lastName.value}`;
    const email = document.querySelector(".email");
    const probmlemTitle = document.querySelector(".probmlemTitle");
    const textProblem = document.querySelector(".textProblem");

    const postData = {
      name: totalName,
      email: email.value,
      probmlemTitle: probmlemTitle.value,
      problem: textProblem.value,
    };
    fetch("http://localhost:5000/problems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("تم إرسال البيانات بنجاح!");
        } else {
          console.error("فشلت عملية إرسال البيانات");
        }
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء إرسال البيانات:", error);
      });
    window.location.reload();
  });
});
