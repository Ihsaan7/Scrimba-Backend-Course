Step 1: Update Your Database (toursData.js)
Right now, your frontend expects each tour to have a difficulty level, but your backend array doesn't have this field.
Open toursData.js.
Add a difficulty property to each of your tour objects.
Use values like "Easy", "Medium", or "Hard".
Example of what your updated array should look like:
export const tours = [
    { id: 1, name: "Deep Forest Trek", price: 299, difficulty: "Medium" },
    { id: 2, name: "Mountain Ridge Climb", price: 499, difficulty: "Hard" },
    // Add a third easy one if you want to test more!
];
Step 2: Update Your Request Handler (toursController.js)
Currently, your getTours function inside toursController.js only looks for the maxPrice parameter. You need to update it to extract and filter by difficulty as well.
Open toursController.js.
Inside the getTours(req, res, parsedUrl) function, grab the "difficulty" query parameter from parsedUrl.searchParams and save it to a variable:
const difficultyParam = parsedUrl.searchParams.get("difficulty");
The Filter Logic Challenge: You need a clean way to handle optional parameters. If a user visits /api/tours, they might provide:
No filters at all (show all tours).
Only maxPrice (e.g. ?maxPrice=300).
Only difficulty (e.g. ?difficulty=Medium).
Both filters at once (e.g. ?maxPrice=500&difficulty=Hard).
💡 Developer Tip for Multi-Filtering: Instead of writing a massive, messy if/else tree, you can start with a copy of all tours and filter it down step-by-step:
let filteredTours = tours;

// 1. If maxPrice is provided, filter the list down
if (maxPriceParam) {
    const maxPrice = Number(maxPriceParam);
    filteredTours = filteredTours.filter(tour => tour.price <= maxPrice);
}

// 2. If difficulty is provided, filter the remaining list down
if (difficultyParam) {
    // Write your code here to filter filteredTours by difficulty!
    // Make sure it is case-insensitive (optional but recommended!)
}

// 3. Send back the final filteredTours array!
res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
});
res.end(JSON.stringify(filteredTours));
Step 3: Test Your Solution! 🧪
Once you write this logic, restart your Node.js server (node server.js) and test these three URLs in your browser to make sure the filtering works perfectly:
Test Price Filter only: http://localhost:8000/api/tours?maxPrice=300
Test Difficulty Filter only: http://localhost:8000/api/tours?difficulty=Hard
Test Both together: http://localhost:8000/api/tours?maxPrice=500&difficulty=Hard