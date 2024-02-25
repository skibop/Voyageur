// script.js
function updateTime() {
  const now = new Date();
  const timeElement = document.getElementById('current-time');
  const dateElement = document.getElementById('current-date');

  // Update time and date elements with current values
  timeElement.textContent = now.toLocaleTimeString();
  dateElement.textContent = now.toDateString();
}

// Call updateTime function initially and every second (to update time continuously)
updateTime();
setInterval(updateTime, 1000);

// Event listener to open the modal when clicking on the yearbook image
document.querySelector('.image-container img').addEventListener('click', openModal);

function applyBlur() {
  const elementsToBlur = document.querySelectorAll('body > *:not(#modal)');
  elementsToBlur.forEach(element => {
    element.classList.add('blur');
  });
}

// Function to remove blur effect
function removeBlur() {
  const elementsToBlur = document.querySelectorAll('body > *:not(#modal)');
  elementsToBlur.forEach(element => {
    element.classList.remove('blur');
  });
}

function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
  applyBlur(); // Apply blur when modal is opened
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  removeBlur(); // Remove blur when modal is closed
}

async function fetchUserData() {
  try {
    const response = await fetch('/get-user-data');

    if (!response.ok) {
      throw new Error('Not logged in');
    }

    const userData = await response.json();

    // Update profile information based on fetched data
    document.getElementById('name').textContent = userData.name || 'N/A';
    document.getElementById('id').textContent = userData.ID || 'N/A'; // Use 'ID' field from your MongoDB document
    document.getElementById('grade').textContent = userData.grade || 'N/A';
  } catch (error) {
    console.error('Error fetching user data:', error.message);
  }
}

// Call fetchUserData function when the page loads
fetchUserData();

