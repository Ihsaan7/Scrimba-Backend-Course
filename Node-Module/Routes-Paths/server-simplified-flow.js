import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";

// Get current folder path (needed to find your "public" folder later)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Dictionary: what "language" to tell browser for each file type
const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
};

// ═══════════════════════════════════════════════════════════════
// SERVER LOGIC FLOW
// ═══════════════════════════════════════════════════════════════

const server = http.createServer(async (req, res) => {
  // Get the path user asked for (like "/styles.css")
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // ─────────────────────────────────────────────────────────
  // CHECKPOINT 1: Is this a file request? (not an API call?)
  // ─────────────────────────────────────────────────────────
  //
  // WHY CHECK: API requests (like "/api/status") return JSON
  //            File requests (like "/styles.css") return actual files
  //            They need different handling!
  //
  // WHAT WE CHECK:
  //   - Does the path NOT start with "/api"?
  //   - Is the method GET? (GET = "give me this file")
  //
  // IF YES → Go serve a file
  // IF NO → Skip to API section or 404

  if (!pathname.startsWith("/api") && req.method === "GET") {
    try {
      // ─── STEP 1: What file are we looking for? ───
      // USER VISITS "/" → SERVE "index.html" (the home page)
      // USER VISITS "/styles.css" → SERVE "styles.css"
      // USER VISITS "/app.js" → SERVE "app.js"
      const filename = pathname === "/" ? "index.html" : pathname;

      // ─── STEP 2: Build full path to that file ───
      // We keep files in "public" folder
      // So: public/styles.css, public/index.html, public/app.js
      // path.join() = safely combine folder names
      const filePath = path.join(__dirname, "public", filename);

      // ─── STEP 3: What type of file is this? ───
      // Look at the extension (.html, .css, .js)
      // We need this to tell browser how to handle it
      const ext = path.extname(filePath);

      // ─── STEP 4: What should we tell the browser? ───
      // ext = ".css" → tell browser "this is CSS"
      // ext = ".js" → tell browser "this is JavaScript"
      // ext = ".html" → tell browser "this is HTML"
      // This is CRITICAL - browser needs to know!
      const contentType = MIME_TYPES[ext] || "application/octet-stream";

      // ─── STEP 5: Read the actual file ───
      // Go to disk and grab the file contents
      // await = wait until file is actually read (don't rush!)
      const fileBuffer = await fs.readFile(filePath);

      // ─── STEP 6: Send file to browser ───
      // Tell browser: "Here comes content, it's [CSS/JS/HTML]"
      res.writeHead(200, { "Content-Type": contentType });

      // Actually send the file
      res.end(fileBuffer);
    } catch (error) {
      // File doesn't exist or error reading it
      // Send error back to user
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found!");
    }
  }
  // ─────────────────────────────────────────────────────────
  // CHECKPOINT 2: Is this an API request?
  // ─────────────────────────────────────────────────────────
  else if (pathname === "/api/status") {
    // Send JSON data (not a file)
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "API is online" }));
  }
  // ─────────────────────────────────────────────────────────
  // CHECKPOINT 3: Nothing matched? Send 404
  // ─────────────────────────────────────────────────────────
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});

server.listen(8000, () =>
  console.log("✅ Server running on http://localhost:8000"),
);

// ═══════════════════════════════════════════════════════════════
// THE FLOW IN PLAIN ENGLISH
// ═══════════════════════════════════════════════════════════════
//
// 1. USER VISITS SOMETHING
//    Example: http://localhost:8000/styles.css
//
// 2. SERVER ASKS: Is this asking for a file?
//    ✓ NOT starting with "/api"?
//    ✓ Using GET method?
//    → YES? Do the file serving steps below
//
// 3. FIGURE OUT THE FILE
//    - If root "/" → look for index.html
//    - Else → use what they asked for
//    - Example: "/styles.css" → styles.css
//
// 4. BUILD FULL PATH
//    - We store files in "public" folder
//    - Build: /project/public/styles.css
//
// 5. CHECK FILE TYPE
//    - Get extension: .css
//    - This tells us what it is
//
// 6. TELL BROWSER THE TYPE
//    - Look up .css in MIME_TYPES
//    - Get back "text/css"
//    - Tell browser: "Here comes CSS!"
//
// 7. READ FILE FROM DISK
//    - Open styles.css and get contents
//    - Wait for it to finish reading
//
// 8. SEND TO BROWSER
//    - Send headers (200 OK + Content-Type)
//    - Send file contents
//    - Browser receives and displays it
//
// 9. IF FILE DOESN'T EXIST
//    - catch block catches the error
//    - Send 404 Not Found
//    - Tell user file doesn't exist
//
// ═══════════════════════════════════════════════════════════════
// DECISION TREE
// ═══════════════════════════════════════════════════════════════
//
// REQUEST COMES IN
// ↓
// Is it a file request? (not /api, and GET method?)
// ├─ YES → Try to serve the file
// │        ├─ File exists? → Send it ✓
// │        └─ File missing? → Send 404 error
// │
// ├─ Is it /api/status?
// │  └─ YES → Send JSON response
// │
// └─ Nothing matched?
//    └─ Send 404 Route not found
//
// ═══════════════════════════════════════════════════════════════
