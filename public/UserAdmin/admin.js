/* Header Javascript */
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function menuBtn() {
    document.getElementById("menu-dropdown").classList.toggle("show");
}
  
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("menu-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}

function logoutBtn(event){
    event.preventDefault(); // Prevent the form from submitting
    document.location.href="../LogoutPage/LogoutPage.html"; // Use relative path (one directory level up)
}

/* ---------------------------------- */
/* CreateProfile JS*/
/* Create Button */
// Ensure the DOM is fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('createProfile').addEventListener('click', createProfileBtn);
});

function createProfileBtn(event) {
  const form = document.getElementById('createProfileForm');
  
  // Get input and textarea values
  const role = document.getElementById('role').value.trim();
  const description = document.getElementById('description').value.trim();

  // Check for empty or whitespace-only values
  if (role === "" || description === "") {
    event.preventDefault(); // Prevent form submission
    alert('Both fields are required and cannot be empty or whitespace.'); // Custom alert
    return; // Exit the function
  }

  // Check if the form is valid
  if (form.checkValidity()) {
    event.preventDefault(); // Prevent default only if the form is valid

    // Proceed with the desired action (Account creation)
    alert('User profile created!');
    document.location.href = "./AdminDashboard.html"; // Use relative path
  }
}

/* Cancel Button - CreateProfile & CreateAccount */
function cancelCreateBtn(event){
  event.preventDefault(); // Prevent the form from submitting
  document.location.href="./AdminDashboard.html"; // Use relative path
}

/* ---------------------------------- */
/* CreateAccount JS */
// Ensure the DOM is fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('createAccount').addEventListener('click', createAccountBtn);
});

function createAccountBtn(event) {
  const form = document.getElementById('createAccountForm');
  
  // Get input and textarea values
  const role = document.getElementById('role').value.trim();
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const password = document.getElementById('password').value.trim(); // Check to reject whitespace?

  // Check for empty or whitespace-only values
  if (role === "" || username === "" || email === "" || phoneNumber === "" || password === "") {
    event.preventDefault(); // Prevent form submission
    alert('Both fields are required and cannot be empty or whitespace.'); // Custom alert
    return; // Exit the function
  }

  // Check if the form is valid
  if (form.checkValidity()) {
    event.preventDefault(); // Prevent default only if the form is valid

    // Proceed with the desired action (Account creation)
    alert('User account created!');
    document.location.href = "./AdminDashboard.html"; // Use relative path
  }
}


