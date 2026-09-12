
// db.js
import sqlite3 from "sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "tours.db");

const db = new sqlite3.Database(dbPath, (err) =>{
    if (err) console.error("Database connection error:", err.message);
    else console.log("Connected to relational SQLite database. 🗄️");
});

db.serialize(() => {
    // Enable Foreign Key support in SQLite
    db.run("PRAGMA foreign_keys = ON;");

    // 1. Create the guides table
    db.run(`
        CREATE TABLE IF NOT EXISTS guides (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )
    `);

    // 2. Create the tours table with a Foreign Key pointing to guides(id)
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

    // Seed mock data if empty
    db.get("SELECT COUNT(*) as count FROM guides", (err, row) => {
        if (row && row.count === 0) {
            console.log("Seeding guides and relational tours...");
            
            db.run("INSERT INTO guides (name, email) VALUES ('Sarah Connor', 'sarah@tours.com')");
            db.run("INSERT INTO guides (name, email) VALUES ('John Doe', 'john@tours.com')");

            const insertStmt = db.prepare("INSERT INTO tours (name, price, difficulty, guide_id) VALUES (?, ?, ?, ?)");
            insertStmt.run("The Forest Backpacker", 297, "Easy", 1);
            insertStmt.run("The Sea Explorer", 497, "Medium", 1);
            insertStmt.run("The Snow Adventurer", 997, "Hard", 2);
            insertStmt.run("Desert Dune Glider", 197, "Easy", NULL); // Unassigned tour!
            insertStmt.finalize();
            
            console.log("Relational database seeded successfully! 🌱");
        }
    });
});

export default db;
