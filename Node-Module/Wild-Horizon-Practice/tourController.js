// CONTROLLER PRACTICE
// The controller owns the answer to a request:
// - read filter values that server.js passes in
// - filter the tours
// - choose the status code and response headers
// - send the JSON response
//
// It should NOT create the server, listen on a port, or decide how URLs are routed.

import { tours } from "./toursData.js";

export function getTours(req, res, parsedUrl) {
  // Hint 1: Read optional query parameters from parsedUrl.searchParams.
  const maxPriceParam = parsedUrl.searchParams.get("maxPrice");
  const difficultyParam = parsedUrl.searchParams.get("difficulty");

  // Hint 2: Start with the complete list. filter() returns a new array.
  let filteredTours = tours;

  // Hint 3: Only apply the price filter when the user supplied maxPrice.
  // Convert the query string to a number before comparing it with tour.price.
  if (maxPriceParam) {
    const maxPrice = Number(maxPriceParam);
    filteredTours = filteredTours.filter(tour => tour.price <= maxPrice);
  }

  // Hint 4: Then apply difficulty to the already-filtered list.
  // Make both values lowercase so "hard" and "Hard" match.
  if (difficultyParam) {
    filteredTours = filteredTours.filter(
      tour => tour.difficulty.toLowerCase() === difficultyParam.toLowerCase()
    );
  }

  // Hint 5: An empty array is still a valid successful result.
  // Send 200 with JSON and allow the browser frontend to call this API.
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(JSON.stringify(filteredTours));
}

// Optional extension after the main exercise:
export function getTourById(req, res, tourId) {
  // Find one tour, send it as JSON, or send a 404 error.
  const filteredTourId = tours.filter(t => t.id === tourId)
  if(filteredTourId)
    {
        res.writeHead(
            200,
            {
                "content-type":"application/json",
                "Access-Control-Allow-Origin": "*"
            }
        )
        res.end(JSON.stringify(filteredTourId))
    }
  else
    {
         res.writeHead(
            404,
            {
                "content-type":"application/json",
            }
        )
        res.end(JSON.stringify({error:"No tour found with that id!"}))
    }
}
