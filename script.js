
function toggleMenu() {
  let navbar = document.querySelector(".navbar");
  let hamburger = document.querySelector(".hamburger");
  navbar.classList.toggle("open");
  hamburger.classList.toggle("active");
}

  
$('#search-btn').on('click', function () {
  let searchInput = $('#search-input').val().trim();
  let searchMessage = $('#search-message');
  if (searchInput) {
      searchMessage.text(`Searching for "${searchInput}"... Happy exploring!`)
          .removeClass('hidden')
          .css('color', '#28a745');
      setTimeout(() => {
          window.location.href = `search-results.html?q=${encodeURIComponent(searchInput)}`;
      }, 2000);
  } else {
      searchMessage.text("Please enter a search term to proceed.")
          .removeClass('hidden')
          .css('color', '#dc3545');
  }
});


$(document).ready(function () {
  let $carousel = $('.carousel');
  let $slides = $('.carousel-slide');
  let totalSlides = $slides.length;
  let currentIndex = 0;

  function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarouselPosition();
  }

  function updateCarouselPosition() {
      let offset = -100 * currentIndex;
      $carousel.css('transform', `translateX(${offset}%)`);
      updateDots();
  }

  let $dotsContainer = $('<div>', { class: 'carousel-dots' });
  $slides.each(function (index) {
      let $dot = $('<span>');
      $dot.on('click', function () {
          goToSlide(index);
      });
      $dotsContainer.append($dot);
  });
  $carousel.parent().append($dotsContainer);

  function updateDots() {
      $dotsContainer.children('span').each(function (index) {
          $(this).toggleClass('active', index === currentIndex);
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
  
      let email = $("#newsletterEmail").val();
      let $message = $("#newsletterMessage");
  
      if (email) {
        $message.text("Thank you for subscribing!")
                .css("color", "green");
        $("#newsletterEmail").val('');
      } else {
        $message.text("Please enter a valid email address. It should consist of @")
                .css("color", "red");
      }
    });
  });

  