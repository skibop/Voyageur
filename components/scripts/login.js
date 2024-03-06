class LoginForm {
  constructor() {
    this.loginForm = document.getElementById('login-form');
    this.errorMessage = document.getElementById('error-message');
    this.emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    this.addEventListeners();
  }

  addEventListeners() {
    this.loginForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      await this.handleSubmit();
    });
  }

  async handleSubmit() {
    const formData = new FormData(this.loginForm); // Get form data
    const username = formData.get('username');
    const password = formData.get('password');

    if (!this.emailRegex.test(username)) {
      this.showError('Please enter a valid email address.');
      return;
    }

    try {
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

  showError(message) {
    this.errorMessage.innerText = message;
    this.errorMessage.style.color = 'red'; // Set text color to red
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = new LoginForm();
});
