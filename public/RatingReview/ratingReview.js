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
  sessionStorage.clear();
  document.location.href="../LogoutPage/LogoutPage.html"; // Use relative path (one directory level up)
}
/* ---------------------------------- */


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

  fetchUsername();

    if (window.location.pathname.includes('createRatingReviewPage.html')) {
      
      document.getElementById('createRatingReview').addEventListener('click', submitRatingReviewBtn);
  
      // Get the agent_id from the URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const agent_id = urlParams.get('agent_id');
  
      console.log('Agent ID:', agent_id);
  
      
      // update the back button to include the agent id in the url
      if (agent_id) {
        const backButton = document.getElementById('backButton');
        backButton.href = `/RatingReview/viewRatingReviewPage.html?agent_id=${agent_id}`;
      }
    }
  
  
  });
  
  async function submitRatingReviewBtn() {
  
    event.preventDefault();
    
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
      alert('Please select a rating before submitting.'); // Custom alert
      return;
    }
  
    const rating = ratingInput ? ratingInput.value : null;
    const review = document.getElementById('review').value.trim();
  
    if (!review) {
      alert('Please write a review before submitting.');
      return;
    }
  
    // check if the form is valid
    if (form.checkValidity()) {
  
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
          document.location.href= `/RatingReview/viewRatingReviewPage.html?agent_id=${agent_id}`;
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

/* view rating & reviews js */

// function to fetch all rating and reviews and populate the table
async function fetchAllRatingReviews(agent_id) {
    console.log('Fetching reviews for agent_id:', agent_id); // Debug agent_id

  try {
    const response = await fetch(`/viewRatingReviewRoute/view-rating-reviews/${agent_id}`);
    if (!response.ok) 
      throw new Error('Failed to fetch rating and review');
   
    const data = await response.json();
    console.log('Fetched reviews:', data);
    
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
function displayOverallRating(ratings) {
  const container = document.getElementById("overall-rating");
  
  if (ratings.length === 0) {
    // Display 0 if no reviews are present
    container.innerHTML = `
      <div class="overall-rating-content">
        <div class="star">
          <input type="radio" id="star-overall" name="star" value="star" checked>
          <label for="star-overall"></label>
        </div>
      </div>
      <span class="average-rating-text">0 / 5</span>
    `;
    return;
  }

  // sum all ratings
  const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  
  // Calculate average rating
  const averageRating = (totalRating / ratings.length).toFixed(1); // Round to 1 decimal
  
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
    fetchUsername();

    if (window.location.pathname.includes('viewRatingReviewPage.html')){
        // Extract agent_id from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const agent_id = urlParams.get('agent_id');
        
        if (agent_id) {
        // Call fetchAllRatingReviews with the agent_id if it exists
        fetchAllRatingReviews(agent_id);
        } 
        else {
        console.error('No agent_id found in the URL');
        }
        
        
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
    window.location.href = `../RatingReview/createRatingReviewPage.html?agent_id=${agentId}`; // Redirect to the specified page
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
        document.querySelector('.dropbtn').textContent = data.username;
        document.querySelector('.dropbtn').innerHTML += '<i class="arrow down"></i>';
  
      }
  
      else {
        console.log('Failed to fetch username');
        document.querySelector('.dropbtn').textContent = 'Username'; // Fallback string
        document.querySelector('.dropbtn').innerHTML += '<i class="arrow down"></i>';
      }
    }
  
    catch(error) {
      console.error('Error fetching username:', error);
      document.querySelector('.dropbtn').textContent = 'Username'; // Fallback string on error
      document.querySelector('.dropbtn').innerHTML += '<i class="arrow down"></i>';
  
    }
  }

