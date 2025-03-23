const express = require("express");
const jwt = require("jsonwebtoken");
const authrouters = require("./Routes/authrouters.js");
const verifyToken = require("./Middlewares/authmiddleware.js");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

// Test route
app.use('/api/auth', authrouters);
app.use('/api/verify', verifyToken);

const PORT = 6000;
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));
