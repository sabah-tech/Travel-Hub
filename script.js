
  document.addEventListener("DOMContentLoaded", () => {
   let hamburger = document.querySelector(".hamburger");
   let navbar = document.querySelector(".navbar");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navbar.classList.toggle("open");
    });
  });
  
  document.getElementById('search-btn').addEventListener('click', function () {
    let searchInput = document.getElementById('search-input').value.trim();
    let searchMessage = document.getElementById('search-message');
    if (searchInput) {
      searchMessage.textContent = `Searching for "${searchInput}"... Happy exploring!`;
      searchMessage.classList.remove('hidden');
      searchMessage.style.color = "#28a745";
      setTimeout(() => {
        window.location.href = `search-results.html?q=${encodeURIComponent(searchInput)}`;
      }, 2000); 
    } else {
      searchMessage.textContent = "Please enter a search term to proceed.";
      searchMessage.classList.remove('hidden');
      searchMessage.style.color = "#dc3545";
    }
  });



  document.addEventListener("DOMContentLoaded", () => {
    let carousel = document.querySelector('.carousel');
    let slides = document.querySelectorAll('.carousel-slide');
    let totalSlides = slides.length;
    let currentIndex = 0;
  
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides; 
      updateCarouselPosition();
    }
  
    function updateCarouselPosition() {
      let offset = -100 * currentIndex; 
      carousel.style.transform = `translateX(${offset}%)`;
      updateDots();
    }
  
    let dotsContainer = document.createElement('div');
    dotsContainer.classList.add('carousel-dots');
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
    carousel.parentElement.appendChild(dotsContainer);
  
    function updateDots() {
      let dots = dotsContainer.querySelectorAll('span');
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  
    function goToSlide(index) {
      currentIndex = index;
      updateCarouselPosition();
    }
  
    setInterval(nextSlide, 5000); 
  
    updateCarouselPosition();
  });
  //footer subscription form
  $(document).ready(function () {
    $("#newsletterForm").on("submit", function (event) {
      event.preventDefault();
  
      const email = $("#newsletterEmail").val();
      const $message = $("#newsletterMessage");
  
      if (email) {
        $message.text("Thank you for subscribing!")
                .css("color", "green"); 
        $("#newsletterEmail").val(''); 
      } else {
        $message.text("Please enter a valid email address.")
                .css("color", "red");
      }
    });
  });

  