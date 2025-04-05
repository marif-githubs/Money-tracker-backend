const express = require("express");
const verifyToken = require("./Middlewares/authmiddleware.js");
const cors = require("cors");
const transactionrouter = require("./Routes/transactionrouter.js")
const authrouter = require("./Routes/authrouter");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("lister")
})
app.get("/user", verifyToken, (req, res) => {
    console.log('Authenticated user:', req.user);
    res.json({
        message: "Access granted!",
        user: req.user
    });
});

// Test route
app.use('/transaction', verifyToken, transactionrouter)
app.use('/userAuth', authrouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));

