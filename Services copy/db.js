require('dotenv').config();
const { Pool } = require('pg');

// Create a connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for Neon
    }
});

// Check database connection
pool.connect()
    .then(() => console.log("✅ Connected to Neon PostgreSQL"))
    .catch(err => console.error("❌ Database connection error:", err));

module.exports = pool;
