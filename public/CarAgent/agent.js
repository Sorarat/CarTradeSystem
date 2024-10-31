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

/*---------------------*/
/*Create Car Listing - Create Button */
document.addEventListener("DOMContentLoaded", function () {
  const createButton = document.getElementById("createListing");
  const form = document.querySelector("form");


  // Event listener for the Create button
  createButton.addEventListener("click", async function (event) {
      event.preventDefault(); // Prevents the form from submitting immediately

      // Retrieve input values
      const carModel = document.getElementById("carModel").value;
      const regDate = document.getElementById("regDate").value;
      const price = parseInt(document.getElementById("price").value);
      const COE = parseInt(document.getElementById("COE").value);
      const sellerEmail = document.getElementById("sellerEmail").value; 

      /*Checking input value */
      if (!carModel || !regDate || !price || !COE || !sellerEmail) {
        alert("Please fill in all fields.");
        return;
      }
      
      // check if COE months is within 0 to 120
      if (COE < 0 || COE > 120) {
        alert("Please enter a number between 0 and 120");
        return;
      }

      if (!validateCOEMonths(regDate, COE)) {
        alert("Invalid COE months input. Please check the registration date and COE months.");
        return; // Stop form submission if validation fails
      }

      // Check if the form is valid
      if (form.checkValidity()) {
        event.preventDefault(); // Prevent default only if the form is valid
        
        // retrieve agent email from session storage
        const agentEmail = sessionStorage.getItem('email');

        // Create car listing
        try {
          const response = await fetch('/createListingRoute/createListing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ carModel, regDate, price, COE, agentEmail, sellerEmail })
        });

        const data = await response.json();

        if (data.success) {
           /*Success message*/
          alert("Car Listing successfully created!");

            /* Redirect to agent dashboard */
            setTimeout(() => {
              window.location.href = './agentDashboard.html'; 
          }, 3000); /* go back to agent dashboard after 3 sec */
        }
        else {
          alert('Carlisting cannot be created. Please check your input.');
        }

        }
        catch (err) {
          console.error(err);
          alert('An error occurred during creation');
        }
      }

  });
});

function validateCOEMonths(regDate, coeMonths) {
  const totalCOEMonths = 120;
  const registrationDate = new Date(regDate);
  const currentDate = new Date();

  // Get the difference in years and months
  let yearsPassed = currentDate.getFullYear() - registrationDate.getFullYear();
  let monthsPassed = currentDate.getMonth() - registrationDate.getMonth();

  // Calculate total months passed
  let totalMonthsPassed = yearsPassed * 12 + monthsPassed;

  // Adjust for days
  if (currentDate.getDate() < registrationDate.getDate()) {
      totalMonthsPassed -= 1; // Reduce total months by 1 if not yet reached the day of the month
  }

  // Calculate remaining COE months
  const remainingCOEMonths = totalCOEMonths - totalMonthsPassed;
  console.log(remainingCOEMonths);

  // Check if the input COE months are valid
  if (coeMonths !== remainingCOEMonths) {
      return false; // Invalid input
  }

  return true; // Valid input
}

/*---------------------*/
/*View All Car Listing - update button & suspend button */
  function updateRow() {
    const row = document.getElementById('car-data');

    // Loop through each cell in the row
    for (let i = 0; i < row.cells.length - 1; i++) {
        const cell = row.cells[i];
        const cellValue = cell.textContent;
        // Create an input element
        const input = document.createElement('input');
        if(i == 2){
          const dateString = cellValue.trim();
          const [year, month, day] = dateString.split("-");
          const formattedDate = `${year}-${month}-${day}`

          input.type = "date"; 
          input.value = formattedDate;
        }else{
          input.type = 'text'; // Set input type
        }
        input.value = cellValue; // Set current cell value

        // Clear the cell and append the input
        cell.innerHTML = ''; // Clear existing content
        cell.appendChild(input); // Add the input to the cell
    }

    // Change the button to save changes
    const button = document.getElementById('update-button');
    button.textContent = 'Save';
    button.setAttribute('onclick', 'save()'); // Change the button action
  }

  function save() {
    const row = document.getElementById('car-data');
    let allFilled = true; //track if all the input field in filled up

    // Loop through each cell and get the value from the input
    for (let i = 0; i < row.cells.length; i++) {
        const cell = row.cells[i];
        const input = cell.querySelector('input'); // Get the input from the cell

        if(input){
          if (input.value.trim() == '') {
            // cell.textContent = input.value; // Set the cell's text to the input's value
            allFilled = false;
            break;
          }
        cell.textContent = input.type === 'date' ? input.value : input.value;

        }
        
    }
    if(!allFilled){
      alert("Please fill in all the fields before saving.")
      return;
    }

    // Change the button back to update
    const button = document.querySelector('.update-button');
    button.textContent = 'Update';
    button.setAttribute('onclick', 'updateRow()'); // Reset the button action

    alert("Update Successful!");

  }

/* Suspend Button*/ 
  function suspendRow() {
    const row = document.getElementById('car-data');
    const buttons = row.querySelectorAll('button');

    // Disable all buttons in the row
    buttons.forEach(button => {
        button.disabled = true; // Disable the button
        button.style.opacity = 0.5; // Make button appear disabled
    });

    // Change row style to indicate suspension
    row.style.backgroundColor = '#f8d7da'; // Light red background
    row.style.color = '#721c24'; // Dark red text
    row.cells.forEach(cell => {
        cell.style.pointerEvents = 'none'; // Prevent any interaction with the cells
    });
    

}




