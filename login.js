const loginForm = document.querySelector('.login form');

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
        console.log('Login successful');
        alert('Login successful');

        // Store the user's name in localStorage to access it in index.html
        localStorage.setItem('userName', user.username);

        // Redirect to index.html
        window.location.href = "./index.html";
      } else {
        console.log('Invalid email or password');
        alert('Invalid email or password');
      }
    })
    .catch(err => {
      console.error('Error fetching users:', err);
      alert('An error occurred. Please try again later.');
    });
});

