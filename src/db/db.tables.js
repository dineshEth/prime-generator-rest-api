
// Tables or Schema definitions queries
const strategiesQuery = `
    CREATE TABLE IF NOT EXISTS strategies (
        symbol TEXT PRIMARY KEY,
        name TEXT NOT NULL
    );
`;

const userQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        name TEXT NOT NULL,
        password TEXT NOT NULL
    );
`;

const logsQuery = `
    CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        range_start INTEGER NOT NULL,
        range_end INTEGER NOT NULL,
        time_elapsed INTEGER NOT NULL,
        primes_count INTEGER NOT NULL,
        strategy TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (strategy) REFERENCES strategies(symbol),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
`;

// insert default strategies
const insertStrategiesQuery = `
    INSERT OR IGNORE INTO strategies (symbol, name) VALUES
        ('BHN', 'byHalfNumbers'),
        ('BSN', 'bySqrtNumber'),
        ('SOE', 'Sieve of Eratosthenes');
`;

// get All Logs 
const getAllLogsQuery = `
    SELECT logs.*, users.name AS user_name, strategies.name AS strategy_name
    FROM logs   
    JOIN users ON logs.user_id = users.id
    JOIN strategies ON logs.strategy = strategies.symbol;
`;  

export { strategiesQuery, userQuery, logsQuery, insertStrategiesQuery, getAllLogsQuery };




