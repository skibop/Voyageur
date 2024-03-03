// Function to update the current time and date
function updateTime() {
  // Get the current date and time
  const now = new Date();
  // Get the elements to display the time and date
  const timeElement = document.getElementById('current-time');
  const dateElement = document.getElementById('current-date');

  // Update the text content of the time and date elements
  timeElement.textContent = now.toLocaleTimeString();
  dateElement.textContent = now.toDateString();
}

// Update the time initially and every second
updateTime();
setInterval(updateTime, 1000);

// Event listener for clicking on the image to open the modal
document.querySelector('.image-container img').addEventListener('click', openModal);

// Function to apply blur effect to all elements except the modal
function applyBlur() {
  const elementsToBlur = document.querySelectorAll('body > *:not(#modal)');
  // Add the 'blur' class to each element
  elementsToBlur.forEach(element => {
    element.classList.add('blur');
  });
}

// Function to remove blur effect from all elements
function removeBlur() {
  const elementsToBlur = document.querySelectorAll('body > *:not(#modal)');
  // Remove the 'blur' class from each element
  elementsToBlur.forEach(element => {
    element.classList.remove('blur');
  });
}

// Function to open the modal
function openModal() {
  // Display the modal
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
  // Apply blur effect to elements behind the modal
  applyBlur();
}

// Function to close the modal
function closeModal() {
  // Hide the modal
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  // Remove blur effect from elements behind the modal
  removeBlur();
}

// Function to fetch user data asynchronously
async function fetchUserData() {
  try {
    // Send a GET request to retrieve user data
    const response = await fetch('/get-user-data');

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Not logged in');
    }

    // Parse the JSON response
    const userData = await response.json();

    // Update the HTML elements with the user data
    document.getElementById('name').textContent = userData.name || 'N/A';
    document.getElementById('id').textContent = userData.ID || 'N/A';
    document.getElementById('grade').textContent = userData.grade || 'N/A';
  } catch (error) {
    // Handle errors while fetching user data
    console.error('Error fetching user data:', error.message);
  }
}

// Fetch user data when the page loads
fetchUserData();
