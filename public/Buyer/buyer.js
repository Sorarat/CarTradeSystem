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