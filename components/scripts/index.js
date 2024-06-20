/*
  The TimeManager class manages the display of current time, date, and modal functionality.
*/

class TimeManager {
  constructor() {
    // DOM elements
    this.timeElement = document.getElementById('current-time');
    this.dateElement = document.getElementById('current-date');
    this.modal = document.getElementById('modal');
    this.closeModalBtn = document.querySelector('#modal .close');
  }

  // Update current time and date
  updateTime() {
    const now = new Date();
    this.timeElement.textContent = now.toLocaleTimeString();
    this.dateElement.textContent = now.toDateString();
  }

  // Apply blur effect to elements except the modal
  applyBlur() {
    const elementsToBlur = document.querySelectorAll('body > *:not(#modal)');
    elementsToBlur.forEach(element => {
      element.classList.add('blur');
    });
  }

  // Remove blur effect from elements
  removeBlur() {
    const elementsToBlur = document.querySelectorAll('body > *:not(#modal)');
    elementsToBlur.forEach(element => {
      element.classList.remove('blur');
    });
  }

  // Open the modal and apply blur effect
  openModal() {
    this.modal.style.display = 'block';
    this.applyBlur();
    // Add event listener to close modal when clicking on X button
    this.closeModalBtn.addEventListener('click', () => this.closeModal());
  }

  // Close the modal and remove blur effect
  closeModal() {
    this.modal.style.display = 'none';
    this.removeBlur();
    // Remove event listener for closing modal when it's closed
    this.closeModalBtn.removeEventListener('click', () => this.closeModal());
  }
}

/*
  The UserDataFetcher class fetches user data asynchronously and updates the DOM with the fetched data.
*/
class UserDataFetcher {
  constructor() {
    // DOM elements
    this.nameElement = document.getElementById('name');
    this.idElement = document.getElementById('id');
    this.gradeElement = document.getElementById('grade');
    this.yearbookImg = document.getElementById('yearbook-img'); // Added image element
  }

  // Fetch user data from server
  async fetchUserData() {
    try {
      const response = await fetch('/get-user-data');
      if (!response.ok) {
        throw new Error('Not logged in');
      }
      const userData = await response.json();
      this.updateUserData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  }

  // Update DOM with fetched user data
  updateUserData(userData) {
    this.nameElement.textContent = userData.name || 'N/A';
    this.idElement.textContent = userData.ID || 'N/A';
    this.gradeElement.textContent = userData.grade || 'N/A';
    this.yearbookImg.src = userData.Yearbook || './assets/AnkitKale.png'; // Set yearbook image
  }
}

// Instantiate TimeManager and update time every second
const timeManager = new TimeManager();
setInterval(() => timeManager.updateTime(), 1000);

// Instantiate UserDataFetcher and fetch user data
const userDataFetcher = new UserDataFetcher();
// Add event listener to open modal when clicking on image
document.querySelector('.image-container img').addEventListener('click', () => timeManager.openModal());
userDataFetcher.fetchUserData();
