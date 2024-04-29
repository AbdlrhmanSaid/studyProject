document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:5000/files");
    const data = await response.json();
    const filesContent = document.querySelector(".files-content");
    if (data.length === 0) {
      const noNewsText = document.createElement("p");
      noNewsText.classList.add("no-news");
      noNewsText.textContent = "No Files Found!";
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
        pName.textContent = `Name: ${file.name}`;
        const p = document.createElement("p");
        p.classList.add("c-grey", "fs-13");
        p.textContent = `Specialization: ${file.specialization}`;
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
      });
    }
  } catch (error) {
    console.error("حدث خطأ أثناء جلب البيانات:", error);
  }
});
