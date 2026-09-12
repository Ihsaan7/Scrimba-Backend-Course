const API_URL = "http://localhost:8001/api/tours";
const toursGrid = document.querySelector("#toursGrid");
const maxPriceInput = document.querySelector("#maxPrice");
const difficultySelect = document.querySelector("#difficulty");
const requestPreview = document.querySelector("#requestPreview");

function makeRequestUrl() {
  const url = new URL(API_URL);

  if (maxPriceInput.value) {
    url.searchParams.set("maxPrice", maxPriceInput.value);
  }

  if (difficultySelect.value) {
    url.searchParams.set("difficulty", difficultySelect.value);
  }

  return url;
}

function renderTours(tours) {
  if (tours.length === 0) {
    toursGrid.innerHTML = "<p class=\"empty\">No tours match those filters.</p>";
    return;
  }

  toursGrid.innerHTML = tours.map(tour => `
    <article class="tour-card">
      <span class="difficulty">${tour.difficulty}</span>
      <h2>${tour.name}</h2>
      <p>${tour.location}</p>
      <strong>$${tour.price}</strong>
    </article>
  `).join("");
}

async function loadTours() {
  const url = makeRequestUrl();
  requestPreview.textContent = `Request: ${url.pathname}${url.search}`;
  toursGrid.innerHTML = "<p class=\"empty\">Loading tours...</p>";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("The API returned an error.");
    renderTours(await response.json());
  } catch (error) {
    toursGrid.innerHTML = `<p class="empty error">${error.message} Start your completed practice server on port 8001.</p>`;
  }
}

document.querySelector("#filterButton").addEventListener("click", loadTours);
document.querySelector("#resetButton").addEventListener("click", () => {
  maxPriceInput.value = "";
  difficultySelect.value = "";
  loadTours();
});

// This first request will work after you complete server.js and the controller.
loadTours();
