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
    dashboardLink.href = '../Seller/sellerDashboard.html';
  } else {
    dashboardLink.href = '#'; // Default or error page
  }
}

// Call the function to set the link when the page loads
window.onload = setDashboardLink;


/* Shortlist checkbox - heart-icon */
document.addEventListener('DOMContentLoaded', function() {

  fetchUsername();
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

function viewCarDetails(car) { 
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

  // Set default Interest Rate (2.75%)
  const defaultInterestRate = 2.75; // Set a default value
  document.getElementById('interestRate').value = defaultInterestRate;

  // Set default Loan Term (1yr)
  const defaultLoanTerm = document.getElementById('loanTerm').value;

  // Compute Total Interest Paid
  const totalInterestPaid = carPrice * (defaultInterestRate/100) * (defaultLoanTerm/12);
  document.getElementById('interestRate').innerText = formatSGD(totalInterestPaid);

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

  // Set the dynamic content of the popup
  document.getElementById('carModel').textContent = car.car_model; // Car Model
  document.getElementById('carRegDate').textContent = formatDate(car.reg_date); // Car Reg Date
  document.getElementById('agentEmail').textContent = car.agent_email; // Agent's Email
  document.getElementById('price').value = car.price; // Car Price


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

function formatDate(dateString) {
  const date = new Date(dateString);
  // Format the date as 'DD Month YYYY', e.g., '14 May 2022'
  return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
  });
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

/* ---------------------------------- */
/* viewShortlistPage JS*/
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
    
    alert("Down payment value should not be more than car price.")
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

/* ------------------------------------------------------------- */
// view all shortlisted car listings
async function fetchShortlistedCarListings() {
  const buyerEmail = sessionStorage.getItem('email');

  try {
    const response = await fetch(`/viewBuyerShortlistedCarsRoute/view-shortlisted-cars/${buyerEmail}`);
    const shortlistedCars = await response.json();

    populateShortlistedCars(shortlistedCars);

  }

  catch(error) {
    console.error('Error fetching car listings: ', error);
  }

}

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('viewShortlistPage.html')) {  
    fetchShortlistedCarListings();
  }
});

function populateShortlistedCars(shortlistedCars) {
  const gridContainer = document.querySelector('.grid-container');
  gridContainer.innerHTML = ''; // Clear existing listings

  if (shortlistedCars.length === 0) {
    const noResultsContainer = document.createElement('div'); // Create a wrapper
    noResultsContainer.classList.add('no-car-listings-container'); // Add a class for styling

    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No car listings found.';
    noResultsMessage.classList.add('no-car-listings-message'); // Keep your existing message class

    noResultsContainer.appendChild(noResultsMessage);
    gridContainer.appendChild(noResultsContainer); // Append wrapper to grid container
    return;
}

  shortlistedCars.forEach(car => {
    const carCard = document.createElement('div');
    carCard.className = 'car-card';

    const carHeader = document.createElement('div');
    carHeader.className = 'car-header';

    const carNameContainer = document.createElement('div');
    carNameContainer.className = 'car-name-container';

    const carName = document.createElement('p');
    carName.className = 'car-name';
    carName.textContent = car.car_model; 
    carNameContainer.appendChild(carName);
    
    // Check the status of the car
    if (!car.status) {
      // Add SOLD label
      const soldLabel = document.createElement('span');
      soldLabel.className = 'sold-label';
      soldLabel.textContent = 'SOLD';
      carNameContainer.appendChild(soldLabel);

      // Mark card as disabled if car is sold
      carCard.classList.add('disabled');
    }
    carHeader.appendChild(carNameContainer);

    const shortlist = document.createElement('div');
    shortlist.className = 'shortlist';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `shortlist${car.car_id}`; 
    checkbox.name = 'shortlist';
    checkbox.onchange = () => shortlistCar(car.car_id);

    if (car.is_shortlisted) {
      checkbox.checked = true;
    }

    const label = document.createElement('label');
    label.htmlFor = `shortlist${car.car_id}`;

    shortlist.appendChild(checkbox);
    shortlist.appendChild(label);
    carHeader.appendChild(shortlist);

    const priceButton = document.createElement('div');
    priceButton.className = 'price-button';

    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = `$${car.price}`; 

    const viewDetailsButton = document.createElement('button');
    viewDetailsButton.className = 'create-button';
    viewDetailsButton.textContent = 'View Details';
    viewDetailsButton.onclick = () => viewCarDetails(car); // Add an onclick handler

    priceButton.appendChild(price);
    priceButton.appendChild(viewDetailsButton);
    carCard.appendChild(carHeader);
    carCard.appendChild(priceButton);

    gridContainer.appendChild(carCard);
  });
}

/* Shortlist checkbox - heart-icon */
function shortlistCar(carId) {
  const buyerEmail = sessionStorage.getItem('email');
  const checkbox = document.getElementById(`shortlist${carId}`);

  if (checkbox.checked) {
    // save to shortlist
    saveToShortlist(carId, buyerEmail);
  }
  else {
    removeFromShortlist(carId, buyerEmail);
    decreaseListingNumShortlist(carId);
  }
  
}

async function saveToShortlist(carId, buyerEmail) {
  try {
    const response = await fetch('/saveListingRoute/saveListing', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ carId, buyerEmail })
    });

    const data = await response.json();

    if (data.success) {
        /*Success message*/
      alert("Car Listing successfully saved into shortlist");
    }
    else {
      alert('Carlisting cannot be saved.');
    }

  }
  catch (error) {
    console.error('Failed to add into shortlist:', error);
    alert('An error occurred during the saving.');
  }
}

async function removeFromShortlist(carId, buyerEmail) {
  try {
    const response = await fetch('/removeListingRoute/removeListing', {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ carId, buyerEmail })
    });

    const data = await response.json();

    if (data.success) {
        /*Success message*/
      alert("Car Listing successfully removed from shortlist!");
      location.reload();
    }
    else {
      alert('Carlisting cannot be removed.');
    }

  }
  catch (error) {
    console.error('Failed to remove from shortlist:', error);
    alert('An error occurred during the removal.');
  }
}

async function decreaseListingNumShortlist(car_id) {
  
  try {
    const response = await fetch(`/updateCarlistingRoute/decreaseListingNumShortlist/${car_id}`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({car_id})
    });

    const data = await response.json();

    if (data.success) {
      console.log('Decrease num of shortlist by 1 succesfully');
    }

    else {
      console.log('Failed to decrease num of shortlist by 1');
    }
  }

  catch (error) {
    console.error('Failed to decrease num of shortlist:', error);
    alert('An error occurred during decreasing num of shortlist.');
  }
}


async function fetchUsername() {

  try {
    // get email from session storage
    const email = sessionStorage.getItem("email");
    const response = await fetch(`/viewAccountRoute/fetch-username?email=${encodeURIComponent(email)}`);

    // Check the response status
    if (!response.ok) {
      console.error('Error: Response not ok', response.status, response.statusText);
      throw new Error('Failed to fetch username');
    }
    const data = await response.json();

    if (data && data.username) {
      document.querySelector('#username-text').textContent = data.username;
    }

    else {
      console.log('Failed to fetch username');
      document.querySelector('#username-text').textContent = 'username'; // Fallback string
    }
  }

  catch(error) {
    console.error('Error fetching username:', error);
    document.querySelector('#username-text').textContent = 'username'; // Fallback string on error

  }
}
