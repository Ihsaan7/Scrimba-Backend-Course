# Wild Horizon API Practice

This folder is a small exercise. Complete the commented lines in `server.js` and `tourController.js` in this order.

## Responsibility map

| File | Job |
| --- | --- |
| `toursData.js` | Stores the tour data, like a tiny database |
| `server.js` | Creates the HTTP server, parses the URL, matches the route, and calls a controller |
| `tourController.js` | Reads filters, filters the data, writes headers, and sends the response |
| `public/app.js` | Builds a URL in the browser, calls the API, and renders the JSON |

## Practice sequence

1. In `server.js`, uncomment the URL parsing, route check, fallback response, and `server.listen` lines.
2. In `tourController.js`, uncomment the query parameter lines, filtering steps, and JSON response.
3. Run `node server.js` from this folder.
4. Open `public/index.html` in a browser. The page expects the API at `http://localhost:8001`.
5. Try these requests directly:
   - `/api/tours`
   - `/api/tours?maxPrice=360`
   - `/api/tours?difficulty=hard`
   - `/api/tours?maxPrice=500&difficulty=Hard`

## The request journey

`Browser -> server.js route check -> getTours(...) -> filter tours -> res.end(JSON.stringify(...)) -> Browser renders cards`

Remember: `server.js` answers **where should this request go?** The controller answers **what data should this request receive?**
