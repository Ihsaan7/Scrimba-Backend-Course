Your Mission:
You need to fill in two key areas in the template below:
Inside the listener (logEmitter.on("logRequest", ...)): Use await fs.appendFile(logFilePath, logLine) to write the log text to your computer's drive.
Inside the simulator function (simulateUserVisiting): Emit (announce) the "logRequest" event, passing along the routePath so the background logger knows which page the user visited!
Remember the golden rule from Exercise 1: Register your listeners at the top level, and only emit from the outside/execution points!
Your Starter Template:
import EventEmitter from "node:events";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const **dirname = path.dirname(fileURLToPath(import.meta.url));
const logFilePath = path.join(**dirname, "server.log");

const logEmitter = new EventEmitter();

// 1. Register the ASYNC listener to write to the physical file
logEmitter.on("logRequest", async (routePath) => {
try {
const logLine = `[${new Date().toISOString()}] Request received for: ${routePath}\n`;

        // ─── YOUR CODE HERE (Step 1) ───
        // Task: Use await and fs.appendFile to append 'logLine' to 'logFilePath'

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

}

// 🚀 Testing our setup:
simulateUserVisiting("/home");
simulateUserVisiting("/api/tours");
simulateUserVisiting("/vip-lounge");
Take your time filling in those two sections, paste your code here when you're ready, and we will check it together! 🦾
