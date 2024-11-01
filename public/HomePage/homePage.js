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
    dashboardLink.href = '../Buyer/buyerDashboardPage.html';
  } else if (userRole === 'seller') {
    dashboardLink.href = '../Seller/sellerDashboardPage.html';
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

  document.getElementById('popupOverlay').style.display = 'flex';
  //window.location.href = "./carDetailsPage.html"; // Redirect to the specified page
}

function closePopup() {
  document.getElementById('popupOverlay').style.display = 'none';
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
const formattedPrice = `$${sgdFormatter.format(price)}`;

// Output the formatted price
console.log(formattedPrice); // Output: $79,000

/* ---------------------------------- */
/* viewAgentPage JS */

let allAgents = [];

// function to fetch all agetns and populate the table
async function fetchAllAgents(shouldPopulateTable = true) {

  try {
    const response = await fetch('/viewAccountRoute/view-agents');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    allAgents = await response.json();

      // Log the fetched agents to see what is being returned
      console.log('Fetched agents:', allAgents);

    if (shouldPopulateTable) {
      populateAgentTable(allAgents);
    }
  }

  catch(err) {
    console.error('Failed to fetch agents accounts: ', err);
    alert('Failed to load agents. Please try again.');

  }
}



function populateAgentTable(agents) {
  
  const tableBody = document.getElementById('agentInfoTable');
  tableBody.innerHTML = ''; // clear previous content
  
  agents.forEach(agent => {
    const row = document.createElement('tr');
    // row.setAttribute('data-user-id', agent.u);
    
    // populate table rows with agent data
    row.innerHTML = `
      <td><input type="text" class="form-control1" value="${agent.username}" readonly></td>
      <td><input type="text" class="form-control1" value="${agent.email}" readonly></td>
      <td><input type="text" class="form-control1" value="${agent.phone}" readonly></td>
      <td><button class="rating-review-button" onclick="viewRatingReviewBtn('${agent.user_id}')">Rating & Review</button></td>
      
    `;

    tableBody.appendChild(row);

  });
    
}

// call the fetchAllAgents function when the page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed'); // Add this line

  const agentTable = document.getElementById('agentInfoTable');
  if (agentTable) {
    fetchAllAgents();
  }
});





/* View Rating & Reviews button */
function viewRatingReviewBtn(agent_id) {
  window.location.href = `./viewRatingReviewPage.html?agent_id=${agent_id}`; 
}

/* ---------------------------------- */

/* view rating & reviews js */

let allRatingAndReviews = [];

// function to fetch all rating and reviews and populate the table
async function fetchAllRatingReviews(agent_id) {

  try {
    const response = await fetch(`/viewRatingReviewRoute/view-rating-reviews/${agent_id}`);
    if (!response.ok) 
      throw new Error('Failed to fetch rating and review');

    const data = await response.json();
    displayReviews(data);
    displayOverallRating(data);

  }

  catch(err) {
    console.error("Error fetching reviews: ", err);

  }
}

// display fetched reviews
function displayReviews(reviews) {
  const container = document.getElementById("review-container");
  container.innerHTML = ""; // clear any existing reviews

  reviews.forEach(review => {
    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";
    reviewCard.innerHTML = `
      <div class="review-header">
        <p class="review-username">${review.username}</p>
        <div class="star">
          <input type="radio" id="star" name="star" value="star" checked>
          <label for="star"></label>
          <p class="rating-text">${review.rating}</p>
        </div>
      </div>
      <p class="review">${review.review}</p>
      `;

      container.appendChild(reviewCard);
  });
}

// calculate and display the overall rating
function displayOverallRating(reviews) {
  const container = document.getElementById("overall-rating");
  
  if (reviews.length === 0) {
    container.textContent = "No ratings available";
  }

  // sum all ratings
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  
  // Calculate average rating
  const averageRating = (totalRating / reviews.length).toFixed(1); // Round to 1 decimal
  
  // Display the average rating
  container.innerHTML = `
    <div class="overall-rating-content">
      <div class="star">
        <input type="radio" id="star-overall" name="star" value="star" checked>
        <label for="star-overall"></label>
      </div>
    </div>
    <span class="average-rating-text">${averageRating} / 5</span>
  `;


}

document.addEventListener('DOMContentLoaded', function() {
  // Extract agent_id from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const agent_id = urlParams.get('agent_id');
   
  if (agent_id) {
    // Call fetchAllRatingReviews with the agent_id if it exists
    fetchAllRatingReviews(agent_id);
   } else {
     onsole.error('No agent_id found in the URL');
   }
  
});



/* ---------------------------------- */

/* createRatingReview JS */
function createRatingReviewBtn() {
  window.location.href = "../Buyer/createRatingReviewPage.html"; // Redirect to the specified page
}

/* ---------------------------------- */
