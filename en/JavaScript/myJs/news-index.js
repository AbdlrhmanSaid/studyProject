document.addEventListener("DOMContentLoaded", async function () {
  const newsContainer = document.querySelector(".news .container");
  try {
    const response = await fetch("http://localhost:5000/posts");
    const data = await response.json();
    if (data.length === 0) {
      const noNewsText = document.createElement("p");
      noNewsText.classList.add("no-news");
      noNewsText.textContent = "No News Found";
      newsContainer.appendChild(noNewsText);
    } else {
      const lastThreePosts = data.slice(-3);

      lastThreePosts.forEach((post) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card__header");

        const image = document.createElement("img");
        image.src = post.img;
        if (post.img === null || post.img === "") {
          image.style.display = "none";
        }
        cardHeader.appendChild(image);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card__body");

        const h4 = document.createElement("h4");
        h4.textContent = post.title;
        cardBody.appendChild(h4);

        const p = document.createElement("p");
        p.textContent = `By : ${post.name}`;
        cardBody.appendChild(p);

        const a = document.createElement("a");
        a.textContent = "Show More";
        a.href = "news.html";
        cardBody.appendChild(a);

        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        newsContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error("حدث خطأ أثناء جلب البيانات:", error);
  }
});
