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
/* CreateProfile JS*/
/* Create Button */
// Ensure the DOM is fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('createProfile').addEventListener('click', createProfileBtn);
});

async function createProfileBtn(event) {
  const form = document.getElementById('createProfileForm');
  
  // Get input and textarea values
  const role = document.getElementById('role').value.trim();
  const description = document.getElementById('description').value.trim();

  // Check for empty or whitespace-only values
  if (role === "" || description === "") {
    event.preventDefault(); // Prevent form submission
    alert('Both fields are required and cannot be empty or whitespace.'); // Custom alert
    return; // Exit the function
  }

  // Check if the form is valid
  if (form.checkValidity()) {
    event.preventDefault(); // Prevent default only if the form is valid
    console.log(role);
    console.log(description);
    // Create profile...
    try {
      const response = await fetch('/createProfileRoute/createProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role, description })
    });

    const data = await response.json();

    if (data.success) {
      console.log('Profile created successfully');
      alert('User profile created!');
      document.location.href = "./AdminDashboard.html"; // Use relative path
    }
    else {
      alert('Profile cannot be created. Please check your input.');
    }

    }
    catch (err) {
      console.error(err);
      alert('An error occurred during creation');
    }
  }
}

/* Cancel Button - CreateProfile & CreateAccount */
function cancelCreateBtn(event){
  event.preventDefault(); // Prevent the form from submitting
  document.location.href="./AdminDashboard.html"; // Use relative path
}

/* ---------------------------------- */
/* CreateAccount JS */
// Ensure the DOM is fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('createAccount').addEventListener('click', createAccountBtn);

});

async function createAccountBtn(event) {
  const form = document.getElementById('createAccountForm');
  
  // Get input and textarea values
  const role = document.getElementById('role').value.trim();
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const password = document.getElementById('password').value.trim(); // Check to reject whitespace?

  // Check for empty or whitespace-only values
  if (role === "" || username === "" || email === "" || phoneNumber === "" || password === "") {
    event.preventDefault(); // Prevent form submission
    alert('Both fields are required and cannot be empty or whitespace.'); // Custom alert
    return; // Exit the function
  }

  // Check if the form is valid
  if (form.checkValidity()) {
    event.preventDefault(); // Prevent default only if the form is valid

    try {

      const response = await fetch('/createAccountRoute/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, username, phoneNumber, role })
    });

      const data = await response.json();

      if (data.success) {
        alert ('User account created');
        document.location.href = "/UserAdmin/AdminDashboard.html"; 
      }
      else {
        alert('Account creation failed. Please try again.'); 
      }

    
    }

    catch(err) {
      console.error(err);
      alert('An error occurred during account creation');
    }
  }
}

/* ---------------------------------- */
/* ViewAccount JS */

let allAccounts = [];

// function to fetch all user accounts and populate the table
async function fetchAllAccounts() {

  try {
    const response = await fetch('/viewAccountRoute/view-accounts'); 
    allAccounts = await response.json();

    populateAccountTable(allAccounts);

  }

  catch(err) {
    console.error('Failed to fetch accounts: ', err);
    alert('Failed to load accounts. Please try again.');

  }
}

function populateAccountTable(accounts) {

  const tableBody = document.getElementById('accountTable');
    tableBody.innerHTML = ''; // clear previous content

    accounts.forEach(account => {
      const row = document.createElement('tr');

      // Populate table rows with account data
      row.innerHTML = `
          <td><input type="text" class="form-control1" value="${account.username}" readonly></td>
          <td><input type="text" class="form-control1" value="${account.email}" readonly></td>
          <td><input type="text" class="form-control1" value="${account.phone}" readonly></td>
          <td>
              <button class="update-button" onclick="updateAccPageBtn('${account.user_id}')">Update</button>
              <button class="suspend-button" onclick="suspendBtn('${account.user_id}')">Suspend</button>
          </td>
      `;

      tableBody.appendChild(row);
    });
}

// call the fetchAllAccount function when the page loads
document.addEventListener('DOMContentLoaded', function() {
  const accountTable = document.getElementById('accountTable');
  if (accountTable) {
    fetchAllAccounts();
  }
});

/* Search Bar */
function performAccountSearch() {
  const searchInput = document.getElementById('searchEmail').value.trim().toLowerCase();
  const filteredAccounts = allAccounts.filter(account => account.email.toLowerCase().includes(searchInput));

    // If no matches are found, display all accounts
    if (filteredAccounts.length === 0) {
      populateAccountTable(allAccounts);
      alert('No accounts found with this email.');
  } else {
      populateAccountTable(filteredAccounts);
  }
}

function performProfileSearch() {
  const searchInput = document.getElementById('searchRole').value.trim().toLowerCase();
  const filteredProfiles = allProfiles.filter(profile => profile.role.toLowerCase().includes(searchInput));

  // If no matches are found, display all profiles
  if (filteredProfiles.length === 0) {
      populateProfileTable(allProfiles);
      alert('No profile found with this role name.');
  } else {
      populateProfileTable(filteredProfiles);
  }
}

/* Update Button - redirect to UpdateAccount page */
function updateAccPageBtn(event){
  document.location.href="./UpdateAccount.html";  // Use relative path
}

/* Suspend Button - ViewProfile & ViewAccount */
function suspendBtn(event) {
  const card = event.target.closest('.card'); // Get the closest card element
  card.classList.add('disabled');             // Add the 'disabled' class to the card
}

/* ---------------------------------- */
/* ViewProfile JS */
let allProfiles = [];

async function fetchAllProfiles() {
  try {
    const response = await fetch('/viewProfileRoute/view-profiles'); 
    allProfiles = await response.json();

    populateProfileTable(allProfiles);
  }

  catch(err) {
    console.error('Failed to fetch profiles: ', err);
    alert('Failed to load profiles. Please try again.');

  }
}

function populateProfileTable(profiles) {

  const tableBody = document.getElementById('profileTable');
    tableBody.innerHTML = ''; // clear previous content

    profiles.forEach(profile => {
      const row = document.createElement('tr');

      // Populate table rows with account data
      row.innerHTML = `
        <td><input type="text" class="form-control1" value="${profile.role}" readonly></td>
        <td><input type="text" class="form-control2" value="${profile.roleDesc}" readonly></td>
        <td>
            <button class="update-button" type="button" onclick="updateProPageBtn('${profile.profile_id}')">Update</button>
            <button class="suspend-button" type="button" onclick="suspendBtn('${profile.profile_id}')">Suspend</button>
        </td>
    `;


      tableBody.appendChild(row);
    });
}

// call the fetchAllProfile function when the page loads
document.addEventListener('DOMContentLoaded', function() {
  const profileTable = document.getElementById('profileTable');
  if (profileTable) {
    fetchAllProfiles();
  }
});

/* Update Button - redirect to UpdateProfile page */
function updateProPageBtn(event){
  document.location.href="./UpdateProfile.html"; // Use relative path
}

/* ---------------------------------- */
/* UpdateAccount JS */
// Ensure the DOM is fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('updateAccount').addEventListener('click', updateAccountBtn);
});

function updateAccountBtn(event) {
  const form = document.getElementById('updateAccountForm');
  
  // Get input and textarea values
  const role = document.getElementById('role').value.trim();
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const password = document.getElementById('password').value.trim(); // Check to reject whitespace?

  // Check for empty or whitespace-only values
  if (role === "" || username === "" || email === "" || phoneNumber === "" || password === "") {
    event.preventDefault(); // Prevent form submission
    alert('Both fields are required and cannot be empty or whitespace.'); // Custom alert
    return; // Exit the function
  }

  // Check if the form is valid
  if (form.checkValidity()) {
    event.preventDefault(); // Prevent default only if the form is valid

    // Update account info...

    alert('User account updated!');
    document.location.href = "./ViewAccount.html"; // Use relative path
  }
}

/* ---------------------------------- */
/* UpdateProfile JS */
// Ensure the DOM is fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('updateProfile').addEventListener('click', updateProfileBtn);
});

function updateProfileBtn(event) {
  const form = document.getElementById('updateProfileForm');
  
  // Get input and textarea values
  const role = document.getElementById('role').value.trim();
  const description = document.getElementById('description').value.trim();

  // Check for empty or whitespace-only values
  if (role === "" || description === "") {
    event.preventDefault(); // Prevent form submission
    alert('Both fields are required and cannot be empty or whitespace.'); // Custom alert
    return; // Exit the function
  }

  // Check if the form is valid
  if (form.checkValidity()) {
    event.preventDefault(); // Prevent default only if the form is valid

    // Update profile info...

    alert('User profile updated!');
    document.location.href = "./ViewProfile.html"; // Use relative path
  }
}

/* ---------------------------------- */ 

