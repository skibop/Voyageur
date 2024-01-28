// Function to toggle dropdown and shift triangle
function toggleDropdown(element) {
    const checkbox = element.previousElementSibling; // Get the associated checkbox
    const answer = element.nextElementSibling; // Get the answer div
    const triangle = element.querySelector('.triangle'); // Get the triangle span
  
    if (checkbox.checked) {
      checkbox.checked = false;
      answer.style.display = 'none';
      triangle.innerHTML = '&#9658;'; // Change triangle to right-pointing
    } else {
      checkbox.checked = true;
      answer.style.display = 'block';
      triangle.innerHTML = '&#9660;'; // Change triangle to down-pointing
    }
}

// Event listener to close dropdowns when clicking outside
document.addEventListener('click', function (event) {
    const dropdowns = document.querySelectorAll('.faq-item');
    dropdowns.forEach(function (dropdown) {
        const checkbox = dropdown.querySelector('.faq-checkbox');
        const answer = dropdown.querySelector('.faq-answer');
        const triangle = dropdown.querySelector('.triangle');
      
        if (!dropdown.contains(event.target)) {
            checkbox.checked = false;
            answer.style.display = 'none';
            triangle.innerHTML = '&#9658;'; // Change triangle to right-pointing
        }
    });
});

// Event listener for clicking on the triangle
document.addEventListener('click', function (event) {
    const triangle = event.target;
    if (triangle.classList.contains('triangle')) {
        const checkbox = triangle.parentElement.previousElementSibling;
        const answer = triangle.parentElement.nextElementSibling;
        toggleDropdown(triangle.parentElement);
    }
});
