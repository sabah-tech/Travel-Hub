// Destinations Data with Hotels
const destinations = [
    { name: "Paris", region: "europe", type: "luxury", image: "destinations-imgs/paris.jpg", link:"homepage.html", hotels: [{name: "Hotel Eiffel", price: "$200/night"}, {name: "Le Meridien", price: "$250/night"}] },
    { name: "Tokyo", region: "asia", type: "adventure", image: "destinations-imgs/tokyo.jpg", link:"homepage.html", hotels: [{name: "Shibuya Hotel", price: "$150/night"}, {name: "Tokyo Tower Inn", price: "$180/night"}] },
    { name: "Rio", region: "south-america", type: "budget", image: "destinations-imgs/rio.jpg", link:"homepage.html", hotels: [{name: "Copacabana Beach Hotel", price: "$100/night"}, {name: "Hotel Rio Palace", price: "$120/night"}] },
    { name: "Venice", region: "europe", type: "luxury", image: "destinations-imgs/venice.jpg", link:"homepage.html", hotels: [{name: "Hotel Danieli", price: "$300/night"}, {name: "Palazzo Venier", price: "$350/night"}] },
    { name: "Bangkok", region: "asia", type: "budget", image: "destinations-imgs/bangkok.jpg", link:"homepage.html",hotels: [{name: "Khao San Road Inn", price: "$50/night"}, {name: "Bangkok City Hotel", price: "$70/night"}] },
    { name: "Sydney", region: "australia", type: "adventure", image: "destinations-imgs/sydney.jpg", link:"homepage.html",hotels: [{ name: "Sydney Harbour Hotel", price: "$220/night" },{ name: "Bondi Beach Resort", price: "$180/night" }]},
];

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
         const button = document.createElement("a");
         button.className = "destination-button";
         button.href = dest.link;  // Assuming each destination object has a 'link' property
         button.textContent = "Explore More";
         button.target = "_blank"; // Opens in a new tab (optional)
 
         // Append the button to the card
         card.appendChild(button);

        destinationGrid.appendChild(card);
    });
}

// Filter Functionality
function filterDestinations() {
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const travelType = document.getElementById("travel-type").value;
    const region = document.getElementById("region").value;

    const filtered = destinations.filter(dest => {
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
    const navbar = document.querySelector(".navbar");
    const hamburger = document.querySelector(".hamburger");
    navbar.classList.toggle("open");
    hamburger.classList.toggle("active");
}

// Initial Display
displayDestinations(destinations);
