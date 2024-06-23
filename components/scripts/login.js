/*
  The LoginForm class handles form submission for user login.
*/

class LoginForm {
  constructor() {
    // DOM elements
    this.loginForm = document.getElementById('login-form');
    this.errorMessage = document.getElementById('error-message');
    // Regular expression to validate email format
    this.emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    // Add event listeners to the login form
    this.addEventListeners();
  }

  // Add event listener for form submission
  addEventListeners() {
    this.loginForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      await this.handleSubmit();
    });
  }

  // Handle form submission
  async handleSubmit() {
    const formData = new FormData(this.loginForm); // Get form data
    const username = formData.get('username');
    const password = formData.get('password');

    // Validate username (email format)
    if (!this.emailRegex.test(username)) {
      this.showError('Please enter a valid email address.');
      return;
    }

    try {
      // Send login request to server
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        // If login is successful, redirect to profile page
        window.location.href = response.url;
      } else {
        // If login fails, display error message
        const errorMessageText = await response.text();
        this.showError(errorMessageText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Display error message
  showError(message) {
    this.errorMessage.innerText = message;
    this.errorMessage.style.color = 'red'; // Set text color to red
  }
}

// Initialize LoginForm when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = new LoginForm();
});

function logout() {
  logout();
}
