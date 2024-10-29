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
});

function createRatingReviewBtn(event) {
  const form = document.getElementById('createRatingReviewForm');
  
  // Get input and textarea values
  const email = document.getElementById('email').value.trim();
  const review = document.getElementById('review').value.trim();

  // Check for empty or whitespace-only values
  if (email === "" || review === "") {
    event.preventDefault(); // Prevent form submission
    alert('Both fields are required and cannot be empty or whitespace.'); // Custom alert
    return; // Exit the function
  }

  const selectedRating = document.querySelector('input[name="rating"]:checked');
  if (!selectedRating) {
      event.preventDefault(); // Prevent form submission
      alert('Please select a rating before submitting.'); // Custom alert
  }

  // Check if the form is valid
  if (form.checkValidity()) {
    event.preventDefault(); // Prevent default only if the form is valid
    console.log(email);
    console.log(review);

    // Create Rating & Review for a particular Used Car Agent...


    // Redirect to buyer dashboard
    alert('Rating & Review created!');
    document.location.href="./buyerDashboardPage.html"; // Use relative path
  }
}
