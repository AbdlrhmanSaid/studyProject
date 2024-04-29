document.addEventListener("DOMContentLoaded", function () {
  let signUpForm = document.querySelector(".signUpForm");
  let couresName = document.querySelector("#couresName");
  let descripe = document.querySelector("#decs");
  let linkInput = document.querySelector("#link");

  signUpForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const title = couresName.value;
    const description = descripe.value;
    const link = linkInput.value;
    const fileInput = document.querySelector("#fileInput");
    const file = fileInput.files[0];

    const reader = new FileReader();

    reader.onload = async function () {
      const imgBase64 = reader.result;

      const postData = {
        title: title,
        discription: description,
        link: link,
        img: imgBase64 || null,
      };

      try {
        const response = await fetch("http://localhost:5000/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
        if (response.ok) {
          console.log("تم إرسال البيانات بنجاح!");
        } else {
          console.error("فشلت عملية إرسال البيانات");
        }
      } catch (error) {
        console.error("حدث خطأ أثناء إرسال البيانات:", error);
      }
    };
    if (file && file.size > 0) {
      reader.readAsDataURL(file);
    } else {
      reader.onload();
    }
  });
});

document.addEventListener("DOMContentLoaded", async function () {
  const coursesPage = document.querySelector(".content .courses-page");
  try {
    const response = await fetch("http://localhost:5000/courses");
    const data = await response.json();
    if (data.length === 0) {
      const noCoursesText = document.createElement("p");
      noCoursesText.classList.add("no-news");
      noCoursesText.textContent = "No Courses Exist! ";
      coursesPage.appendChild(noCoursesText);
    } else {
      data.forEach((course) => {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course", "bg-white", "rad-6", "p-relative");

        const courseImg = document.createElement("img");
        courseImg.classList.add("cover");
        courseImg.src = course.img;
        courseImg.alt = "";

        const courseBody = document.createElement("div");
        courseBody.classList.add("p-20", "linkCours");

        const courseTitle = document.createElement("h4");
        courseTitle.classList.add("m-0");
        courseTitle.innerHTML = course.title;

        const courseDescription = document.createElement("p");
        courseDescription.classList.add(
          "description",
          "c-grey",
          "mt-15",
          "fs-14"
        );
        courseDescription.innerHTML = course.discription;

        const courseLink = document.createElement("a");
        courseLink.target = "_blank";
        courseLink.href = course.link;

        const courseLinkSpan = document.createElement("span");
        courseLinkSpan.classList.add(
          "title",
          "bg-blue",
          "c-white",
          "btn-shape"
        );
        courseLinkSpan.textContent = "Course Link";

        const deleteBtnDiv = document.createElement("div");
        deleteBtnDiv.classList.add("del-btn", "p-15");

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn-shape", "deleteBtn");
        deleteBtn.textContent = "Del Course";
        deleteBtn.addEventListener("click", function () {
          deletePost(course.id);
        });

        courseLink.appendChild(courseLinkSpan);
        courseBody.appendChild(courseTitle);
        courseBody.appendChild(courseDescription);
        courseBody.appendChild(courseLink);
        deleteBtnDiv.appendChild(deleteBtn);

        courseDiv.appendChild(courseImg);
        courseDiv.appendChild(courseBody);
        courseDiv.appendChild(deleteBtnDiv);

        coursesPage.appendChild(courseDiv);
      });
    }
  } catch (error) {
    console.error("حدث خطأ أثناء جلب البيانات:", error);
  }
});

function deletePost(courseId) {
  fetch(`http://localhost:5000/courses/${courseId}`, {
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

function fetchPostsAndUpdateHTML() {}
