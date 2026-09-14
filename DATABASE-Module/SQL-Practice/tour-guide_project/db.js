import sqlite3 from "sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "booking_system.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("Database connection error:", err.message);
    else console.log("Connected to SQLite booking system database. 🗄️");
});

db.serialize(() => {
    // Enable Foreign Keys in SQLite
    db.run("PRAGMA foreign_keys = ON;");

    // 1. Guides Table
    db.run(`
        CREATE TABLE IF NOT EXISTS guides (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )
    `);

    // 2. Tours Table
    db.run(`
        CREATE TABLE IF NOT EXISTS tours (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            difficulty TEXT NOT NULL,
            guide_id INTEGER,
            FOREIGN KEY (guide_id) REFERENCES guides(id) ON DELETE SET NULL
        )
    `);

    // 3. Bookings Table
    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            tour_id INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
        )
    `);

    // Seed mock data if empty
    db.get("SELECT COUNT(*) as count FROM tours", (err, row) => {
        if (row && row.count === 0) {
            console.log("Seeding guides, tours, and bookings...");

            db.run("INSERT INTO guides (name, email) SELECT 'Sarah Connor', 'sarah@tours.com' WHERE NOT EXISTS (SELECT 1 FROM guides WHERE name = 'Sarah Connor')");
            db.run("INSERT INTO guides (name, email) SELECT 'John Doe', 'john@tours.com' WHERE NOT EXISTS (SELECT 1 FROM guides WHERE name = 'John Doe')");
            db.run("INSERT INTO guides (name, email) SELECT 'Alice Smith', 'alice@tours.com' WHERE NOT EXISTS (SELECT 1 FROM guides WHERE name = 'Alice Smith')");

            db.run("INSERT INTO tours (name, price, difficulty, guide_id) SELECT 'Forest Backpacker', 297, 'Easy', id FROM guides WHERE name = 'Sarah Connor'");
            db.run("INSERT INTO tours (name, price, difficulty, guide_id) SELECT 'Sea Explorer', 497, 'Medium', id FROM guides WHERE name = 'Sarah Connor'");
            db.run("INSERT INTO tours (name, price, difficulty, guide_id) SELECT 'Snow Adventurer', 997, 'Hard', id FROM guides WHERE name = 'John Doe'");
            db.run("INSERT INTO tours (name, price, difficulty, guide_id) VALUES ('Desert Dune Glider', 197, 'Easy', null)");

            const insertBookings = db.prepare("INSERT INTO bookings (customer_name, tour_id) VALUES (?, ?)");
            insertBookings.run("Michael Scott", 1);
            insertBookings.run("Dwight Schrute", 1);
            insertBookings.run("Jim Halpert", 3);
            insertBookings.finalize();

            console.log("Relational database seeded successfully! 🌱");
        }
    });
});

export default db;
