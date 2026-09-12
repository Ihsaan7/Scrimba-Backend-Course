const API_URL = "http://localhost:8000/api/tours";
const toursGrid = document.getElementById("toursGrid");
const maxPriceInput = document.getElementById("maxPrice");
const filterBtn = document.getElementById("filterBtn");
const resetBtn = document.getElementById("resetBtn");

// 1. Core function to fetch and display tours
async function fetchAndRenderTours(url) {
    try {
        toursGrid.innerHTML = "<p>Loading adventures...</p>";
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Could not fetch tours data from API");
        
        const tours = await response.json();
        renderTours(tours);
    } catch (err) {
        toursGrid.innerHTML = `<p style="color: red; font-weight: bold;">❌ Error: ${err.message}</p>`;
    }
}

// Helper to convert data arrays into beautiful HTML cards
function renderTours(toursList) {
    if (toursList.length === 0) {
        toursGrid.innerHTML = "<p>No adventures found within your budget! 🪵</p>";
        return;
    }

    toursGrid.innerHTML = toursList.map(tour => `
        <div class="card">
            <h3>${tour.name}</h3>
            <div class="badge">${tour.difficulty ?? "Standard Expedition"}</div>
            <div class="price">$${tour.price}</div>
        </div>
    `).join("");
}

// 2. Event Listeners
filterBtn.addEventListener("click", () => {
    const maxPrice = maxPriceInput.value;
    if (maxPrice) {
        // Appends the query parameter to the request URL!
        fetchAndRenderTours(`${API_URL}?maxPrice=${maxPrice}`);
    }
});

resetBtn.addEventListener("click", () => {
    maxPriceInput.value = "";
    fetchAndRenderTours(API_URL);
});

// Initial load of all tours on start
fetchAndRenderTours(API_URL);