
  document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector(".navbar");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navbar.classList.toggle("open");
    });
  });


  
  document.getElementById('search-btn').addEventListener('click', function () {
    const searchInput = document.getElementById('search-input').value.trim();
    const searchMessage = document.getElementById('search-message');
    
    if (searchInput) {
      // Display a success message with the entered query
      searchMessage.textContent = `Searching for "${searchInput}"... Happy exploring!`;
      searchMessage.classList.remove('hidden');
      searchMessage.style.color = "#28a745";

      // Simulate a search result (can later redirect to a real results page)
      setTimeout(() => {
        window.location.href = `search-results.html?q=${encodeURIComponent(searchInput)}`;
      }, 2000); // Redirect after 2 seconds
    } else {
      // Show an error message if the input is empty
      searchMessage.textContent = "Please enter a search term to proceed.";
      searchMessage.classList.remove('hidden');
      searchMessage.style.color = "#dc3545";
    }
  });



  document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
  
    // Function to show the next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides; // Loop back to first slide
      updateCarouselPosition();
    }
  
    // Update carousel position based on current index
    function updateCarouselPosition() {
      const offset = -100 * currentIndex; // Move the carousel by -100% for each slide
      carousel.style.transform = `translateX(${offset}%)`;
      updateDots();
    }
  
    // Optional: Add navigation dots for better UX
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('carousel-dots');
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
    carousel.parentElement.appendChild(dotsContainer);
  
    // Update active dot
    function updateDots() {
      const dots = dotsContainer.querySelectorAll('span');
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  
    // Go to a specific slide (for navigation dots)
    function goToSlide(index) {
      currentIndex = index;
      updateCarouselPosition();
    }
  
    // Automatically flip slides every 5 seconds
    setInterval(nextSlide, 5000); // 5000ms = 5 seconds
  
    // Initialize the carousel and dots
    updateCarouselPosition();
  });

  document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page on submit
    
    // Get the email input value
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;
    
    // Basic Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      // If the email is valid, show the success message
      document.getElementById('successMessage').style.display = 'block';
      emailInput.value = ''; // Clear the input field after success
      document.getElementById('subscribeBtn').textContent = 'Subscribed'; // Change button text
      document.getElementById('subscribeBtn').disabled = true; // Disable the button after subscription
    } else {
      // If the email is invalid, alert the user
      alert("Please enter a valid email address.");
    }
  });
  
  document.getElementById('accommodation-apply-filters').addEventListener('click', function () {
    const budget = document.getElementById('accommodation-budget').value;
    const rating = document.getElementById('accommodation-rating').value;
    const amenities = document.getElementById('accommodation-amenities').value;
  
    alert(`Filters Applied:\nBudget: ${budget}\nRating: ${rating} Stars\nAmenities: ${amenities}`);
  });
  