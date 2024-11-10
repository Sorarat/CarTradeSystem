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

// View all car listings
let sellerCarListings = [];

async function fetchSellerListings() {
  // get buyer email
  const sellerEmail = sessionStorage.getItem('email');

  try {
    const response = await fetch(`/viewSellerCarlistingRoute/viewSellerListing/${sellerEmail}`); 
    sellerCarListings = await response.json();

    populateSellerListingTable(sellerCarListings);
  }

  catch(err) {
    console.error('Failed to fetch seller listings: ', err);
    alert('Failed to load seller listings. Please try again.');

  }
}

function populateSellerListingTable(sellerListings) {
  const tableBody = document.getElementById('car-info-table');
  tableBody.innerHTML = ''; // Clear previous content

  sellerListings.forEach(car => {
    // Table header with car make/model and price
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const makeModelTh = document.createElement('th');
    makeModelTh.textContent = 'Car Make / Model';
    const makeModelTd = document.createElement('td');
    makeModelTd.textContent = car.car_model;

    const priceTh = document.createElement('th');
    priceTh.textContent = 'Price';
    const priceTd = document.createElement('td');
    priceTd.textContent = `$${car.price}`;

    const eyeTh = document.createElement('th');
    const eyeTd = document.createElement('td');
    const eyeDiv = document.createElement('div');
    eyeDiv.className = 'eye';
    const eyeIcon = document.createElement('i');
    eyeIcon.className = 'fa fa-eye';
    const eyeText = document.createElement('p');
    eyeText.textContent = `${car.num_views} views`;  // Replace with actual view count for the car
    eyeDiv.appendChild(eyeIcon);
    eyeDiv.appendChild(eyeText);
    eyeTd.appendChild(eyeDiv);

    headerRow.appendChild(makeModelTh);
    headerRow.appendChild(makeModelTd);
    headerRow.appendChild(priceTh);
    headerRow.appendChild(priceTd);
    headerRow.appendChild(eyeTh);
    headerRow.appendChild(eyeTd);
    thead.appendChild(headerRow);
    tableBody.appendChild(thead);

    // Table body with registration date and favorites
    const tbody = document.createElement('tbody');
    const bodyRow = document.createElement('tr');

    const regDateTh = document.createElement('th');
    regDateTh.textContent = 'Reg Date';
    const regDateTd = document.createElement('td');
    regDateTd.textContent = car.reg_date;  // Replace with actual registration date

    const emptyTh = document.createElement('th');
    const emptyTd = document.createElement('td');

    const heartTh = document.createElement('th');
    const heartTd = document.createElement('td');
    const heartDiv = document.createElement('div');
    heartDiv.className = 'heart';
    const heartIcon = document.createElement('i');
    heartIcon.className = 'material-icons red-heart';
    heartIcon.style.fontSize = '20px';
    heartIcon.textContent = 'favorite';
    const heartText = document.createElement('p');
    heartText.textContent = `${car.num_shortlist} favourites`;  // Replace with actual favorites count
    heartDiv.appendChild(heartIcon);
    heartDiv.appendChild(heartText);
    heartTd.appendChild(heartDiv);

    bodyRow.appendChild(regDateTh);
    bodyRow.appendChild(regDateTd);
    bodyRow.appendChild(emptyTh);
    bodyRow.appendChild(emptyTd);
    bodyRow.appendChild(heartTh);
    bodyRow.appendChild(heartTd);
    tbody.appendChild(bodyRow);
    tableBody.appendChild(tbody);
});

}

// call the fetchAllProfile function when the page loads
document.addEventListener('DOMContentLoaded', function() {
  fetchUsername();
  const sellerListingTable = document.getElementById('car-info-table');
  if (sellerListingTable) {
    fetchSellerListings();
  }
});



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

// for dashboard account details display
document.addEventListener('DOMContentLoaded', async () => {
  if (window.location.pathname.includes('sellerDashboard.html')) {
    const email = sessionStorage.getItem('email');

    try {
      const response = await fetch(`/viewAccountRoute/fetch-personal-account/${email}`);
      const data = await response.json();
      
      // Populate the HTML with user data
      document.getElementById('username').textContent = data.username;
      document.getElementById('email').textContent = data.email;
      document.getElementById('phoneNumber').textContent = data.phone;
      
    } catch (error) {
        console.error('Error fetching user information:', error);
    }
  }
});

