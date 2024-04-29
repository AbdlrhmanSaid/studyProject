document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:5000/problems");
    const data = await response.json();
    const msgs = document.querySelector(".msgs");
    if (data.length === 0) {
      const noNewsText = document.createElement("p");
      noNewsText.classList.add("no-news");
      noNewsText.textContent = "لا توجد رسائل الآن";
      msgs.style.display = "block";
      msgs.appendChild(noNewsText);
    } else {
      data.forEach((msgData) => {
        const msg = document.createElement("div");
        msg.classList.add("msg");

        const h1 = document.createElement("h1");
        h1.classList.add("name");
        h1.textContent = `الاسم : `;
        const h1Span = document.createElement("span");
        h1Span.textContent = msgData.name;
        h1.appendChild(h1Span);
        msg.appendChild(h1);

        pEmail = document.createElement("p");
        pEmail.classList.add("email");
        pEmail.textContent = `البريد : `;
        const pEmailSpan = document.createElement("span");
        pEmailSpan.textContent = msgData.email;
        pEmail.appendChild(pEmailSpan);
        msg.appendChild(pEmail);

        const h2 = document.createElement("h2");
        h2.classList.add("titleProblem");
        h2.textContent = `العنوان : `;
        const h2Span = document.createElement("span");
        h2Span.textContent = msgData.probmlemTitle;
        h2.appendChild(h2Span);
        msg.appendChild(h2);

        const pProb = document.createElement("p");
        pProb.classList.add("problem");
        pProb.textContent = `المحتوي : `;
        const pProbSpan = document.createElement("span");
        pProbSpan.textContent = msgData.problem;
        pProb.appendChild(pProbSpan);
        msg.appendChild(pProb);

        const readBtn = document.createElement("button");
        readBtn.classList.add("downBtn");
        readBtn.textContent = "تم التواصل";
        readBtn.addEventListener("click", function () {
          deletePost(msgData.id);
          window.location.reload();
        });
        msg.appendChild(readBtn);

        msgs.appendChild(msg);

        function deletePost(id) {
          fetch(`http://localhost:5000/problems/${id}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.ok) {
                fetchPostsAndUpdateHTML();
              } else {
                console.error("فشلت عملية حذف المنشور");
              }
            })
            .catch((error) => console.error("Error deleting post:", error));
        }
      });
    }
  } catch (error) {
    console.error("حدث خطأ أثناء جلب البيانات:", error);
  }
});
