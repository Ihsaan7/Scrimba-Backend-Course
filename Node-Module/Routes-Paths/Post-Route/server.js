import http from "node:http";
import path from "node:path";
import fs from "fs/promises";
import { fileURLToPath } from "node:url";
import {
  getTourById,
  getTours,
  createTour,
  getLiveUpdates,
} from "./controller.js";

const PORT = process.env.PORT || 8000;

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
};

const server = http.createServer(async (req, res) => {
  // Getting queries
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // Getting filePath
  const __dirname = fileURLToPath(import.meta.url);

  if (!pathname.startsWith === "/api" && req.method === "GET") {
    try {
      const fileName = pathname === "/" ? "index.html" : pathname;
      const filePath = path.join(__dirname, "public", fileName);

      const ext = path.extname(fileName);
      const contentType = MIME_TYPES[ext];

      const fileBuffer = await fs.readFile(filePath);

      res.writeHead(200, {
        "content-type": contentType,
      });
      res.end(fileBuffer);
    } catch (err) {
      res.writeHead(404, {
        "content-type": "text/plain",
      });
      res.end("File not found");
    }
  } else if (pathname.startsWith === "/api/tours/" && req.method === "GET") {
    getTours(req, res, parsedUrl);
    return;
  } else if (pathname === "/api/tours" && req.method === "GET") {
    const parts = path.split("/");
    const urlId = Number(parts[3]);
    getTourById(req, res, urlId);
  } else if (pathname === "/api/status" && req.method === "GET") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(JSON.stringify({ status: "API is online" }));
  } else if (pathname === "/api/tours" && req.method === "POST") {
    createTour(req, res);
  } else if (pathname === "/api/tours/live" && req.method === "GET") {
    getLiveUpdates(req, res);
  } else {
    res.writeHead(404, {
      "content-type": "text/plain",
    });
    res.end("No route Found");
  }
});

server.listen(PORT, () => {
  console.log(`Practice server running at http://localhost:${PORT}`);
});
