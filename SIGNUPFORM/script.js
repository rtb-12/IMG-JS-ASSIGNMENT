function validateForm() {
    console.log('Validating form');
    var username = document.querySelector('#username').value;
var city = document.querySelector('#city').value;
var qualification = document.querySelector('#qualification').value;
var phoneNumber = document.querySelector('#phoneNumber').value;
var gender = document.querySelector('#gender').value;
var email = document.querySelector('#email').value;
var password = document.querySelector('#password').value;
var confirmPassword = document.querySelector('#confirmPassword').value;
  
    if (!username || !city || !qualification || !phoneNumber || !gender || !email || !password || !confirmPassword) {
      alert('Please fill all the fields');
      return false;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
  
    var phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Invalid phone number. It should be a 10 digit Indian phone number starting with 6, 7, 8, or 9');
      return false;
    }

    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email. Please enter a valid email address');
      return false;
    }

    var cityRegex = /^[a-zA-Z\s]+$/;
    if (!cityRegex.test(city)) {
      alert('Invalid city. Please enter a valid city name');
      return false;
    }

    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Invalid password. Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long');
      return false;
    }
  
    alert('Successfully signed up');
    return true;
}