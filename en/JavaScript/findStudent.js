document
  .getElementById("studentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const studentName = formData.get("name");

    fetch("http://localhost:5000/students")
      .then((response) => response.json())
      .then((data) => {
        const student = data.find((student) => student.name === studentName);
        if (student) {
          displayStudent(student);
        } else {
          alert("لم يتم العثور على الطالب!");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
function displayStudent(student) {
  const html = `
        <div class="container">
        <div class="row">
          <p>
            إسم الطالب :
          </p>
          <span>${student.name}</span>
        </div>
        <div class="row">
          <p>
            السن :
          </p>
          <span>${student.age}</span>
        </div>
        <div class="row">
          <p>
            السنة الدراسية :
          </p>
          <span>${student.grade}</span>
        </div>
        <div class="row">
          <p>
            العنوان :
          </p>
          <span>${student.address}</span>
        </div>
        <div class="row">
          <p>
            البريد الالكتروني :
          </p>
          <span>${student.email}</span>
        </div>
        <div class="row">
          <p>
            رقم الهاتف :
          </p>
          <span>${student.phone}</span>
        </div>
        <div class="row">
          <p>
            النوع :
          </p>
          <span>${student.gender}</span>
        </div>
        <div class="row">
          <p>
            البلد :
          </p>
          <span>${student.nationality}</span>
        </div>
      </div>

  `;
  document.getElementById("studentData").innerHTML = html;
}

document
  .getElementById("studentFor")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const studentName = document.getElementById("studentName").value;
    const age = document.getElementById("age").value;
    const grade = document.getElementById("grade").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const gender = document.getElementById("gender").value;
    const nationality = document.getElementById("nationality").value;

    const studentData = {
      name: studentName,
      age: age,
      grade: grade,
      address: address,
      email: email,
      phone: phone,
      gender: gender,
      nationality: nationality,
    };

    // إرسال البيانات عبر fetch إلى السيرفر
    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        alert("تم حفظ بيانات الطالب بنجاح!");
        // You can handle the response data here if needed
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  });
