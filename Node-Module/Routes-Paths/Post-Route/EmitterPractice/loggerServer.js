import EventEmitter from "node:events";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Get the folder path where this file is located
// We need this to save the log file in the same directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logFilePath = path.join(__dirname, "server.log");

// Step 1: Create the emitter
// This emitter will announce when users visit routes
const logEmitter = new EventEmitter();

// Step 2: Register the ASYNC listener to write logs to disk
// This listener waits for "logRequest" events
// When it gets one, it saves the visit to a physical file on your computer
logEmitter.on("logRequest", async (routePath) => {
  try {
    // Create a log line with the current time and which route was visited
    const logLine = `[${new Date().toISOString()}] Request received for: ${routePath}\n`;

    // SOLUTION TO STEP 1:
    // Use fs.appendFile to add this log line to the file
    // The 'await' makes sure we wait for the file to be written before continuing
    await fs.appendFile(logFilePath, logLine);

    // Show a success message in the console
    console.log(`💾 Logged to file: ${routePath}`);
  } catch (err) {
    // If something goes wrong, show an error message
    console.error("❌ Failed to write log to hard drive:", err);
  }
});

// Step 3: Create a function to simulate user visits
// This function simulates what happens when a user visits a route
function simulateUserVisiting(routePath) {
  // Show in console that a user is visiting
  console.log(`\n🚦 Traffic Incoming: User just visited: ${routePath}`);

  // SOLUTION TO STEP 2:
  // Emit the "logRequest" event and pass the routePath
  // This tells our listener "Hey! Someone visited this route!"
  // The listener will then save it to the file
  logEmitter.emit("logRequest", routePath);
}

// Step 4: Test the setup
// Simulate three users visiting different routes
// Each visit will trigger the logger to save to the file
simulateUserVisiting("/home");
simulateUserVisiting("/api/tours");
simulateUserVisiting("/vip-lounge");

// Expected Behavior:
// 1. Console shows: "🚦 Traffic Incoming: User just visited: [route]"
// 2. File listener catches the event and writes to server.log
// 3. Console shows: "💾 Logged to file: [route]"
// 4. Check your EmitterPractice folder - you should see a server.log file created!
// 5. Open server.log to see all the timestamps and routes that were visited
