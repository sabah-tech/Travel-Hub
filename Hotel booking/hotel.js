function toggleMenu() {
  let navbar = document.querySelector(".navbar");
  let hamburger = document.querySelector(".hamburger");
  navbar.classList.toggle("open");
  hamburger.classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", function () {
  let counters = document.querySelectorAll(".counter h1");
  
  let animateCounter = (counter) => {
    let target = +counter.getAttribute("data-target");
    let increment = target / 200; 
  
    let updateCount = () => {
      let current = +counter.innerText;
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, 40); 
        } else {
          counter.innerText = target; 
        }
      };
  
      updateCount();
    };
  
    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let counter = entry.target;
            animateCounter(counter);
            observer.unobserve(counter); 
          }
        });
      },
      { threshold: 0.5 } 
    );
  
    counters.forEach((counter) => observer.observe(counter));
  });
  

// Hotel data with availability
let cityHotelsAvailability = {
  paris: { hotels: ["Eiffel Hotel", "Le Meriden"], availability: [true, false] },
  tokyo: { hotels: ["Shibuya Hotel", "Tokyo Tower Inn"], availability: [true, true] },
  rio: { hotels: ["Copacabana Beach Hotel", "Hotel Rio Palace"], availability: [false, true] },
  venice: { hotels: ["Hotel Danieli", "Palazzo Venier"], availability: [true, false] },
  bangkok: { hotels: ["Khao Road Inn", "Bangkok City Hotel"], availability: [true, true] },
  sydney: { hotels: ["Sydney Harbour Hotel", "Bondi Beach Resort"], availability: [false, false] },
};

// Populate hotels dropdown based on selected city
document.getElementById("city").addEventListener("change", function () {
  let city = this.value;
  let hotelDropdown = document.getElementById("hotel");

  // Clear existing hotels
  hotelDropdown.innerHTML = '<option value="">Select a Hotel</option>';

  if (city && cityHotelsAvailability[city]) {
    cityHotelsAvailability[city].hotels.forEach((hotel) => {
      let option = document.createElement("option");
      option.value = hotel;
      option.textContent = hotel;
      hotelDropdown.appendChild(option);
    });
  }
});

// Check hotel availability
document.getElementById("checkAvailability").addEventListener("click", function () {
  let city = document.getElementById("city").value;
  let hotel = document.getElementById("hotel").value;

  if (!city || !hotel) {
    alert("Please select a city and hotel!");
    return;
  }

  let hotelIndex = cityHotelsAvailability[city].hotels.indexOf(hotel);
  let isAvailable = cityHotelsAvailability[city].availability[hotelIndex];

  let statusDiv = document.getElementById("availabilityStatus");
  statusDiv.style.display = "block";

  if (isAvailable) {
    statusDiv.innerHTML = `
      <p style="color: green;">${hotel} is available! <button id="proceedBtn" class="btn">Proceed</button></p>
    `;
    document.getElementById("proceedBtn").addEventListener("click", showProceedModal);
  } else {
    statusDiv.innerHTML = `<p style="color: red;">${hotel} is fully booked.</p>`;
  }
});

// Show the modal for proceeding with booking
function showProceedModal() {
  document.getElementById("proceedModal").style.display = "flex";
}

// Close the proceed modal
document.getElementById("closeProceedModal").addEventListener("click", function () {
  document.getElementById("proceedModal").style.display = "none";
});

// Handle booking confirmation
document.getElementById("proceedForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect booking details
  let city = document.getElementById("city").value;
  let hotel = document.getElementById("hotel").value;
  let arrivalDate = document.getElementById("arrivalDate").value;
  let leaveDate = document.getElementById("leaveDate").value;
  let roomType = document.getElementById("roomType").value;
  let adults = document.getElementById("adults").value;
  let children = document.getElementById("children").value;

  // Hide proceed modal
  document.getElementById("proceedModal").style.display = "none";

  // Populate the summary table
  let summaryTable = document.getElementById("summaryTable");
  summaryTable.innerHTML = `
    <tr>
      <th>Field</th>
      <th>Details</th>
    </tr>
    <tr>
      <td>City</td>
      <td>${city.charAt(0).toUpperCase() + city.slice(1)}</td>
    </tr>
    <tr>
      <td>Hotel</td>
      <td>${hotel}</td>
    </tr>
    <tr>
      <td>Arrival Date</td>
      <td>${arrivalDate}</td>
    </tr>
    <tr>
      <td>Leave Date</td>
      <td>${leaveDate}</td>
    </tr>
    <tr>
      <td>Room Type</td>
      <td>${roomType.charAt(0).toUpperCase() + roomType.slice(1)}</td>
    </tr>
    <tr>
      <td>Adults</td>
      <td>${adults}</td>
    </tr>
    <tr>
      <td>Children</td>
      <td>${children}</td>
    </tr>
  `;

  // Show the summary modal
  let summaryModal = document.getElementById("summaryModal");
  summaryModal.style.display = "flex";
});

// Close the summary modal
document.getElementById("closeSummaryModal").addEventListener("click", function () {
  document.getElementById("summaryModal").style.display = "none";
});
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
  });})



