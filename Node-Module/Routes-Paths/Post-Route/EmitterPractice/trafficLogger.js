import EventEmitter from "node:events";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logFilePath = path.join(__dirname, "server.log");

const logEmitter = new EventEmitter();

// 1. Register the ASYNC listener to write to the physical file
logEmitter.on("logRequest", async (routePath) => {
  try {
    const logLine = `[${new Date().toISOString()}] Request received for: ${routePath}\n`;

    // ─── YOUR CODE HERE (Step 1) ───
    // Task: Use await and fs.appendFile to append 'logLine' to 'logFilePath'
    await fs.appendFile(logFilePath, logLine);

    console.log(`💾 Logged to file: ${routePath}`);
  } catch (err) {
    console.error("❌ Failed to write log to hard drive:", err);
  }
});

// 2. Simulating incoming network traffic
function simulateUserVisiting(routePath) {
  console.log(`\n🚦 Traffic Incoming: User just visited: ${routePath}`);

  // ─── YOUR CODE HERE (Step 2) ───
  // Task: Emit the "logRequest" event and pass the 'routePath' along with it!
  logEmitter.emit("logRequest", routePath);
}

simulateUserVisiting("/home");
simulateUserVisiting("/api/tours");
simulateUserVisiting("/vip-lounge");
