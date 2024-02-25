function updateTime() {
  const now = new Date();
  const timeElement = document.getElementById('current-time');
  const dateElement = document.getElementById('current-date');

  timeElement.textContent = now.toLocaleTimeString();
  dateElement.textContent = now.toDateString();
}

updateTime();
setInterval(updateTime, 1000);

document.querySelector('.image-container img').addEventListener('click', openModal);

function applyBlur() {
  const elementsToBlur = document.querySelectorAll('body > *:not(#modal)');
  elementsToBlur.forEach(element => {
    element.classList.add('blur');
  });
}

function removeBlur() {
  const elementsToBlur = document.querySelectorAll('body > *:not(#modal)');
  elementsToBlur.forEach(element => {
    element.classList.remove('blur');
  });
}

function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
  applyBlur();
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  removeBlur();
}

async function fetchUserData() {
  try {
    const response = await fetch('/get-user-data');

    if (!response.ok) {
      throw new Error('Not logged in');
    }

    const userData = await response.json();

    document.getElementById('name').textContent = userData.name || 'N/A';
    document.getElementById('id').textContent = userData.ID || 'N/A';
    document.getElementById('grade').textContent = userData.grade || 'N/A';
  } catch (error) {
    console.error('Error fetching user data:', error.message);
  }
}

fetchUserData();
