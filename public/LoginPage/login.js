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

            if (role === 'admin')
            {
                window.location.href = '/UserAdmin/AdminDashboard.html';
            }
            else {
                window.location.href = '/HomePage/HomePage.html';
            }
            /*
            // Redirect user based on role
            if (data.user.role === 'user-admin') {
                window.location.href = '/admin/dashboard';
            } else if (data.user.role === 'used-car-agent') {
                window.location.href = '/agent/dashboard';
            } else if (data.user.role === 'buyer') {
                window.location.href = '/buyer/home';
            } else if (data.user.role === 'seller') {
                window.location.href = '/seller/home';
            }
            */

        } else {
            alert('Login failed. Please check your credentials.'); // Generic error message
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred during login');
    }
});
