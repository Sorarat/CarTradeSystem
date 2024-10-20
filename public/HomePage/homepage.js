function logoutBtn(event){
    event.preventDefault(); // Prevent the form from submitting
    document.location.href = "../LogoutPage/LogoutPage.html"; // Use relative path (one directory level up)
}