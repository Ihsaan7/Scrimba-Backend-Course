import http from "http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
const PORT = 8000;

// const server = http.createServer((req, res) => {
//   const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
//   const pathname = parsedUrl.pathname;

//   if (pathname === "/" && req.method === "GET") {
//     res.writeHead(200, {
//       "content-type": "text/html",
//       "access-control-allow-origin": "*",
//     });
//     res.end("<h1>HOME PAGE</h1>");
//   } else if (pathname === "/vip-lounge" && req.method === "GET") {
//     const loungeAccess = parsedUrl.searchParams.get("secretKey");

//     if (loungeAccess.toLocaleLowerCase() === "gold") {
//       res.writeHead(200, {
//         "content-type": "text/html",
//         "access-control-allow-origin": "*",
//       });
//       res.end("<h1> Welcome to the VIP Oasis! 🌴 </h1>");
//     } else {
//       res.writeHead(301, {
//         location: "/",
//       });
//     }
//   } else {
//     res.writeHead(404, {
//       "content-type": "text/html",
//     });
//     res.end("<h1>NO ROUTE FOUND!</h1>");
//   }
// });

// ================= TASK 2 =======================

// const server = http.createServer((req, res) => {
//   // Getting path to file
//   const __filePath = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filePath);

//   const pathToLogo = path.join(
//     __dirname,
//     "public",
//     "assets",
//     "images",
//     "logo.png",
//   );

//   if (req.url === "/user/profile" && req.method === "GET") {
//     res.writeHead(200, {
//       "content-type": "image/png",
//       "access-control-allow-origin": "*",
//     });
//     res.end(pathToLogo);
//   } else {
//     res.writeHead(404, {
//       "content-type": "text/html",
//     });
//     res.end("<h1>NO ROUTE FOUND!</h1>");
//   }
// });

// =================== TASK 3 ============================

// const server = http.createServer(async (req ,res)=>
//     {

//         const __dirname = fileURLToPath(import.meta.url)

//         if(req.url === "/user/profile" && req.method === "GET")
//             {
//                 try {
//                          const pathToIndex = path.join(__dirname , "public" ,"index.html")

//         const imageBuffer =await fs.readFile(pathToIndex)
//           res.writeHead(
//                     200,
//                     {
//                         "content-type":"image/png",
//                         "access-control-allow-origin":'*'
//                     }
//                 )
//                 res.end(imageBuffer)
//                 } catch (error) {
//                     res.writeHead(
//                             404,
//                             {
//                                  "Content-Type": "text/plain"
//                             }
//                     )
//                     res.end("Image file not found on server storage.");
//                 }

//             }
//         else
//     })

// ===================== TASK 4 ====================

// const server = http.createServer(async (req, res) => {
//   const __filePath = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filePath);

//   const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
//   const pathname = parsedUrl.pathname;

//   const MIME_TYPES = {
//     ".html": "text/html",
//     ".css": "text/css",
//     ".js": "text/javascript",
//   };

//   if (!pathname.startsWith("/api") && req.method === "GET") {
//     try {
//       const fileName = pathname === "/" ? "index.html" : pathname;
//       const filePath = path.join(__dirname, "public", fileName);

//       const ext = path.extname(fileName);
//       const contentType = MIME_TYPES[ext];

//       const fileBuffer = await fs.readFile(filePath);

//       res.writeHead(200, {
//         "content-type": contentType,
//         "access-control-allow-origin": "*",
//       });
//       res.end(fileBuffer);
//     } catch (err) {
//       res.writeHead(404, {
//         "content-type": "text/plain",
//       });
//       res.end("File not Found!");
//     }
//   } else if (pathname === "/api/status" && req.method === "GET") {
//     res.writeHead(200, {
//       "content-type": "application/json",
//       "access-control-allow-origin": "*",
//     });
//     res.end(JSON.stringify({ status: "Api is online" }));
//   } else {
//     res.writeHead(404, {
//       "content-type": "text/plain",
//     });
//     res.end("Route Not Found");
//   }
// });

// ============== TASK 5 MEGA ====================
