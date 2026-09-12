// SERVER PRACTICE
// The server owns the HTTP plumbing and routing:
// - import http and the controller
// - create the request listener
// - parse req.url into a URL object
// - decide which controller handles the route
// - handle unknown routes
// - listen on a port
//
// Keep filtering logic out of this file. The server should direct traffic, not
// decide which tour matches a price or difficulty.

import http from "http";
import { getTours, getTourById} from "./tourController.js";

const PORT = 8001;

const server = http.createServer((req, res) => {
  // Hint 1: req and res only exist inside this callback.
  // req tells you what the browser asked for; res is how you answer it.

  // Hint 2: Convert the request target into a URL object so query strings are easy to read.
  // The second argument supplies a base URL for relative request paths.
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  // Hint 3: pathname is the route without ?maxPrice=... or ?difficulty=....
  const pathname = parsedUrl.pathname;

  // Hint 4: Route matching belongs here. Pass parsedUrl to the controller because
  // the controller needs its searchParams, but let the controller do the filtering.
  if (pathname === "/api/tours" && req.method === "GET") {
    getTours(req, res, parsedUrl);
    return;
  }
  else if(pathname.startsWith("/api/tours") && req.method === "GET")
    {
        const parts = pathname.split("/");
        const tourId = parts[3];

        getTourById(req,res,tourId);
        return
    }

  // Hint 5: Every request needs a response. Finish unknown routes with 404 JSON.
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

// Hint 6: Start the server only after the listener is configured.
server.listen(PORT, () => {
  console.log(`Practice server running at http://localhost:${PORT}`);
});
