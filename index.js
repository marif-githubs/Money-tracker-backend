const express = require("express");
const verifyToken = require("./Middlewares/authmiddleware.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const transactionrouter = require("./Routes/transactionrouter.js")
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.get("/user", verifyToken, (req, res) => {
    console.log('Authenticated user:', req.user);
    res.json({
        message: "Access granted!",
        user: req.user
    });
});

// Test route
app.use('/transaction', verifyToken, transactionrouter)

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));

