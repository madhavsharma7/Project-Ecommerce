const loginForm = document.querySelector('.login form');



// Sign In

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailInput = loginForm.querySelector('input[name="email"]').value;
    const passwordInput = loginForm.querySelector('input[name="pswd"]').value;

    console.log(`Attempting login with email: ${emailInput}, password: ${passwordInput}`);

    fetch('https://fakestoreapi.com/users')
        .then(res => res.json())
        .then(users => {
            console.log(users); // Log the entire API response to inspect it

            const user = users.find(user => user.email === emailInput);
            console.log('Matched user:', user); // Log the matched user (if any)

            if (user && user.password === passwordInput) {
                // console.log('Login successful');
                alert('Login successful');

                // Store the user's name in localStorage to access it in index.html
                localStorage.setItem('userName', user.username);

                // Redirect to index.html
                window.location.href = "./index.html";
            } else {
                // console.log('Invalid email or password');
                alert('Invalid email or password');
            }
        })
        .catch(err => {
            //   console.error('Error fetching users:', err);
            alert('An error occurred. Please try again later.');
        });
});



// Sign Up  

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signup');
    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault(); // Prevent form from submitting the default way

            // Get the form data
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Create the user object
            const userData = {
                username: username,
                email: email,
                password: password,
            };

            try {
                // Send the POST request
                const response = await fetch('https://fakestoreapi.com/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                // Parse the response JSON
                const result = await response.json();

                // Log the entire response to see what data is being returned
                console.log('API Response:', result);

                if (response.ok) {
                    // Simplified check (avoid comparing password)
                    if (result.username === username && result.email === email) {
                        alert('Account created successfully!');
                        window.location.href = "./testing.html"; // Redirect to testing.html for testing 
                    } else {
                        console.error('Data mismatch:', result);
                        alert('Failed to sign up: Data mismatch.');
                    }
                } else {
                    console.error('Failed to sign up:', result);
                    alert('Failed to sign up. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Network error. Please try again later.');
            }
        });
    }
});
