document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".formParent");
  let nameValue = sessionStorage.getItem("username");
  const username = document.querySelector("#name");
  username.value = nameValue;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = username.value;
    const description = document.querySelector("#description").value;
    const link = document.querySelector("#link").value;
    const fileInput = document.querySelector("#fileInput");
    const titleTwoInput = document.querySelector("#titleTwoInput").value;
    const file = fileInput.files[0];

    const reader = new FileReader();
    console.log(nameValue);
    reader.onload = async function () {
      const imgBase64 = reader.result;
      const postData = {
        name: name,
        text: description,
        title: titleTwoInput,
        img: imgBase64 || null,
        date: {
          day: new Date().toLocaleDateString("ar-EG"), // تاريخ اليوم
          time: new Date().toLocaleTimeString("ar-EG"), // الوقت الحالي
        },
        link: link,
      };

      try {
        const response = await fetch("http://localhost:5000/posts", {
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
    window.location.reload();

  });
});

///////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:5000/posts");
    const data = await response.json();
    const myBoxes = document.querySelector(".my-boxes");

    if (data.length === 0) {
      const noNewsText = document.createElement("p");
      noNewsText.classList.add("no-news");
      noNewsText.textContent = "Not Found News Now";
      myBoxes.appendChild(noNewsText);
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

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deletBtn");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
          deletePost(post.id);
          window.location.reload();
        });

        newsHead.appendChild(info);
        newsHead.appendChild(deleteBtn);

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

        myBoxes.appendChild(box);

        function deletePost(postId) {
          fetch(`http://localhost:5000/posts/${postId}`, {
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
