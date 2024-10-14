function toggleNavbar() {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('active');
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbxaj313DuVqK31lwwMgB401ogmYKFA7z9QnJ6UvjkhUbO-_86nhoehmO7ep5whhVRuxww/exec';

// Contact Form Submission
const contactForm = document.forms['submit-to-google-sheet'];
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    fetch(scriptURL, {
      method: 'POST',
      body: new FormData(contactForm)
    })
      .then(response => {
        if (response.ok) {
          alert("Thank you for reaching out! We will get back to you soon.");
          contactForm.reset(); // Optionally reset the form after submission
        } else {
          alert("There was an issue with submitting your message. Please try again.");
        }
      })
      .catch(error => {
        console.error('Error!', error.message);
        alert("There was an error submitting your message. Please try again later.");
      });
  });
}

// Subscription Form Submission
const subscriptionForm = document.forms['subscription-form'];
if (subscriptionForm) {
  subscriptionForm.addEventListener('submit', e => {
    e.preventDefault();

    fetch(scriptURL, {
      method: 'POST',
      body: new FormData(subscriptionForm)
    })
      .then(response => {
        if (response.ok) {
          alert("Thank you for subscribing! You will receive updates soon.");
          subscriptionForm.reset(); // Optionally reset the form after submission
        } else {
          alert("There was an issue with your subscription. Please try again.");
        }
      })
      .catch(error => {
        console.error('Error!', error.message);
        alert("There was an error submitting your subscription. Please try again later.");
      });
  });
}


document.querySelector('.dropdown-btn').addEventListener('click', function () {
  document.querySelector('.dropdown-content').classList.toggle('show');
});


// login name change

document.addEventListener("DOMContentLoaded", function () {
  const userName = localStorage.getItem("userName"); // Get the stored username
  const navbarUserLink = document.getElementById("user-link-navbar");
  const dropdownUserLink = document.getElementById("user-link-dropdown");

  if (userName) {
    // Update both the navbar and dropdown with the username
    if (navbarUserLink) navbarUserLink.textContent = userName;
    if (dropdownUserLink) dropdownUserLink.textContent = userName;
  }
});
