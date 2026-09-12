// ─── DYNAMIC STATIC FILE SERVER WITH DETAILED COMMENTS ───
// This server demonstrates how to serve HTML, CSS, and JS files dynamically from a "public" folder

import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";

// ═══════════════════════════════════════════════════════════════
// STEP 0: SETUP - Get the project directory
// ═══════════════════════════════════════════════════════════════

// WHY: In ES modules, we don't have __dirname by default (unlike CommonJS)
// WHAT: fileURLToPath converts import.meta.url to a file path, then we get its directory
// EXAMPLE: import.meta.url = "file:///C:/project/server.js" → "/C:/project"
// RESULT: Now we have __dirname to reference our project root folder
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ═══════════════════════════════════════════════════════════════
// STEP 1: MIME TYPES - Map file extensions to content types
// ═══════════════════════════════════════════════════════════════

// WHY: Browsers need to know what type of data they're receiving
//      Without this, browser might not know how to display the file
// WHAT: This object maps file extensions to their MIME types (content types)
// MIME TYPE: A standard format for describing file types to browsers
// RESULT: When we send a file, the browser knows if it's HTML, CSS, or JavaScript
const MIME_TYPES = {
  ".html": "text/html", // Browser interprets as webpage (renders HTML)
  ".css": "text/css", // Browser interprets as stylesheet (applies styles)
  ".js": "text/javascript", // Browser interprets as JavaScript (runs code)
};

// ═══════════════════════════════════════════════════════════════
// STEP 2: CREATE THE SERVER
// ═══════════════════════════════════════════════════════════════

// WHY: Create an HTTP server to handle incoming requests from browsers
// WHAT: createServer takes a callback function that runs for EVERY request
// PARAMS: (req, res) - request object (what user sent) and response object (what we send back)
// ASYNC: We use "async" because we'll be reading files (which takes time)
const server = http.createServer(async (req, res) => {
  // ─── Parse the incoming URL ───
  // WHY: We need to figure out what file/route the user is asking for
  // WHAT: Extracts the pathname from req.url
  // req.url = just the path, like "/styles.css" or "/api/status"
  // We add host because the URL constructor needs a complete URL to parse properly
  // EXAMPLE: "http://localhost:8000/styles.css" is complete
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  // WHY: Extract just the pathname (the route/path the user requested)
  // WHAT: pathname = the part after domain
  // EXAMPLE: URL is http://localhost:8000/styles.css → pathname = "/styles.css"
  const pathname = parsedUrl.pathname;

  // ═══════════════════════════════════════════════════════════════
  // SECTION A: SERVING STATIC FILES (HTML, CSS, JS)
  // ═══════════════════════════════════════════════════════════════

  // WHY: Check if this is a request for static files (NOT an API request)
  // WHAT: Two conditions must be true:
  //       1. !pathname.startsWith("/api") = pathname doesn't start with "/api"
  //       2. req.method === "GET" = request is to retrieve data (not POST/PUT/DELETE)
  // EXAMPLES:
  //   - "/styles.css" → YES, serve the file ✓
  //   - "/index.html" → YES, serve the file ✓
  //   - "/api/status" → NO, skip this block (goes to API section)
  if (!pathname.startsWith("/api") && req.method === "GET") {
    try {
      // ─── STEP 1: Determine which file to serve ───
      // WHY: Need to figure out which physical file to send back to the browser
      // LOGIC: If user visits root "/", we serve "index.html" (the default home page)
      //        Otherwise, use the pathname directly as the filename
      // TERNARY OPERATOR: condition ? if true : if false
      // EXAMPLES:
      //   - User visits "/" → filename = "index.html"
      //   - User visits "/styles.css" → filename = "/styles.css"
      //   - User visits "/app.js" → filename = "/app.js"
      const filename = pathname === "/" ? "index.html" : pathname;

      // ─── STEP 2: Safely join the path to the public folder ───
      // WHY: path.join() safely combines paths without double slashes or issues
      //      This is CRITICAL for security (prevents directory traversal attacks)
      // WHAT: Creates a full file path pointing to our public folder
      // HOW IT WORKS:
      //   __dirname = "C:/project" (our project root)
      //   "public" = subfolder containing our static files
      //   filename = specific file we want (like "/styles.css")
      // RESULT: Full path = "C:/project/public/styles.css"
      const filePath = path.join(__dirname, "public", filename);

      // ─── STEP 3: Extract the file extension ───
      // WHY: Need to know if this is .html, .css, .js, etc. to set correct Content-Type
      // WHAT: path.extname() returns ONLY the extension from a filename
      // EXAMPLES:
      //   - "styles.css" → ".css"
      //   - "app.js" → ".js"
      //   - "index.html" → ".html"
      const ext = path.extname(filePath);

      // ─── STEP 4: Look up the MIME type from our dictionary ───
      // WHY: Browser needs to know what type of content it's receiving
      //      Without this, browser might not know how to display it
      // WHAT: Search MIME_TYPES object for the extension
      // FALLBACK: Use "application/octet-stream" if extension not recognized
      //           (means "binary file I don't know about")
      // EXAMPLES:
      //   - ext = ".css" → contentType = "text/css"
      //   - ext = ".js" → contentType = "text/javascript"
      //   - ext = ".png" → contentType = "application/octet-stream" (not defined)
      const contentType = MIME_TYPES[ext] || "application/octet-stream";

      // ─── STEP 5: Read the file from disk ───
      // WHY: Get the actual file contents to send to the browser
      // WHAT: fs.readFile() reads the entire file and returns its contents
      // AWAIT: We use "await" because reading from disk is ASYNC (takes time)
      //        Without await, code would continue before file is actually read
      // RESULT: fileBuffer contains the raw binary data of the file
      // EXAMPLE: If file is "styles.css", fileBuffer = all the CSS code as binary
      const fileBuffer = await fs.readFile(filePath);

      // ─── STEP 6: Send the file to the client (browser) ───
      // WHY: Tell the browser what type of data it's getting and send the actual file

      // res.writeHead(): Sets the HTTP response headers (metadata about response)
      //   - 200 = HTTP status code meaning "OK" (file found and will be sent)
      //   - "Content-Type" = header telling browser HOW to interpret the data
      // EXAMPLE:
      //   If we send CSS without "Content-Type: text/css",
      //   browser might try to execute it as JavaScript!
      res.writeHead(200, { "Content-Type": contentType });

      // res.end(): Sends the actual file contents to the browser and closes response
      // WHY: This is where the actual file data travels across the network
      // RESULT: Browser receives the file and displays/executes it
      // EXAMPLE: User sees the HTML rendered, CSS applied, JS running
      res.end(fileBuffer);
    } catch (error) {
      // ─── STEP 7: Handle file not found error ───
      // WHY: If fs.readFile() fails (file doesn't exist), we need to respond gracefully
      //      Instead of crashing, tell user the file wasn't found
      // WHAT: Catch ANY error thrown in the try block
      // COMMON ERROR: ENOENT = "Error: No Entry" (file not found)
      // RESPONSE: Send 404 status code (Not Found) with a plain text message
      // EXAMPLE: User asks for "/nonexistent.css" → 404 File not found!
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found!");
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // SECTION B: HANDLING API REQUESTS
  // ═══════════════════════════════════════════════════════════════

  // WHY: Some routes are for API data (JSON responses), not for serving HTML/CSS files
  // WHAT: If user visits a route that starts with "/api", handle it differently
  // EXAMPLE: "/api/status" should return JSON, not an HTML file

  // Check if this specific API route was requested
  // This is just an example - you can have many API routes here
  else if (pathname === "/api/status") {
    // WHY: Set correct headers for JSON response
    // "application/json" tells browser "I'm sending you structured data, not HTML"
    // Browser will parse it as JSON, not try to display it as a webpage
    res.writeHead(200, { "Content-Type": "application/json" });

    // WHY: Send a JSON object as text
    // JSON.stringify() = convert JavaScript object to JSON string format
    // EXAMPLE: { status: "API is online" } becomes '{"status":"API is online"}'
    // JSON = JavaScript Object Notation (standard format for data exchange)
    res.end(JSON.stringify({ status: "API is online" }));
  }

  // ═══════════════════════════════════════════════════════════════
  // SECTION C: FALLBACK - Route not found
  // ═══════════════════════════════════════════════════════════════

  // WHY: If nothing matched above sections, this route doesn't exist
  // WHAT: Send 404 status with "Route not found" message
  // EXAMPLE: User visits "/invalid-route" → 404 Route not found
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});

// ═══════════════════════════════════════════════════════════════
// START THE SERVER
// ═══════════════════════════════════════════════════════════════

// WHY: Make the server actually listen for incoming connections from browsers
// PORT 8000: Server runs on http://localhost:8000
//            Clients connect here to request files/data
// CALLBACK: Function that runs when server successfully starts
//           Logs a message so we know it's working
// RESULT: Now you can open http://localhost:8000 in your browser!
server.listen(8000, () => console.log("✅ Server listening on port 8000"));

// ═══════════════════════════════════════════════════════════════
// HOW THIS WORKS END-TO-END (Example Flow)
// ═══════════════════════════════════════════════════════════════
//
// USER ACTION: User opens browser and visits http://localhost:8000/styles.css
//
// STEP 1: Server receives the request
//         req.url = "/styles.css"
//         req.headers.host = "localhost:8000"
//
// STEP 2: Parse the URL
//         parsedUrl = new URL("/styles.css", "http://localhost:8000")
//         pathname = "/styles.css"
//
// STEP 3: Check if it's a static file request
//         Is pathname NOT starting with "/api"? → YES ✓
//         Is method GET? → YES ✓
//         → Enter the static file serving block
//
// STEP 4: Determine filename
//         Is pathname === "/"? → NO
//         → Use pathname directly: "styles.css"
//
// STEP 5: Build full path
//         filePath = "C:/project/public/styles.css"
//
// STEP 6: Get extension
//         ext = ".css"
//
// STEP 7: Look up MIME type
//         MIME_TYPES[".css"] = "text/css"
//         contentType = "text/css"
//
// STEP 8: Read file from disk
//         fileBuffer = all CSS code as binary data
//
// STEP 9: Send to browser
//         Send headers: 200 OK, Content-Type: text/css
//         Send body: fileBuffer (the CSS file)
//
// STEP 10: Browser receives it
//          Sees Content-Type: text/css
//          Applies the CSS styling to the webpage
//
// ═══════════════════════════════════════════════════════════════
