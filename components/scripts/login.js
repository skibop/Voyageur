document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
  
      const formData = new FormData(loginForm); // Get form data
      const username = formData.get('username');
      const password = formData.get('password');
  
      // Regular expression for email validation
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  
      if (!emailRegex.test(username)) {
        errorMessage.innerText = 'Please enter a valid email address.';
        errorMessage.style.color = 'red'; // Set text color to red
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
          errorMessage.innerText = errorMessageText;
          errorMessage.style.color = 'red'; // Set text color to red
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
  