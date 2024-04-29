document.addEventListener("DOMContentLoaded", async function () {
  const coursesPage = document.querySelector(".courses-page");
  try {
    const response = await fetch("http://localhost:5000/courses");
    const data = await response.json();

    if (data.length === 0) {
      const noNewsText = document.createElement("p");
      noNewsText.classList.add("no-news");
      noNewsText.textContent = "لا توجد كورسات الآن";
      coursesPage.appendChild(noNewsText);
    } else {
      data.forEach((course) => {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course", "bg-white", "rad-6", "p-relative");
        const courseImg = document.createElement("img");
        courseImg.classList.add("cover");
        courseImg.src = course.img;
        if (course.img === null) {
          courseImg.style.display = "none";
        }

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("p-20");

        const courseTitle = document.createElement("h4");
        courseTitle.classList.add("m-0");
        courseTitle.textContent = course.title;

        const courseDescription = document.createElement("p");
        courseDescription.classList.add(
          "description",
          "c-grey",
          "mt-15",
          "fs-14"
        );
        courseDescription.textContent = course.discription;

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info", "p-15", "p-relative", "between-flex");

        const courseLink = document.createElement("a");
        courseLink.target = "_blank";
        courseLink.href = course.link;

        const linkSpan = document.createElement("span");
        linkSpan.classList.add("title", "bg-blue", "c-white", "btn-shape");
        linkSpan.textContent = "رابط الكورس";

        courseLink.appendChild(linkSpan);
        infoDiv.appendChild(courseLink);
        contentDiv.appendChild(courseTitle);
        contentDiv.appendChild(courseDescription);
        courseDiv.appendChild(courseImg);
        courseDiv.appendChild(contentDiv);
        courseDiv.appendChild(infoDiv);
        coursesPage.appendChild(courseDiv);
      });
    }
  } catch (error) {
    console.error("حدث خطأ أثناء جلب البيانات:", error);
  }
});
