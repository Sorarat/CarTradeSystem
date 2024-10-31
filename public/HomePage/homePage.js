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

/* Function to set the Dashboard link & create "Agents" dropdown option */
function setDashboardLink() {
    const dashboardLink = document.getElementById('dashboardLink');
    const agentsLinkContainer = document.getElementById('agents-link-container');
    const userRole = sessionStorage.getItem('role'); // Retrieve the user role from sessionStorage

    // Create a dropdown menu option "Agents" for buyer & seller only
    if (userRole === 'buyer' || userRole === 'seller') {
      const agentsLink = document.createElement('a');
      agentsLink.href = '../HomePage/viewAgentsPage.html';
      agentsLink.textContent = 'Agents';
      agentsLinkContainer.appendChild(agentsLink);
    }

    // Update Dashboard link according to user role upon login
    if (userRole === 'buyer') {
        dashboardLink.href = '../buyer/buyerDashboardPage.html';
    } else if (userRole === 'seller') {
        dashboardLink.href = '../seller/sellerDashboardPage.html';
    } else if (userRole === 'agent') {
        dashboardLink.href = '../CarAgent/agentDashboard.html';
    } else {
        dashboardLink.href = '#'; // Default or error page
    }
}

// Call the function to set the link when the page loads
window.onload = setDashboardLink;

/* ---------------------------------- */
/* homePage JS */
/* Ensure that min is always >= max */
document.addEventListener('DOMContentLoaded', function() {
  // Get the min and max select elements
  const minSelect = document.getElementById('min');
  const maxSelect = document.getElementById('max');

  // Function to update max options based on min selection
  function updateMaxOptions() {
    const minValue = parseInt(minSelect.value);

    for (let i = 0; i < maxSelect.options.length; i++) {
      const optionValue = parseInt(maxSelect.options[i].value);
      // Disable options in max <= selected min value
      maxSelect.options[i].disabled = optionValue <= minValue;
    }
  }

  // Function to update min options based on max selection
  function updateMinOptions() {
    const maxValue = parseInt(maxSelect.value);

    for (let i = 0; i < minSelect.options.length; i++) {
      const optionValue = parseInt(minSelect.options[i].value);
      // Disable options in min >= selected max value
      minSelect.options[i].disabled = optionValue >= maxValue;
    }
  }

  // Add event listeners to both select elements
  minSelect.addEventListener('change', function() {
    updateMaxOptions();
    updateMinOptions(); // Update min options as well
  });

  maxSelect.addEventListener('change', function() {
    updateMinOptions();
    updateMaxOptions(); // Update max options as well
  });

  // Initialize the options based on the initial selections
  updateMaxOptions();
  updateMinOptions();
});


/* Search button */
function performCarSearch() {
  // To do...
}

/* Shortlist checkbox - heart-icon */
document.addEventListener('DOMContentLoaded', function() {
  let count = 0; // Initialize counter

  function updateCounter(checkbox) {
    // Update the count based on the checkbox state
    if (checkbox.checked) {
      count += 1; // Increment if checked
    } else {
      count -= 1; // Decrement if unchecked
    }

    console.log('Current Count:', count); // Log the count to the console
  }

  // Get all checkboxes with the name "shortlist"
  const checkboxes = document.querySelectorAll('input[name="shortlist"]');

  // Add event listeners to each checkbox
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        updateCounter(checkbox); // Call the function to update the counter
    });
  });
});


/* View Details button */
function viewCarDetails() {
  // Update database accordingly - for seller to see
  let viewCount = 0;
  viewCount += 1; // Increment onclick
  console.log('Current Count:', viewCount); // Log the count to the console - FOR CHECKING

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
/* viewAgentPage JS */
/* View Details button */
function viewRatingReviewBtn() {
  window.location.href = "./viewRatingReviewPage.html"; // Redirect to the specified page
}

/* ---------------------------------- */