document.addEventListener("DOMContentLoaded", async function () {
  const newsContainer = document.querySelector(".not-admin");
  try {
    const response = await fetch("http://localhost:5000/posts");
    const data = await response.json();
    if (data.length === 0) {
      const noNewsText = document.createElement("p");
      noNewsText.classList.add("no-news");
      noNewsText.textContent = "No News Found";
      newsContainer.appendChild(noNewsText);
    } else {
      data.forEach((post) => {
        const box = document.createElement("div");
        box.classList.add("box", "box-news");

        const newsHead = document.createElement("div");
        newsHead.classList.add("news-head");

        const info = document.createElement("div");
        info.classList.add("info");

        const name = document.createElement("h3");
        name.classList.add("name");
        name.textContent = post.name;

        const dateTime = document.createElement("p");
        dateTime.classList.add("date-time");

        const date = document.createElement("p");
        date.classList.add("date");
        date.textContent = post.date.day;

        const time = document.createElement("p");
        time.classList.add("time");
        time.textContent = post.date.time;

        dateTime.appendChild(date);
        dateTime.appendChild(time);

        info.appendChild(name);
        info.appendChild(dateTime);

        newsHead.appendChild(info);

        const newsBody = document.createElement("div");
        newsBody.classList.add("news-body");

        const text = document.createElement("div");
        text.classList.add("text");

        const textTitle = document.createElement("h2");
        textTitle.textContent = post.title;

        const textHeading = document.createElement("h4");
        textHeading.textContent = post.text;

        const textLink = document.createElement("a");
        textLink.href = post.link;
        textLink.target = "_blank";
        textLink.textContent = post.link;

        text.appendChild(textTitle);
        text.appendChild(textHeading);
        text.appendChild(textLink);

        const image = document.createElement("img");
        image.src = post.img;
        if (post.img === null || post.img === "") {
          image.style.display = "none";
        }

        newsBody.appendChild(text);
        newsBody.appendChild(image);

        box.appendChild(newsHead);
        box.appendChild(newsBody);

        newsContainer.appendChild(box);
      });
    }
  } catch (error) {
    console.error("حدث خطأ أثناء جلب البيانات:", error);
  }
});
