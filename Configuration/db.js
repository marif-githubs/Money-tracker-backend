require('dotenv').config();
const { Pool } = require('pg');

// Create a connection pool
const dbpool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for Neon
    }
});

module.exports = dbpool;
