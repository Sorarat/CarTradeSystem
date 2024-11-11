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
  fetchUsername();
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
document.addEventListener('DOMContentLoaded', async () => {
  if (window.location.pathname.includes('createAccount.html')) {
    const roleSelect = document.getElementById('role');
  
    try {
        const response = await fetch('/viewProfileRoute/getRoles');
        const roles = await response.json();
        console.log(roles);
        // Populate the select menu
        roles.forEach(role => {
          const option = document.createElement('option');
          option.value = role.profile_id;  // Set profile_id as the option value
          option.textContent = role.role;  // Display role name as text
          roleSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching roles:', error);
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('createAccount').addEventListener('click', createAccountBtn);

});

async function createAccountBtn(event) {
  const form = document.getElementById('createAccountForm');
  
  // Get input and textarea values
  const profile_id = document.getElementById('role').value.trim();  // get profile_id of role
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const password = document.getElementById('password').value.trim(); // Check to reject whitespace?

  // Email validation regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check for empty or whitespace-only values
  if (profile_id === "" || username === "" || email === "" || phoneNumber === "" || password === "") {
    event.preventDefault(); // Prevent form submission
    alert('Both fields are required and cannot be empty or whitespace.'); // Custom alert
    return; // Exit the function
  }

  // Validate email format
  if (!emailPattern.test(email)) {
    event.preventDefault();
    alert('Please enter a valid email address.');
    return;
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
        body: JSON.stringify({ email, password, username, phoneNumber, profile_id })
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
async function fetchAllAccounts(shouldPopulateTable = true) {

  try {
    const response = await fetch('/viewAccountRoute/view-accounts'); 
    allAccounts = await response.json();
    if (shouldPopulateTable) {
      populateAccountTable(allAccounts);
    }
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
      row.setAttribute('data-user-id', account.user_id);

      // check if the account is suspended
      const isSuspended = account.suspendStatus; 

      // Populate table rows with account data
      row.innerHTML = `
          <td><input type="text" class="form-control1" value="${account.username}" readonly></td>
          <td><input type="text" class="form-control1" value="${account.email}" readonly></td>
          <td><input type="text" class="form-control1" value="${account.phone}" readonly></td>
          <td>
              ${isSuspended ? '' : `<button class="update-button" onclick="updateAccPageBtn('${account.user_id}')">Update</button>`}
              ${isSuspended ? '' : ` <button class="suspend-button" onclick="suspendAccount('${account.user_id}')">Suspend</button>`}
              ${isSuspended ? '<span class="suspended-label">Suspended</span>' : ''}
          </td>
      `;

      // If the profile is suspended, gray out the row
      if (isSuspended) {
        row.classList.add('suspended'); // Add the suspended class to gray it out
    }

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
async function performAccountSearch() {
  const searchInput = document.getElementById('searchEmail').value.trim().toLowerCase();

  try {
    const response = await fetch(`/searchAccountRoute/searchAccounts?email=${encodeURIComponent(searchInput)}`);
    const accounts = await response.json();

    // If no matches are found, display all accounts
    // if (accounts.length === 0) {
    //   populateAccountTable(allAccounts);
    //   alert('No accounts found with this email.');
    // } 
    // else {
    //   populateAccountTable(accounts); // display filtered accounts
    // }

    // Ensure `accounts` is an array and check length
    if (Array.isArray(accounts) && accounts.length === 0) {
      populateAccountTable(allAccounts);
      alert('No accounts found with this email.');
    } 
    else if (Array.isArray(accounts)) {
      populateAccountTable(accounts); // display filtered accounts
    } 
    else {
      console.error('Unexpected data format:', accounts);
      alert('An error occurred while retrieving accounts.');
    }
  }

  catch (error) {
    console.error('Failed to perform account search:', error);
    alert('An error occured during the search.');
  }

    
}

async function performProfileSearch() {
  const searchInput = document.getElementById('searchRole').value.trim();

  try {
      const response = await fetch(`/searchProfileRoute/searchProfiles?role=${encodeURIComponent(searchInput)}`);
      const profiles = await response.json();

      if (profiles.length === 0) {
          alert('No profile found with this role name.');
          populateProfileTable(allProfiles); // Display all if no matches
      } else {
          populateProfileTable(profiles); // Display filtered profiles
      }
  } catch (error) {
      console.error('Failed to perform profile search:', error);
      alert('An error occurred during the search.');
  }
}

/* Update Button - redirect to UpdateAccount page */
function updateAccPageBtn(userId){
  document.location.href=`./UpdateAccount.html?userId=${userId}`;  // Use relative path
}

/* Suspend Account */
async function suspendAccount(userId) {
  // Display confirmation prompt
  const confirmAction = confirm("Are you sure you want to suspend this account? This action cannot be undone.");
  if (!confirmAction) {
    return; // Exit if admin clicks "Cancel"
  }

  try {
      const response = await fetch(`/SuspendAccountRoute/suspend/${userId}`, { 
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          }
      });

      // Log the response to see what is being returned
      const responseText = await response.text();
      console.log('Response:', responseText);

      const data = JSON.parse(responseText); // Parse the response as JSON

      if (data.success) {
          alert('Account suspended');

          const accountRow = document.querySelector(`tr[data-user-id="${userId}"]`);
          if (accountRow) {
            accountRow.classList.add('suspended'); // Gray out the row

            // Find the buttons and replace them with the "Suspended" label
            const actionCell = accountRow.querySelector('td:last-child'); // Target the action buttons cell
            actionCell.innerHTML = '<span class="suspended-label">Suspended</span>'; // Replace buttons with 'Suspended' label
          } else {
              console.error(`Row not found for user ID: ${userId}`);
          }
      } else {
          alert('Failed to suspend account. Please try again.');
      }
  } catch (error) {
      console.error('Error suspending account:', error);
      alert('An error occurred while suspending the account.');
  }
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
  tableBody.innerHTML = ''; // Clear previous content

  profiles.forEach(profile => {
      const row = document.createElement('tr');
      row.setAttribute('data-profile-id', profile.profile_id); // Add the data attribute

      // Check if the profile is suspended
      const isSuspended = profile.suspendStatus; // Adjust this based on your actual profile data

      // Populate table rows with account data
      row.innerHTML = `
          <td><input type="text" class="form-control1" value="${profile.role}" readonly></td>
          <td><input type="text" class="form-control2" value="${profile.roleDesc}" readonly></td>
          <td>
              ${isSuspended ? '' : `<button class="update-button" type="button" onclick="updateProPageBtn('${profile.profile_id}')">Update</button>`}
              ${isSuspended ? '' : `<button class="suspend-button" type="button" onclick="suspendProfile('${profile.profile_id}')">Suspend</button>`}
              ${isSuspended ? '<span class="suspended-label">Suspended</span>' : ''}
          </td>
      `;

      // If the profile is suspended, gray out the row
      if (isSuspended) {
          row.classList.add('suspended'); // Add the suspended class to gray it out
      }

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
function updateProPageBtn(profileId){
  document.location.href=`./UpdateProfile.html?profileId=${profileId}`; // Use relative path
}


/* ---------------------------------- */
/* UpdateAccount JS */
// pre-fill update form with account information

document.addEventListener('DOMContentLoaded', async function() {
  if (window.location.pathname.includes('UpdateAccount.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (userId) {
      try {
        const response = await fetch(`/viewAccountRoute/getAccount/${userId}`);
        const userData = await response.json();

         if (userData) {
          // Populate the form fields
          document.getElementById('role').value = userData.role;
          document.getElementById('username').value = userData.username;
          document.getElementById('email').value = userData.email;
          document.getElementById('phoneNumber').value = userData.phone;
          document.getElementById('password').value = userData.password;
        } else {
          alert('Account not found');
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
        alert('Error loading user data');
      }
    }
  }
});



// Ensure the DOM is fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('updateAccount').addEventListener('click', updateAccountBtn);
});

async function updateAccountBtn(event) {
  const form = document.getElementById('updateAccountForm');
  
  // Get input and textarea values
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const password = document.getElementById('password').value.trim(); // Check to reject whitespace?

  // get user id of row to be updated
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');

  console.log(userId);

  // Check for empty or whitespace-only values
  if (username === "" || email === "" || phoneNumber === "" || password === "") {
    event.preventDefault(); // Prevent form submission
    alert('All fields are required and cannot be empty or whitespace.'); // Custom alert
    return; // Exit the function
  }

  // Email validation regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Validate email format
  if (!emailPattern.test(email)) {
    event.preventDefault();
    alert('Please enter a valid email address.');
    return;
  }

  // Check if the form is valid
  if (form.checkValidity()) {
    event.preventDefault(); // Prevent default only if the form is valid

    // Update account info...
    try {
      const response = await fetch(`/updateAccountRoute/updateAccount/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, email, password, username, phoneNumber  })
      })
      
      const data = await response.json();

      if (data.success) {
        console.log('Account updated successfully');
        alert('User account updated!');
        document.location.href = "./ViewAccount.html"; // Use relative path
      }
      else {
        alert('Account cannot be updated. Please check your input.');
      }
    }

    catch (err) {
      console.error(err);
      alert('An error occurred during update');
    }
    

    
  }
}

/* ---------------------------------- */
/* UpdateProfile JS */
// Pre-fill update form with current information
document.addEventListener('DOMContentLoaded', async function () {
  if (window.location.pathname.includes('UpdateProfile.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const profileId = urlParams.get('profileId');

    if (profileId) {
      try {
        const response = await fetch(`/viewProfileRoute/getProfile/${profileId}`);
        const profileData = await response.json();

        if (profileData) {
          // Populate the form fields
          document.getElementById('role').value = profileData.role;
          document.getElementById('description').value = profileData.roleDesc;
        } else {
          alert('Profile not found');
        }
      } catch (error) {
        console.error('Failed to load profile data:', error);
        alert('Error loading profile data');
      }
    }
  }
});


// Ensure the DOM is fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('updateProfile').addEventListener('click', updateProfileBtn);
});

async function updateProfileBtn(event) {
  const form = document.getElementById('updateProfileForm');
  
  // Get input and textarea values
  const description = document.getElementById('description').value.trim();

   // get profile id of row to be updated
   const urlParams = new URLSearchParams(window.location.search);
   const profileId = urlParams.get('profileId');
 
   console.log(profileId);

  // Check for empty or whitespace-only values
  if (description === "") {
    event.preventDefault(); // Prevent form submission
    alert('Description field is required and cannot be empty or whitespace.'); // Custom alert
    return; // Exit the function
  }

  // Check if the form is valid
  if (form.checkValidity()) {
    event.preventDefault(); // Prevent default only if the form is valid

    // Update profile info...
    try {
      const response = await fetch(`/updateProfileRoute/updateProfile/${profileId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
      });

      const data = await response.json();

      if (data.success) {
        console.log('Profile updated successfully');
        alert('User profile updated!');
        document.location.href = "./viewProfile.html"; // Use relative path
      }
      else {
        alert('Profile cannot be updated. Please check your input.');
      }
    }
    catch (err) {
      console.error(err);
      alert('An error occurred during update');
    }
  }
}

/* ---------------------------------- */ 
/* SuspendProfile JS */
async function suspendProfile(profileId) {
  // Display confirmation prompt
  const confirmAction = confirm("Are you sure you want to suspend this profile? This action cannot be undone.");
  if (!confirmAction) {
    return; // Exit if admin clicks "Cancel"
  }

  try {
      const response = await fetch(`/suspendProfileRoute/suspend/${profileId}`, { 
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          }
      });

      // Log the response to see what is being returned
      const responseText = await response.text();
      console.log('Response:', responseText);

      const data = JSON.parse(responseText); // Parse the response as JSON

      if (data.success) {
          alert('Profile suspended');

          const profileRow = document.querySelector(`tr[data-profile-id="${profileId}"]`);
          if (profileRow) {
            profileRow.classList.add('suspended'); // Gray out the row

            // Find the buttons and replace them with the "Suspended" label
            const actionCell = profileRow.querySelector('td:last-child'); // Target the action buttons cell
            actionCell.innerHTML = '<span class="suspended-label">Suspended</span>'; // Replace buttons with 'Suspended' label
          } else {
              console.error(`Row not found for profile ID: ${profileId}`);
          }
      } else {
          alert('Failed to suspend profile. Please try again.');
      }
  } catch (error) {
      console.error('Error suspending profile:', error);
      alert('An error occurred while suspending the profile.');
  }
}

// for top right corner username display
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
  if (window.location.pathname.includes('AdminDashboard.html')) {
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