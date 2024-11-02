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

/* For viewAgentsPage & viewRatingReviewPage */
/* Function to set the Dashboard link & create "Home" dropdown option */
function setDashboardLink() {
  const dashboardLink = document.getElementById('dashboardLink');
  const homeLinkContainer = document.getElementById('home-link-container');
  const userRole = sessionStorage.getItem('role'); // Retrieve the user role from sessionStorage

  // Create a dropdown menu option "Home" for Buyer only
  if (userRole === 'buyer') {
    const homeLink = document.createElement('a');
    homeLink.href = '../HomePage/homePage.html';
    homeLink.textContent = 'Home';
    homeLinkContainer.appendChild(homeLink);
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


/* View Details button - opens a popup */
let lastSelectedButton = null; // Variable to keep track of the last selected button

function viewCarDetails(button) { 
  // Update database accordingly - for seller to see
  let viewCount = 0;
  viewCount += 1; // Increment onclick
  console.log('Current Count:', viewCount); // Log the count to the console - FOR CHECKING

  document.getElementById('popupOverlay').style.display = 'flex';

  // Fetch Car Price
  const carPrice = Number("85000");
  document.getElementById('price').value = formatPrice(carPrice);

  // Set default Down Payment value (30%)
  const button30 = document.getElementById('button30');
  button30.classList.add('selected'); // Add 'selected' class to the default button
  lastSelectedButton = button30;
  const selectedRate = lastSelectedButton.getAttribute('data-rate'); // Get the value of the selected button
  const DownPayment = carPrice * (selectedRate/100);
  document.getElementById('downPayment').value = formatPrice(DownPayment);

  // Set default Interest Rate (2.5%)
  const defaultInterestRate = 2.5; // Set a default value
  document.getElementById('interestRate').value = defaultInterestRate;

  // Set default Loan Term (1yr)
  const defaultLoanTerm = document.getElementById('loanTerm').value;

  // Compute Total Interest Paid
  const totalInterestPaid = carPrice * (defaultInterestRate/100) * (defaultLoanTerm/12);
  document.getElementById('interest').innerText = formatSGD(totalInterestPaid);

  // Compute Loan Amount
  const loanAmount = carPrice - DownPayment;
  document.getElementById('loanAmount').innerText = formatSGD(loanAmount);

  // Compute Total Paid Amount
  const totalPaidAmount = totalInterestPaid + loanAmount;
  document.getElementById('totalPaidAmount').innerText = formatSGD(totalPaidAmount);

  // Compute Monthly Instalment
  const monthlyInstalment = Math.round(totalPaidAmount/defaultLoanTerm);
  const monthlyInstalmentStr = formatSGD(monthlyInstalment) + " /mth";
  document.getElementById('monthlyInstalment').innerText = monthlyInstalmentStr;

  // Add event listener to the popup overlay to keep the selected state
  const popupOverlay = document.getElementById('popupOverlay');
  popupOverlay.addEventListener('click', (event) => {
    // Check if the click was on any down payment button
    if (event.target.classList.contains('down-payment-button')) {
      // Remove selected class from all buttons
      const buttons = document.querySelectorAll('.down-payment-button');
      buttons.forEach(btn => btn.classList.remove('selected'));

      // Add selected class to the clicked button
      event.target.classList.add('selected');

      // Update lastSelectedButton to the newly clicked button
      lastSelectedButton = event.target;
    } else {
      // Keep the last selected button highlighted
      if (lastSelectedButton) {
        lastSelectedButton.classList.add('selected');
      }
    }

  });

  // Set up event listeners for buttons
  setDownPaymentListeners();

  // Set up event listeners for input fields
  const priceInput = document.getElementById('price');
  const downPaymentInput = document.getElementById('downPayment');
  const interestRateInput = document.getElementById('interestRate');
  const loanTermSelect = document.getElementById('loanTerm');

  priceInput.addEventListener('input', updateValues);
  downPaymentInput.addEventListener('input', updateValues);
  interestRateInput.addEventListener('input', updateValues);
  loanTermSelect.addEventListener('change', updateValues);
}

/* Compute Downpayment */
// Function to set event listeners for Down Payment buttons
function setDownPaymentListeners() {
  const buttons = document.querySelectorAll('.down-payment-button');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const downPaymentInput = document.getElementById('downPayment');
      const dataRate = this.getAttribute('data-rate'); // Get the data-rate from the clicked button

      // Set the input value to the data-rate of the button clicked - FOR CHECKING
      //downPaymentInput.value = this.getAttribute('data-rate');
      
      // Calculate the down payment based on the price and the clicked data-rate
      const price = parsePrice(document.getElementById('price').value);
      const downPayment = price * (dataRate / 100);
      downPaymentInput.value = formatPrice(downPayment); // Update down payment input with formatted value

      // Remove selected class from all buttons and add to the clicked one
      const buttons = document.querySelectorAll('.down-payment-button');
      buttons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');

      console.log('Button clicked:', this.getAttribute('data-rate')); // FOR CHECKING
      updateValues(); // Update values after button click
    });
  });
}

// Function to update values dynamically
function updateValues() {
  // Convert str to int/Number
  const price = parsePrice(document.getElementById('price').value);
  const downPayment = parsePrice(document.getElementById('downPayment').value);
  const interestRate = parsePrice(document.getElementById('interestRate').value);
  const loanTerm = document.getElementById('loanTerm').value;

  // Get input values
  const priceInput = document.getElementById('price');
  const downPaymentInput = document.getElementById('downPayment');
  // Enforce numeric input for Price and Down Payment
  priceInput.value = priceInput.value.replace(/[^0-9]/g, '');             // Remove non-numeric characters
  downPaymentInput.value = downPaymentInput.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters

  // Format user input (price & downpayment)
  document.getElementById('price').value = formatPrice(price);
  document.getElementById('downPayment').value = formatPrice(downPayment);

  // Compute Total Interest Paid
  const totalInterestPaid = (price - downPayment) * (interestRate/100) * (loanTerm/12);
  document.getElementById('interest').innerText = formatSGD(totalInterestPaid);

  // Compute Loan Amount
  const loanAmount = price - downPayment;
  document.getElementById('loanAmount').innerText = formatSGD(loanAmount);
  
  // Check if Down Payment exceeds Car Price
  if (downPayment > price) {
    document.getElementById('interest').innerText = '$NaN';
    document.getElementById('totalPaidAmount').innerText = '$NaN';
    document.getElementById('loanAmount').innerText = '$0';
    document.getElementById('monthlyInstalment').innerText = '$0 /mth';
    
    alert("Down payment value should not more than car price.")
    document.getElementById('downPayment').value = formatPrice(0);  // Reset value
    return; // Exit the function early
  }

  // Compute Total Paid Amount
  const totalPaidAmount = totalInterestPaid + loanAmount;
  document.getElementById('totalPaidAmount').innerText = formatSGD(totalPaidAmount);

  // Compute Monthly Instalment
  const monthlyInstalment = Math.round(totalPaidAmount/loanTerm);
  const monthlyInstalmentStr = formatSGD(monthlyInstalment) + " /mth";
  document.getElementById('monthlyInstalment').innerText = monthlyInstalmentStr;

  // Check if (downPayment / price) * 100 equals any data-rate
  const calculatedRate = (downPayment / price) * 100;
  const buttons = document.querySelectorAll('.down-payment-button');
  let isValidRate = false;

  buttons.forEach(button => {
    const dataRate = parseFloat(button.getAttribute('data-rate'));
    if (calculatedRate === dataRate) {
      isValidRate = true; // Found a matching rate
      button.classList.add('selected'); // Keep the button selected
    } else {
      button.classList.remove('selected'); // Remove selected class if it doesn't match
    }
  });

  // If no matching rate was found, clear the selection
  if (!isValidRate) {
    buttons.forEach(button => button.classList.remove('selected'));
    lastSelectedButton = null; // Reset last selected button
  }
}


/* Close the popup */
function closePopup() {
  document.getElementById('popupOverlay').style.display = 'none';

  // Clear last selected button
  if (lastSelectedButton) {
    lastSelectedButton.classList.remove('selected'); // Remove 'selected' class
    lastSelectedButton = null; // Reset lastSelectedButton
  }
}

/* ---------------------------------- */
/* HELPER JS */


/* Format Price (10000 --> 10,000) */
function formatPrice(price) {
  // Convert price to a number
  const numericPrice = Number(price);

  // Check if the conversion was successful
  if (isNaN(numericPrice)) {
    throw new Error('Invalid price input');
  }
  
  // Create a formatter for Singapore Dollars
  const sgdFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0, // No decimal places
    maximumFractionDigits: 0, // No decimal places
  });

  // Format the price
  return `${sgdFormatter.format(price)}`;
}

/* Convert the formatPrice to int (10,000 --> 10000) */
function parsePrice(formattedPrice) {
  // Remove commas, then convert to a number
  return Number(formattedPrice.replace(/,/g, ''));
}

/* Format Price (10000 --> $10,000) - Loan Breakdown */
function formatSGD(price) {
  // Create a formatter for Singapore Dollars
  const sgdFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0, // No decimal places
    maximumFractionDigits: 0, // No decimal places
  });

  // Format the price
  return `$${sgdFormatter.format(price)}`;
}

/* Convert the formatSGD to int ($10,000 --> 10000) */
function parseSGD(formattedPrice) {
  // Remove commas, then convert to a number
  return Number(formattedPrice.replace(/$,/g, ''));
}


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
    console.error('No agent_id found in the URL');
   }
  
});



/* ---------------------------------- */

/* createRatingReview JS */
function createRatingReviewBtn() {

  // extract agent_id from URL
  const urlParams = new URLSearchParams(window.location.search);
  const agentId = urlParams.get('agent_id');

  if (!agentId) {
    alert('Agent ID not found. Cannot submit a review.');
    return; 
  }
 
  // redirect to create rating & review page
  window.location.href = `../Buyer/createRatingReviewPage.html?agent_id=${agentId}`; // Redirect to the specified page
}

/* ---------------------------------- */
