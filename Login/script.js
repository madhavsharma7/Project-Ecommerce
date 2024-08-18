document.addEventListener("DOMContentLoaded", function() {
  var showPass = false;

  // Function to toggle password visibility
  function togglePasswordVisibility() {
      var passwordField = document.querySelector('.wrap-input100 input[type="password"]');
      var eyeIcon = document.querySelector('.btn-show-pass i');

      if (showPass) {
          passwordField.type = 'password';
          eyeIcon.classList.remove('fa-eye-slash');
          eyeIcon.classList.add('fa-eye');
      } else {
          passwordField.type = 'text';
          eyeIcon.classList.remove('fa-eye');
          eyeIcon.classList.add('fa-eye-slash');
      }
      // Toggle the state
      showPass = !showPass;
  }

  // Event listener for the eye icon click
  document.querySelector('.btn-show-pass').addEventListener('click', togglePasswordVisibility);
});
