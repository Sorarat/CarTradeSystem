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
  createButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevents the form from submitting immediately

      // Retrieve input values
      const carModel = document.getElementById("carModel").value;
      const regDate = document.getElementById("regDate").value;
      const price = document.getElementById("price").value;
      const COE = document.getElementById("COE").value;

      /*Checking input value */
      if (!carModel || !regDate || !price || !COE) {
          alert("Please fill in all fields.");
          return;
      }

      /*Success message*/
      alert("Car Listing successfully created!");

       /* Redirect to agent dashboard */
       setTimeout(() => {
        window.location.href = './agentDashboard.html'; 
    }, 3000); /* go back to agent dashboard after 3 sec */

  });
});

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




