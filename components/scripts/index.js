class TimeManager {
  constructor() {
    this.timeElement = document.getElementById('current-time');
    this.dateElement = document.getElementById('current-date');
    this.modal = document.getElementById('modal');
  }

  updateTime() {
    const now = new Date();
    this.timeElement.textContent = now.toLocaleTimeString();
    this.dateElement.textContent = now.toDateString();
  }

  applyBlur() {
    const elementsToBlur = document.querySelectorAll('body > *:not(#modal)');
    elementsToBlur.forEach(element => {
      element.classList.add('blur');
    });
  }

  removeBlur() {
    const elementsToBlur = document.querySelectorAll('body > *:not(#modal)');
    elementsToBlur.forEach(element => {
      element.classList.remove('blur');
    });
  }

  openModal() {
    this.modal.style.display = 'block';
    this.applyBlur();
  }

  closeModal() {
    this.modal.style.display = 'none';
    this.removeBlur();
  }
}

class UserDataFetcher {
  constructor() {
    this.nameElement = document.getElementById('name');
    this.idElement = document.getElementById('id');
    this.gradeElement = document.getElementById('grade');
  }

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

  updateUserData(userData) {
    this.nameElement.textContent = userData.name || 'N/A';
    this.idElement.textContent = userData.ID || 'N/A';
    this.gradeElement.textContent = userData.grade || 'N/A';
  }
}

// TimeManager instance
const timeManager = new TimeManager();
setInterval(() => timeManager.updateTime(), 1000);

// UserDataFetcher instance
const userDataFetcher = new UserDataFetcher();
document.querySelector('.image-container img').addEventListener('click', () => timeManager.openModal());
userDataFetcher.fetchUserData();
