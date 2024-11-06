document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/loginRoute/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, role })
        });

        const data = await response.json();
        

        if (data.success) {
            console.log('Login successful!');

            // Store the user role in sessionStorage (works only for same tab)
            sessionStorage.setItem('role', role);
            sessionStorage.setItem('email', email);

            if (role === 'admin')
            {
                window.location.href = '/UserAdmin/adminDashboard.html';
            } else if (role === 'agent') {
                window.location.href = '../CarAgent/agentDashboard.html';
            } else {
                window.location.href = '/HomePage/homePage.html';
            }

        } else {
            alert('Login failed. Please check your credentials.'); // Generic error message
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred during login');
    }
});
