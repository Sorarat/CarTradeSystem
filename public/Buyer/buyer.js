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
/* CreateRatingReviewPage JS*/

/* Display the star rating text below the star-icon */
const score = document.querySelector('.score');
const ratings = document.querySelectorAll('.rating input');

ratings.forEach(rating => {
  rating.addEventListener('change', () => {
    const selectedRating = rating.value;

    const text = selectedRating == 1 ? 'star' : 'stars';

    score.textContent = `${selectedRating} ${text} rating.`;
  })
})



/* Submit Button */
// Ensure the DOM is fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('createRatingReview').addEventListener('click', createRatingReviewBtn);

  // Get the agent_id from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const agent_id = urlParams.get('agent_id');
  
  // update the back button to include the agent id in the url
  if (agent_id) {
    const backButton = document.getElementById('backButton');
    backButton.href = `../HomePage/viewRatingReviewPage.html?agent_id=${agent_id}`;
  }


});

async function createRatingReviewBtn(event) {

  const form = document.getElementById('createRatingReviewForm');

  const urlParams = new URLSearchParams(window.location.search);
  const agent_id = urlParams.get('agent_id');

  if (!agent_id) {
    alert("Agent ID not found. Cannot create review.");
    return; // Exit the function if agent_id is not found
  }

  
  // get input values
  const ratingInput = document.querySelector('input[name="rating"]:checked');

  if (!ratingInput) {
    event.preventDefault(); // Prevent form submission
    alert('Please select a rating before submitting.'); // Custom alert
  }

  const rating = ratingInput ? ratingInput.value : null;
  const review = document.getElementById('review').value.trim();

  // check if the form is valid
  if (form.checkValidity()) {

    event.preventDefault(); // Prevent default only if the form is valid  

    // retrieve buyer email from session storage
    const reviewer_email = sessionStorage.getItem('email');

    try {
      const response = await fetch('/createRatingReviewRoute/createRatingReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({agent_id, reviewer_email, rating, review })

      });

      const data = await response.json();

      if (data.success) {
        alert('Rating & Review created successfully');
        document.location.href= './buyerDashboardPage.html';
      }

      else {
        alert('Rating & Review creation failed. Please try again.'); 
      }

    }

    catch(err) {
      console.error(err);
      alert('An error occured during rating & review creation');

    }
  }



}




/* ---------------------------------- */