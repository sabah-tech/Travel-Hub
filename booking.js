$(document).ready(function () {
  fetch('destinations.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          let destinationSelect = document.getElementById('destination-city');
          data.destinations.forEach(destination => {
              let option = document.createElement('option');
              option.value = destination.city;
              option.textContent = `${destination.city}, ${destination.country}`;
              destinationSelect.appendChild(option);
          });

          $(document).ready(function () {
            let destinations = data.destinations;
            
            $('#searchBtn').on('click', function () {
                let departureCity = $('#departure-city').val();
                let destinationCity = $('#destination-city').val();
                let departureDate = $('#departure-date').val();
                let returnDate = $('#return-date').val();
        
                if (!departureCity || !destinationCity || !departureDate || !returnDate) {
                    alert('Please fill in all fields.');
                    return;
                }
        
                let $resultsContainer = $('#resultsContainer');
                $resultsContainer.empty();
        
                let searchResults = destinations.filter(destination =>
                    destination.city.toLowerCase() === destinationCity.toLowerCase() &&
                    destination.availableDates.includes(departureDate)
                );
        
                if (searchResults.length === 0) {
                    $resultsContainer.html('<p>No results found for the selected area. Try another selecting another date</p>');
                    return;
                }
        
                searchResults.forEach(result => {
                    let $card = $(`
                        <div class="result-card">
                            <h3>${result.city}, ${result.country}</h3>
                            <p>Ticket Price: ${result.ticketPrice}</p>
                            <p>Travel Time: ${result.travelTime}</p>
                            <button class="book-btn" data-destination="${result.city}">Book Now</button>
                        </div>
                    `);
                    $resultsContainer.append($card);
                });
        
                $('.book-btn').on('click', function (event) {
                    handleBook(event, destinations);
                });
            });
        });        
      })
      .catch(error => {
          console.error('Error loading destinations data:', error);
      });

      function handleBook(event, destinations) {
        let destinationCity = $(event.target).data('destination');
        let destination = destinations.find(dest => dest.city === destinationCity);
    
        let $hotelsContainer = $('#hotelsContainer');
        $hotelsContainer.empty().show();
    
        if (!destination.hotels || destination.hotels.length === 0) {
            $hotelsContainer.html('<p>No hotels available for this destination. Proceed to book travel only.</p>');
            showPersonalInfoForm(destination.city, null);
            return;
        }
    
        destination.hotels.forEach(hotel => {
            let $hotelCard = $(`
                <div class="hotel-card">
                    <h3>${hotel.name}</h3>
                    <p>Price Per Night: ${hotel.pricePerNight}</p>
                    <button class="hotel-book-btn" data-hotel="${hotel.name}" data-destination="${destination.city}">Select Hotel</button>
                </div>
            `);
            $hotelsContainer.append($hotelCard);
        });
    
        $('.hotel-book-btn').on('click', function (e) {
            let selectedHotel = $(e.target).data('hotel');
            console.log('Selected Hotel:', selectedHotel);
    
            showPersonalInfoForm(destination.city, selectedHotel);
        });
    
        let $skipButton = $('<button>', {
            text: 'Skip Hotel Selection',
            class: 'skip-btn',
            click: function () {
                showPersonalInfoForm(destination.city, null);
            }
        });
    
        $hotelsContainer.append($skipButton);
    }
    
    function showPersonalInfoForm(destination, hotel) {
        $('#hotelsContainer').hide();
        let $personalInfoSection = $('#personalInfo');
        $personalInfoSection.show();
    
        let $skipHotelMessage = $('#skipHotelMessage');
        let $hotelSelectedMessage = $('#HotelselectedMessage');
    
        if (hotel) {
            $hotelSelectedMessage.show().text(`You have selected the hotel "${hotel}". You may proceed with booking your travel.`);
            $skipHotelMessage.hide();
        } else {
            $skipHotelMessage.show();
            $hotelSelectedMessage.hide();
        }
    
        $('#personalInfoForm').on('submit', function (e) {
            e.preventDefault();
    
            let fullName = $('#full-name').val();
            let phoneNumber = $('#phone-number').val();
            let email = $('#email').val();
    
            let $confirmationSection = $('#confirmation');
            let $confirmationMessage = $('#confirmationMessage');
    
            $confirmationMessage.html(hotel
                ? `Booking successful! Thank you, <strong>${fullName}</strong>. The airlines will contact you at <strong>${phoneNumber}</strong> or via email at <strong>${email}</strong> to confirm your booking for travel to <strong>${destination}</strong> and your reservation at <strong>${hotel}</strong>.`
                : `Booking successful! Thank you, <strong>${fullName}</strong>. The airlines will contact you at <strong>${phoneNumber}</strong> or via email at <strong>${email}</strong> to confirm your booking for travel to <strong>${destination}</strong>.`);
    
            $personalInfoSection.hide();
            $confirmationSection.show();
    
            $('html, body').animate({ scrollTop: $confirmationSection.offset().top }, 'smooth');
        });
    }
    
    },
);
function toggleMenu() {
    let navbar = document.querySelector(".navbar");
    let hamburger = document.querySelector(".hamburger");
    navbar.classList.toggle("open");
    hamburger.classList.toggle("active");
}