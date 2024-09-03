let currentIndex = 0;
const slides = document.querySelectorAll('.gallery-slide');
const dots = document.querySelectorAll('.dot');

// Function to show the current slide
function showSlide(index) {
  if (index >= slides.length) currentIndex = 0;
  if (index < 0) currentIndex = slides.length - 1;
  
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
  });
  
  slides[currentIndex].classList.add('active');
  dots[currentIndex].classList.add('active');
  
  const slider = document.querySelector('.gallery-slider');
  slider.style.transform = `translateX(${-currentIndex * 100}%)`;
}

// Event listeners for pagination dots
dots.forEach(dot => {
  dot.addEventListener('click', function() {
    currentIndex = parseInt(this.getAttribute('data-slide'));
    showSlide(currentIndex);
  });
});

// Event listeners for keyboard navigation
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    showSlide(++currentIndex);
    resetAutoSlide();  // Reset timer on manual interaction
  } else if (event.key === 'ArrowLeft') {
    showSlide(--currentIndex);
    resetAutoSlide();  // Reset timer on manual interaction
  }
});

// Swipe functionality for touch devices
let startX = 0;
let endX = 0;

document.querySelector('.gallery-container').addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

document.querySelector('.gallery-container').addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  
  if (startX > endX + 50) {
    showSlide(++currentIndex);
  } else if (startX < endX - 50) {
    showSlide(--currentIndex);
  }
  resetAutoSlide();  // Reset timer on manual interaction
});

// Function to move slides with arrow buttons
function moveSlide(direction) {
  currentIndex += direction;
  showSlide(currentIndex);
  resetAutoSlide();  // Reset timer on manual interaction
}

// Automatic slide every 3 seconds
let autoSlide = setInterval(() => {
  showSlide(++currentIndex);
}, 3000);

// Reset the automatic sliding when there's manual interaction
function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    showSlide(++currentIndex);
  }, 3000);
}

showSlide(currentIndex);
