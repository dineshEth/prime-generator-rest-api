import Database from "better-sqlite3";

// Using in-memory database instance
const db = new Database(":memory:");

export default db;
