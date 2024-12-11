let urlParams = new URLSearchParams(window.location.search);
let searchQuery = urlParams.get('q');

let resultsMessage = document.getElementById('results-message');
let resultsList = document.getElementById('results-list');
let noResultsMessage = document.getElementById('no-results');

if (searchQuery) {
  resultsMessage.textContent = `Here are the results for your search: "${searchQuery}"`;

  if (searchQuery.toLowerCase() === "unknown") {
    resultsList.style.display = "none";
    noResultsMessage.classList.remove('hidden');
  }
} else {
  resultsMessage.textContent = "No search term provided. Redirecting...";
  setTimeout(() => {
    window.location.href = "homepage.html"; 
  }, 3000);
}


document.addEventListener('DOMContentLoaded', () => {
let categoryFilter = document.getElementById('category-filter');
let sortBy = document.getElementById('sort-by');
let resultsList = document.getElementById('results-list');
let noResultsMessage = document.getElementById('no-results');

categoryFilter.addEventListener('change', filterResults);
sortBy.addEventListener('change', sortResults);

function filterResults() {
  let category = categoryFilter.value;
  let results = resultsList.querySelectorAll('li');
  let hasResults = false;

  results.forEach(result => {
    let resultCategory = result.dataset.category;

    if (category === 'all' || resultCategory === category) {
      result.style.display = '';
      hasResults = true;
    } else {
      result.style.display = 'none';
    }
  });

  noResultsMessage.classList.toggle('hidden', hasResults);
}

function sortResults() {
  let sortValue = sortBy.value;
  let results = Array.from(resultsList.querySelectorAll('li'));

  results.sort((a, b) => {
    if (sortValue === 'popularity') {
      return a.dataset.rating > b.dataset.rating ? -1 : 1;
    } else if (sortValue === 'rating') {
      return b.dataset.rating - a.dataset.rating;
    } else if (sortValue === 'price-low-high') {
      return a.dataset.price - b.dataset.price;
    } else if (sortValue === 'price-high-low') {
      return b.dataset.price - a.dataset.price;
    }
  });

  results.forEach(result => resultsList.appendChild(result));
}
});

function toggleMenu() {
let navbar = document.querySelector(".navbar");
let hamburger = document.querySelector(".hamburger");
navbar.classList.toggle("open");
hamburger.classList.toggle("active");
}