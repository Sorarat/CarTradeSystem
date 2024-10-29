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
  document.location.href = "../logoutPage/logoutPage.html"; // Use relative path (one directory level up)
}

// Simulate fetching user role after login
let userRole = 'seller'; // Example role, this should be dynamically set based on the logged-in user

// Function to set the dashboard link based on user role
function setDashboardLink() {
    const dashboardLink = document.getElementById('dashboardLink');

    if (userRole === 'buyer') {
        dashboardLink.href = '../buyer/buyerDashboardPage.html';
    } else if (userRole === 'seller') {
        dashboardLink.href = '../seller/sellerDashboardPage.html';
    } else if (userRole === 'agent') {
        dashboardLink.href = '../agent/agentDashboardPage.html';
    } else {
        dashboardLink.href = '#'; // Default or error page
    }
}

// Call the function to set the link when the page loads
window.onload = setDashboardLink;

/* ---------------------------------- */
/* homePage JS */
/* Search button */
function performCarSearch() {
/* TO DO... */
}

/* View Details button */
function viewCarDetails() {
window.location.href = "./carDetailsPage.html"; // Redirect to the specified page
}

/* ---------------------------------- */
/* carDetailsPage JS */

/* Loan Calculator - TO DO... */

// JS code to convert string/int fetched from db to SGD format
// Define the price you want to format
const price = 79000;

// Create a formatter for Singapore Dollars
const sgdFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0, // No decimal places
  maximumFractionDigits: 0, // No decimal places
});

// Format the price
const formattedPrice = `$${formatter.format(price)}`;

// Output the formatted price
console.log(formattedPrice); // Output: $79,000

/* ---------------------------------- */
/* viewRatingReviewPage JS */

/* ---------------------------------- */