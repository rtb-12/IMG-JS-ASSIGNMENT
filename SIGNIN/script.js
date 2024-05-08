var form = document.querySelector(".form");
var submitButton1 = document.querySelector('input[type="submit1"]');
var submitButton2 = document.querySelector('input[type="submit2"]');

function handleFormSubmit1(event) {
  event.preventDefault();

  var emailInput = document.querySelector('input[type="text"]');
  var passwordInput = document.querySelector('input[type="password"]');

  var email = emailInput.value;
  var password = passwordInput.value;

  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  var data = {
    email: email,
    password: password,
  };
  //console.log(data);

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      alert("Submitted successfully");
    })
    .catch((error) => {
      alert("An error occurred. Please try again");
      console.error("Error:", error);
    });
}

function handleFormSubmit2(event) {
  event.preventDefault();

  var emailInput = document.querySelector('input[type="text"]');
  var passwordInput = document.querySelector('input[type="password"]');

  var email = emailInput.value;
  var password = passwordInput.value;

  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  var emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  console.log(data);

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async function submitData(data = {}) {
    try {
      const response = await postData("https://reqres.in/api/login", data);
      console.log(response);
      alert("Submitted successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  var data = {
    email: email,
    password: password,
  };

  submitData(data);
}

submitButton1.addEventListener("click", handleFormSubmit1);
submitButton2.addEventListener("click", handleFormSubmit2);
form.addEventListener("keydown", function (event) {
  //console.log(event.key);
  if (event.key === "Enter") {
    handleFormSubmit1(event);
  }
});
