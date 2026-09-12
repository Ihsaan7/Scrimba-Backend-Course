// PSEUDO-CODE ONLY — this is a guide, not a final replacement for your app

// ----------------------------------------------------
// 1) server.js route
// ----------------------------------------------------

// if (pathname === "/api/tours/detailed" && req.method === "GET") {
//   getDetailedTours(req, res);
//   return;
// }

// ----------------------------------------------------
// 2) controller.js function
// ----------------------------------------------------

// export function getDetailedTours(req, res) {
//   const sql = `
//     SELECT
//       tours.id,
//       tours.name AS tour_name,
//       tours.price,
//       guides.name AS guide_name,
//       guides.email AS guide_email
//     FROM tours
//     INNER JOIN guides ON tours.guide_id = guides.id
//   `;

//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       console.error("Detailed tours query failed:", err.message);

//       res.writeHead(500, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ error: "Something went wrong while fetching detailed tours." }));
//       return;
//     }

//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(rows));
//   });
// }

// ----------------------------------------------------
// 3) What this is doing
// ----------------------------------------------------

// - INNER JOIN connects tours.guide_id with guides.id
// - We only get tour rows that actually have a matching guide
// - db.all(...) runs the query and returns an array of objects
// - rows will look like:
//   [
//     {
//       id: 1,
//       tour_name: "The Forest Backpacker",
//       price: 297,
//       guide_name: "Sarah Connor",
//       guide_email: "sarah@tours.com"
//     }
//   ]

// ----------------------------------------------------
// 4) Very short version if you want the real code idea
// ----------------------------------------------------

// export function getDetailedTours(req, res) {
//   const sql = `
//     SELECT tours.id, tours.name AS tour_name, tours.price,
//            guides.name AS guide_name, guides.email AS guide_email
//     FROM tours
//     INNER JOIN guides ON tours.guide_id = guides.id
//   `;

//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       return res.end(JSON.stringify({ error: "DB error" }));
//     }
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(rows));
//   });
// }

// ----------------------------------------------------
// 5) Example route pattern from your app
// ----------------------------------------------------

// else if (pathname === "/api/tours/detailed" && req.method === "GET") {
//   getDetailedTours(req, res);
//   return;
// }

// ----------------------------------------------------
// 6) Important note
// ----------------------------------------------------

// Make sure your server imports the function from controller.js:
// import { getDetailedTours } from "./controller.js";

// and your controller file imports the db instance:
// import db from "./db.js";
