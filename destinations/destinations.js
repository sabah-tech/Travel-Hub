// Fetch and display the destinations from external JSON file
function fetchDestinations() {
    fetch('destinations.json')
        .then(response => response.json())
        .then(data => {
            const destinations = data.destinations;
            displayDestinations(destinations); // Display all destinations on load
            addFilterEvent(destinations); // Add filtering functionality
        })
        .catch(error => console.error('Error fetching destinations:', error));
}

// Populate Destinations
const destinationGrid = document.getElementById("destination-grid");

function displayDestinations(filteredDestinations) {
    destinationGrid.innerHTML = ""; 
    filteredDestinations.forEach(dest => {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${dest.image}" alt="${dest.name}">
            <h3>${dest.name}</h3>
            <p>Region: ${dest.region}, Type: ${dest.type}</p>
        `;

        // Add hotels for the destination
        dest.hotels.forEach(hotel => {
            let hotelCard = document.createElement("div");
            hotelCard.className = "hotel-card";
            hotelCard.innerHTML = `
                <h4>${hotel.name}</h4>
                <p>${hotel.price}</p>
            `;
            card.appendChild(hotelCard);
        });

        // Create a button that links to another webpage
        let button = document.createElement("a");
        button.className = "destination-button";
        button.href = dest.link;  
        button.textContent = "Explore More";
        button.target = "_blank"; 

        // Append the button to the card
        card.appendChild(button);

        destinationGrid.appendChild(card);
    });
}

// Add event listener for filtering functionality
function addFilterEvent(destinations) {
    document.getElementById("filter-form").addEventListener("input", () => {
        filterDestinations(destinations);
    });
}

// Filter Functionality
function filterDestinations(destinations) {
    let searchQuery = $("#search").val().toLowerCase();
    let travelType = $("#travel-type").val();
    let region = $("#region").val();

    let filtered = destinations.filter(dest => {
        return (
            (searchQuery === "" || dest.name.toLowerCase().includes(searchQuery)) &&
            (travelType === "" || dest.type === travelType) &&
            (region === "" || dest.region === region)
        );
    });

    displayDestinations(filtered);
}

// Hamburger Toggle
function toggleMenu() {
    let navbar = document.querySelector(".navbar");
    let hamburger = document.querySelector(".hamburger");
    navbar.classList.toggle("open");
    hamburger.classList.toggle("active");
}

// Fetch and display destinations when the page loads
fetchDestinations();
