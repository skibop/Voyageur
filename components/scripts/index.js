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

function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

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

// Event listener to open the modal when clicking on the image
document.querySelector('.image-container img').addEventListener('click', function() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
  applyBlur(); // Apply blur effect to other elements
});

// Event listener to close the modal
document.querySelector('.close').addEventListener('click', function() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  removeBlur(); // Remove blur effect
});

