$(document).ready(function () {
  fetch('destinations.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const destinationSelect = document.getElementById('destination-city');
          data.destinations.forEach(destination => {
              const option = document.createElement('option');
              option.value = destination.city;
              option.textContent = `${destination.city}, ${destination.country}`;
              destinationSelect.appendChild(option);
          });

          let destinations = data.destinations;

          document.getElementById('searchBtn').addEventListener('click', function () {
              let departureCity = document.getElementById('departure-city').value;
              let destinationCity = document.getElementById('destination-city').value;
              let departureDate = document.getElementById('departure-date').value;
              let returnDate = document.getElementById('return-date').value;

              if (!departureCity || !destinationCity || !departureDate || !returnDate) {
                  alert('Please fill in all fields.');
                  return;
              }

              let resultsContainer = document.getElementById('resultsContainer');
              resultsContainer.innerHTML = '';

              let searchResults = destinations.filter(destination =>
                  destination.city.toLowerCase() === destinationCity.toLowerCase() &&
                  destination.availableDates.includes(departureDate)
              );

              if (searchResults.length === 0) {
                  resultsContainer.innerHTML = '<p>No results found for the selected criteria.</p>';
                  return;
              }

              searchResults.forEach(result => {
                  const card = document.createElement('div');
                  card.className = 'result-card';
                  card.innerHTML = `
                      <h3>${result.city}, ${result.country}</h3>
                      <p>Ticket Price: ${result.ticketPrice}</p>
                      <p>Travel Time: ${result.travelTime}</p>
                      <button class="book-btn" data-destination="${result.city}">Book Now</button>
                  `;
                  resultsContainer.appendChild(card);
              });

              document.querySelectorAll('.book-btn').forEach(button =>
                  button.addEventListener('click', function (event) {
                      handleBook(event, destinations);
                  })
              );
          });
      })
      .catch(error => {
          console.error('Error loading destinations data:', error);
      });

      function handleBook(event, destinations) {
        let destinationCity = event.target.dataset.destination;
        let destination = destinations.find(dest => dest.city === destinationCity);
    
        let hotelsContainer = document.getElementById('hotelsContainer');
        hotelsContainer.innerHTML = '';
        hotelsContainer.style.display = 'block';
        
    
        if (!destination.hotels || destination.hotels.length === 0) {
            hotelsContainer.innerHTML = '<p>No hotels available for this destination. Proceed to book travel only.</p>';

            showPersonalInfoForm(destination.city, null);
            return;
        }
    
        destination.hotels.forEach(hotel => {
            let hotelCard = document.createElement('div');
            hotelCard.className = 'hotel-card';
            hotelCard.innerHTML = `
                <h3>${hotel.name}</h3>
                <p>Price Per Night: ${hotel.pricePerNight}</p>
                <button class="hotel-book-btn" data-hotel="${hotel.name}" data-destination="${destination.city}">Select Hotel</button>
            `;
            hotelsContainer.appendChild(hotelCard);
        });
    
        document.querySelectorAll('.hotel-book-btn').forEach(button => {
            button.addEventListener('click', function (e) {
              
                let selectedHotel = e.target.dataset.hotel;
                console.log('Selected Hotel:', selectedHotel); 

                showPersonalInfoForm(destination.city, selectedHotel);
            });
        });
    
        let skipButton = document.createElement('button');
        skipButton.textContent = 'Skip Hotel Selection';
        skipButton.className = 'skip-btn';
        skipButton.addEventListener('click', () => showPersonalInfoForm(destination.city, null));
        hotelsContainer.appendChild(skipButton);
    }
    
    function showPersonalInfoForm(destination, hotel) {
        document.getElementById('hotelsContainer').style.display = 'none';
        let personalInfoSection = document.getElementById('personalInfo');
        personalInfoSection.style.display = 'block';
        
        const skipHotelMessage = document.getElementById('skipHotelMessage');
        const hotelSelectedMessage = document.getElementById('HotelselectedMessage');
    
        if (hotel) {
            hotelSelectedMessage.style.display = 'block';
            skipHotelMessage.style.display = 'none';
            hotelSelectedMessage.textContent = `You have selected the hotel "${hotel}". You may proceed with booking your travel.`;
        } else {
            skipHotelMessage.style.display = 'block';
            hotelSelectedMessage.style.display = 'none';
        }
    
        let personalInfoForm = document.getElementById('personalInfoForm');
    
       
        personalInfoForm.onsubmit = function (e) {
            e.preventDefault();
    
            let fullName = document.getElementById('full-name').value;
            let phoneNumber = document.getElementById('phone-number').value;
            let email = document.getElementById('email').value;
    
            let confirmationSection = document.getElementById('confirmation');
            let confirmationMessage = document.getElementById('confirmationMessage');
    
            confirmationMessage.innerHTML = hotel
                ? `Booking successful! Thank you, <strong>${fullName}</strong>. The airlines will contact you at <strong>${phoneNumber}</strong> or via email at <strong>${email}</strong> to confirm your booking for travel to <strong>${destination}</strong> and your reservation at <strong>${hotel}</strong>.`
                : `Booking successful! Thank you, <strong>${fullName}</strong>. The airlines will contact you at <strong>${phoneNumber}</strong> or via email at <strong>${email}</strong> to confirm your booking for travel to <strong>${destination}</strong>.`;
    
            personalInfoSection.style.display = 'none';
            confirmationSection.style.display = 'block';
    
            window.scrollTo({ top: confirmationSection.offsetTop, behavior: 'smooth' });
        };
    }
    
});
function toggleMenu() {
    const navbar = document.querySelector(".navbar");
    const hamburger = document.querySelector(".hamburger");
    navbar.classList.toggle("open");
    hamburger.classList.toggle("active");
}