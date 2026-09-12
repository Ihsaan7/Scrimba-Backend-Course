import { tours } from "./toursData.js";

export function getTours(req, res, parsedUrl) {
  const maxPriceParams = parsedUrl.searchParams.get("maxPrice");
  const difficultyParams = parsedUrl.searchParams.get("difficulty");

  const filteredTours = tours;

  if (maxPriceParams) {
    const maxPrice = filteredTours.filter(
      (t) => t.price <= Number(maxPriceParams),
    );
  }
  if (difficultyParams) {
    const difficulty = filteredTours.filter(
      (t) => t.difficulty.toLowerCase() === difficultyParams.toLowerCase(),
    );
  }

  res.writeHead(200, {
    "content-type": "application/json",
  });
  res.end(JSON.stringify(filteredTours));
}

export function getTourById(req, res, tourId) {
  const filteredTours = tours.find((t) => t.id === Number(tourId));

  if (filteredTours) {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(JSON.stringify(filteredTours));
  } else {
    res.writeHead(404, {
      "content-type": "application/json",
    });
    res.end(JSON.stringify({ error: "No tour found with this ID" }));
  }
}
