import db from "./db.js";

// insert user
const insertUser = (email, name, password) => {
    // recives hashed password
    const stmt = db.prepare(`
        INSERT INTO users (email, name, password) VALUES (?, ?, ?)
    `);
    const info = stmt.run(email, name, password);
    return info.lastInsertRowid;
}

// insert log
const insertLog = (range_start, range_end, time_elapsed, primes_count, strategy, user_id) => {
    const stmt = db.prepare(`
        INSERT INTO logs (range_start, range_end, time_elapsed, primes_count, strategy, user_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(range_start, range_end, time_elapsed, primes_count, strategy, user_id);
    return info.lastInsertRowid;
}

// get all logs with user and strategy details
const getAllLogs = () => {
    const stmt = db.prepare(`
        SELECT logs.id, logs.timestamp, logs.range_start, logs.range_end, logs.time_elapsed, logs.primes_count, users.name AS user_name, logs.strategy AS strategy_symbol, strategies.name AS strategy_name
        FROM logs
        JOIN users ON logs.user_id = users.id
        JOIN strategies ON logs.strategy = strategies.symbol;
    `);
    return stmt.all();
}

// get user's logs by user id
const getLogsByUserId = (user_id) => {
    const stmt = db.prepare(`
        SELECT logs.id, logs.timestamp, logs.range_start, logs.range_end, logs.time_elapsed, logs.primes_count, logs.strategy AS strategy_symbol, strategies.name AS strategy_name    
        FROM logs
        JOIN users ON logs.user_id = users.id
        JOIN strategies ON logs.strategy = strategies.symbol
        WHERE users.id = ?  
    `);
    return stmt.all(user_id);
}

// get user by email
const getUserByEmail = (email) => {
    const stmt = db.prepare(`
        SELECT * FROM users WHERE email = ?
    `);
    return stmt.get(email);
}

// get user by id
const getUserById = (id) => {
    const stmt = db.prepare(`
        SELECT * FROM users WHERE id = ?
    `);
    return stmt.get(id);
}

// getAllUsers
const getAllUsers = () => {
    const stmt = db.prepare(`
        SELECT * FROM users
    `);
    return stmt.all();
}

// get all strategies
const getAllStrategies = () => {
    const stmt = db.prepare(`
        SELECT * FROM strategies
    `);
    return stmt.all();
}

export { insertUser, insertLog, getAllLogs, getLogsByUserId, getUserByEmail, getUserById, getAllUsers, getAllStrategies };