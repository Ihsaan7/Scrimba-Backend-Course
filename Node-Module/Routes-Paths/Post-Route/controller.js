import { tours } from "./toursData.js";
import EventEmitter from "node:events";

function sanitizeString(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const tourEmitter = new EventEmitter();
tourEmitter.on("tourCreated", (tour) => {
  console.log(
    `\n📣 [EVENT] Live Notification: A new adventure has been added: "${tour.name}" ($${tour.price})!\n`,
  );
});

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

export function createTour(req, res) {
  let body = [];

  req.on("data", (chunk) => {
    try {
      const parsedBody = JSON.parse(Buffer.concat(body).toString());
      if (!parsedBody.name || !parsedBody.price) {
        res.writeHead(400, {
          "content-type": "application/json",
        });
        res.end(JSON.stringify({ error: "Name and Price both required!" }));
        return;
      }

      const newId = tours.length > 0 ? tours[tours.length - 1].id + 1 : 1;
      const newTour = {
        id: newId,
        name: parsedBody.name,
        price: Number(parsedBody.price),
        difficulty: parsedBody.difficulty || "Medium",
      };

      tours.push(newTour);
      tourEmitter.emit("tourCreated", newTour);

      res.writeHead(201, {
        "content-type": "application/json",
      });
      res.end(
        JSON.stringify({
          data: newTour,
          success: "New data successfully added",
        }),
      );
    } catch (err) {
      res.writeHead(404, {
        "content-type": "application/json",
      });
      res.end(JSON.stringify({ error: "Something went wrong!!!" }));
    }
  });
}

export function getLiveUpdates(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  res.write("data: Connected to live tour updates! 🌿\n\n");

  const updateListener = (tour) => {
    res.write(`data: ${JSON.stringify(tour)}\n\n`);
  };
  tourEmitter.on("tourCreated", updateListener);

  req.on("close", () => {
    tourEmitter.off("tourCreated", updateListener);
    res.end();
  });
}
