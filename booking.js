document.getElementById('searchBtn').addEventListener('click', function () {
    const departureCity = document.getElementById('departure-city').value;
    const destinationCity = document.getElementById('destination-city').value;
    const departureDate = document.getElementById('departure-date').value;
    const returnDate = document.getElementById('return-date').value;
  
    if (!departureCity || !destinationCity || !departureDate || !returnDate) {
      alert('Please fill in all fields.');
      return;
    }
  
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
  
    const mockResults = [
      { name: 'Hotel Grand', price: '$120/night', rating: '4.5/5' },
      { name: 'Seaside Retreat', price: '$80/night', rating: '4.2/5' },
      { name: 'Mountain Lodge', price: '$150/night', rating: '4.8/5' },
    ];
  
    mockResults.forEach((result) => {
      const card = document.createElement('div');
      card.innerHTML = `
        <h3>${result.name}</h3>
        <p>Price: ${result.price}</p>
        <p>Rating: ${result.rating}</p>
      `;
      resultsContainer.appendChild(card);
    });
  });
  



// Mock data
const mockResults = [
    { name: 'Paris', country: 'France', price: '$200', travelTime: '5 hours' },
    { name: 'Tokyo', country: 'Japan', price: '$500', travelTime: '14 hours' },
    { name: 'New York', country: 'USA', price: '$350', travelTime: '8 hours' },
  ];
  
  const mockHotels = {
    Paris: [
      { name: 'Hotel Parisienne', price: '$120/night' },
      { name: 'Eiffel Suites', price: '$150/night' },
    ],
    Tokyo: [
      { name: 'Tokyo Inn', price: '$100/night' },
      { name: 'Shinjuku Towers', price: '$180/night' },
    ],
    'New York': [
      { name: 'Manhattan View', price: '$200/night' },
      { name: 'Central Park Suites', price: '$250/night' },
    ],
  };
  
  // Search functionality
  document.getElementById('searchBtn').addEventListener('click', function () {
    const departureCity = document.getElementById('departure-city').value;
    const destinationCity = document.getElementById('destination-city').value;
  
    if (!departureCity || !destinationCity) {
      alert('Please fill in all fields.');
      return;
    }
  
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
  
    const searchResults = mockResults.filter(
      (result) => result.name.toLowerCase().includes(destinationCity.toLowerCase())
    );
  
    if (searchResults.length === 0) {
      resultsContainer.innerHTML = '<p>No results found.</p>';
      return;
    }
  
    searchResults.forEach((result) => {
      const card = document.createElement('div');
      card.className = 'result-card';
      card.innerHTML = `
        <h3>${result.name}, ${result.country}</h3>
        <p>Price: ${result.price}</p>
        <p>Travel Time: ${result.travelTime}</p>
        <button class="book-btn" data-destination="${result.name}">Book Now</button>
      `;
      resultsContainer.appendChild(card);
    });
  
    document.querySelectorAll('.book-btn').forEach((button) =>
      button.addEventListener('click', handleBook)
    );
  });
  
  function handleBook(event) {
    const destination = event.target.dataset.destination;
    const hotels = mockHotels[destination] || [];
  
    const hotelsContainer = document.getElementById('hotelsContainer');
    hotelsContainer.innerHTML = '';
  
    // If no hotels are available, allow proceeding without selection
    if (hotels.length === 0) {
      hotelsContainer.innerHTML = '<p>No hotels available for this destination. Proceed to book travel only.</p>';
      showPersonalInfoForm(destination, null);
      return;
    }
  
    // Display available hotels
    hotels.forEach((hotel) => {
      const hotelCard = document.createElement('div');
      hotelCard.className = 'hotel-card';
      hotelCard.innerHTML = `
        <h3>${hotel.name}</h3>
        <p>Price: ${hotel.price}</p>
        <button class="hotel-book-btn" data-hotel="${hotel.name}" data-destination="${destination}">Select Hotel</button>
      `;
      hotelsContainer.appendChild(hotelCard);
    });
  
    document.querySelectorAll('.hotel-book-btn').forEach((button) =>
      button.addEventListener('click', function (e) {
        const hotel = e.target.dataset.hotel;
        showPersonalInfoForm(destination, hotel);
      })
    );
  
    // Add a "Skip Hotel Selection" button
    const skipButton = document.createElement('button');
    skipButton.textContent = 'Skip Hotel Selection';
    skipButton.className = 'skip-btn';
    skipButton.addEventListener('click', () => showPersonalInfoForm(destination, null));
    hotelsContainer.appendChild(skipButton);
  }
  
  // Function to show personal info form
  function showPersonalInfoForm(destination, hotel) {
    document.getElementById('hotelListings').style.display = 'none';
    const personalInfoSection = document.getElementById('personalInfo');
    personalInfoSection.style.display = 'block';
  
    // Update the confirmation message logic
    const personalInfoForm = document.getElementById('personalInfoForm');
    personalInfoForm.onsubmit = function (e) {
      e.preventDefault();
  
      const fullName = document.getElementById('full-name').value;
      const phoneNumber = document.getElementById('phone-number').value;
      const email = document.getElementById('email').value;
  
      const confirmationSection = document.getElementById('confirmation');
      const confirmationMessage = document.getElementById('confirmationMessage');
  
      // Adjust message based on hotel selection
      confirmationMessage.innerHTML = hotel
        ? `Booking successful! Thank you, <strong>${fullName}</strong>. The airlines will contact you at <strong>${phoneNumber}</strong> or via email at <strong>${email}</strong> to confirm your booking for travel to <strong>${destination}</strong> and your reservation at <strong>${hotel}</strong>.`
        : `Booking successful! Thank you, <strong>${fullName}</strong>. The airlines will contact you at <strong>${phoneNumber}</strong> or via email at <strong>${email}</strong> to confirm your booking for travel to <strong>${destination}</strong>.`;
  
      personalInfoSection.style.display = 'none';
      confirmationSection.style.display = 'block';
  
      window.scrollTo({ top: confirmationSection.offsetTop, behavior: 'smooth' });
    };
  }
  
  
  // Handle Hotel Booking
  function handleHotelBook(event) {
    const hotel = event.target.dataset.hotel;
    const confirmationSection = document.getElementById('confirmation');
    const confirmationMessage = document.getElementById('confirmationMessage');
  
    confirmationMessage.textContent = `You have successfully booked at ${hotel}! Thank you for choosing Travel Hub.`;
    confirmationSection.style.display = 'block';
  
    window.scrollTo({ top: confirmationSection.offsetTop, behavior: 'smooth' });
  }
  

  // Handle Hotel Booking
function handleHotelBook(event) {
    const hotel = event.target.dataset.hotel;
    document.getElementById('hotelListings').style.display = 'none';
  
    const personalInfoSection = document.getElementById('personalInfo');
    personalInfoSection.style.display = 'block';
  
    const personalInfoForm = document.getElementById('personalInfoForm');
    personalInfoForm.onsubmit = function (e) {
      e.preventDefault(); // Prevent form submission
  
      const fullName = document.getElementById('full-name').value;
      const phoneNumber = document.getElementById('phone-number').value;
      const email = document.getElementById('email').value;
  
      const confirmationSection = document.getElementById('confirmation');
      const confirmationMessage = document.getElementById('confirmationMessage');
  
      confirmationMessage.innerHTML = `
        Booking successful! Thank you, <strong>${fullName}</strong>.
        The airlines will contact you at <strong>${phoneNumber}</strong> or via email at <strong>${email}</strong> to confirm your booking at <strong>${hotel}</strong>.
      `;
      personalInfoSection.style.display = 'none';
      confirmationSection.style.display = 'block';
  
      window.scrollTo({ top: confirmationSection.offsetTop, behavior: 'smooth' });
    };
  }
  