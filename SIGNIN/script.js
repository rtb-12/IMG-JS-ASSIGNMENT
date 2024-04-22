var form = document.querySelector(".form");
var submitButton = document.querySelector('input[type="submit"]');

function handleFormSubmit(event) {
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

submitButton.addEventListener("click", handleFormSubmit);

form.addEventListener("keydown", function (event) {
  //console.log(event.key);
  if (event.key === "Enter") {
    handleFormSubmit(event);
  }
});
