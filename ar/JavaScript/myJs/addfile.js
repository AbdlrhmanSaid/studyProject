document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".formParent");
  const name = sessionStorage.getItem("username");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.querySelector("#fileName").value;
    const specialization = document.querySelector("#categoryName").value;
    const year = document.querySelector("#year").value;
    const fileInput = document.querySelector("#fileInput");
    const file = fileInput.files[0];

    if (!name) {
      console.error("User Name is not exist!");
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      const imgBase64 = reader.result;
      const postData = {
        name: name,
        title: title,
        specialization: specialization,
        studyYear: year,
        img: "imgs/pdf.svg",
        link: imgBase64,
      };

      fetch("http://localhost:5000/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          if (response.ok) {
            window.location.reload();
          } else {
            console.error("فشلت عملية إرسال البيانات");
          }
        })
        .catch((error) => {
          console.error("حدث خطأ أثناء إرسال البيانات:", error);
        });
    };

    if (file && file.size > 0) {
      reader.readAsDataURL(file);
    } else {
      reader.onload();
    }
  });
});
///////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:5000/files");
    const data = await response.json();
    const filesContent = document.querySelector(".files-content");
    if (data.length === 0) {
      const noNewsText = document.createElement("p");
      noNewsText.classList.add("no-news");
      noNewsText.textContent = "لا يوجد ملفات!";
      filesContent.style.display = "block";
      filesContent.appendChild(noNewsText);
    } else {
      data.forEach((file) => {
        const fileDiv = document.createElement("div");
        fileDiv.classList.add(
          "file",
          "bg-white",
          "p-10",
          "rad-10",
          "p-relative"
        );

        const aLink = document.createElement("a");
        aLink.href = file.link;
        aLink.download = file.link;
        aLink.target = "_blank";
        const Iicon = document.createElement("i");
        Iicon.classList.add("fas", "fa-download", "c-blue", "p-absolute");
        aLink.appendChild(Iicon);
        fileDiv.appendChild(aLink);

        const closeBtn = document.createElement("button");
        closeBtn.classList.add("close-btn");
        closeBtn.textContent = "X";
        closeBtn.addEventListener("click", () => {
          deletePost(file.id);
        });
        fileDiv.appendChild(closeBtn);

        const icon = document.createElement("div");
        icon.classList.add("icon", "txt-c");
        const img = document.createElement("img");
        img.classList.add("mt-15", "mb-15");
        img.src = "imgs/pdf.svg";
        icon.appendChild(img);
        fileDiv.appendChild(icon);

        const div = document.createElement("div");
        div.classList.add("txt-c", "mb-10", "fs-14");
        div.textContent = file.title;
        fileDiv.appendChild(div);

        const pName = document.createElement("p");
        pName.classList.add("c-grey", "fs-13");
        pName.textContent = `الاسم:  ${file.name}`;
        const p = document.createElement("p");
        p.classList.add("c-grey", "fs-13");
        p.textContent = `القسم : ${file.specialization}`;
        fileDiv.appendChild(pName);
        fileDiv.appendChild(p);

        const divDate = document.createElement("div");
        divDate.classList.add(
          "info",
          "between-flex",
          "mt-10",
          "pt-10",
          "fs-13",
          "c-grey"
        );
        const spanDate = document.createElement("span");
        spanDate.textContent = file.studyYear;
        divDate.appendChild(spanDate);
        fileDiv.appendChild(divDate);

        filesContent.appendChild(fileDiv);

        function deletePost(id) {
          fetch(`http://localhost:5000/files/${id}`, {
            method: "DELETE",
          }).then((response) => {
            if (response.ok) {
              fetchPostsAndUpdateHTML();
              window.location.reload();
            } else {
              console.error("فشلت عملية حذف المنشور");
            }
          });
          window.location
            .reload()
            .catch((error) => console.error("Error deleting post:", error));
        }
      });
    }
  } catch (error) {
    console.error("حدث خطأ أثناء جلب البيانات:", error);
  }
});
