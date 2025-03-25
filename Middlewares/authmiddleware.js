const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const verifyToken = (req, res, next) => {


    const token = req.cookies.JWT_token;

    // console.log(token);
    try {

        if (!token) {
            return res.status(401).json({ message: "Access Denied: No Token Provided" });
            //redirect to login page.
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

            if (err) {
                res.status(403).json({ message: "Invalid or Expired Token" });
            }

            req.user = decoded;

            next();
        });

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
        console.log(err);
    }

}

module.exports = verifyToken;