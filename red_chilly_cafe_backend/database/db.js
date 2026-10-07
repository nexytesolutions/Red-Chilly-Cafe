const Database = require("better-sqlite3");
const path = require("path");

// Path to existing or new DB file. Prefer env var, fall back to ./data.sqlite for local dev.
const dbPath = path.resolve(process.env.DATABASE_URL);

const verbose = process.env.NODE_ENV !== "production" ? console.log : undefined;

const db = new Database(dbPath, { verbose });

try {
  db.pragma("busy_timeout = 5000");
  db.pragma("journal_mode = WAL");
} catch (e) {
  console.warn("⚠️ Could not set pragmas:", e && e.message);
}

db.pragma("foreign_keys = ON");


function setupDb() {

  const setup = db.transaction(() => {
    db.exec(`
CREATE TABLE IF NOT EXISTS categories (
category_id TEXT PRIMARY KEY CHECK (LENGTH(category_id) = 7),
name TEXT NOT NULL UNIQUE COLLATE NOCASE CHECK (LENGTH(name) BETWEEN 1 AND 50)
) STRICT;

CREATE TABLE IF NOT EXISTS diet_types (
diet_type_id TEXT PRIMARY KEY CHECK (LENGTH(diet_type_id) = 7),
name TEXT NOT NULL UNIQUE COLLATE NOCASE CHECK (LENGTH(name) BETWEEN 1 AND 50)
) STRICT;

CREATE TABLE IF NOT EXISTS menus (
menu_id TEXT PRIMARY KEY CHECK (LENGTH(menu_id) = 7),
name TEXT NOT NULL UNIQUE COLLATE NOCASE CHECK (LENGTH(name) BETWEEN 1 AND 50),
category_id TEXT NOT NULL CHECK (LENGTH(category_id) = 7),
diet_type_id TEXT NOT NULL CHECK (LENGTH(diet_type_id) = 7),
description TEXT NOT NULL CHECK (LENGTH(description) BETWEEN 1 AND 200),
image_url TEXT NOT NULL CHECK (LENGTH(image_url) BETWEEN 5 AND 150),
regular_price_in_subunits INTEGER NOT NULL CHECK(regular_price_in_subunits >= 0 AND regular_price_in_subunits <= 10000000000),
large_price_in_subunits INTEGER NOT NULL CHECK(large_price_in_subunits >= 0 AND large_price_in_subunits <= 10000000000),
CHECK (large_price_in_subunits >= regular_price_in_subunits),
FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE,
FOREIGN KEY (diet_type_id) REFERENCES diet_types(diet_type_id) ON DELETE CASCADE
) STRICT;

CREATE TABLE IF NOT EXISTS statuses (
status_id TEXT PRIMARY KEY CHECK (LENGTH(status_id) = 7),
name TEXT NOT NULL UNIQUE COLLATE NOCASE CHECK (LENGTH(name) BETWEEN 1 AND 50)
) STRICT;

CREATE TABLE IF NOT EXISTS reviews (
review_id TEXT PRIMARY KEY CHECK (LENGTH(review_id) = 7),
name TEXT NOT NULL CHECK (LENGTH(name) BETWEEN 1 AND 50),
email TEXT NOT NULL UNIQUE COLLATE NOCASE CHECK (LENGTH(email) BETWEEN 6 AND 50),
status_id TEXT NOT NULL CHECK (LENGTH(status_id) = 7),
description TEXT NOT NULL CHECK (LENGTH(description) BETWEEN 1 AND 200),
rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
created_on TEXT DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (status_id) REFERENCES statuses(status_id) ON DELETE CASCADE
) STRICT;

CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY CHECK (id = 1),
username TEXT NOT NULL CHECK (username = 'admin'),
password TEXT NOT NULL CHECK (LENGTH(password) = 60)
)STRICT;

  `);

db.prepare(`
INSERT OR IGNORE INTO categories (category_id, name) VALUES
('AJ#W}I)', 'Pizza'),
('&dYS15E', 'Pasta'),
('|y2x=:x', 'Chicken'),
('$+74T|P', 'Seafood'),
('KdYT,uQ', 'Soup'),
('&7aJLj;', 'Dessert'),
('C=7a)|?', 'Drinks')
  `).run();

  db.prepare(`
INSERT OR IGNORE INTO diet_types (diet_type_id, name) VALUES
('P!mfLn6', 'Veg'),
('j:h1V]p', 'Non-Veg')
  `).run();

    db.prepare(`
INSERT OR IGNORE INTO statuses (status_id, name) VALUES
('&atVp^i', 'Pending'),
('5*2UQ=U', 'Approved'),
('^o)AQw$', 'Hidden')
  `).run();

  });
  setup();
}

// setupDb();

module.exports = { db};
