const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    try {

        const Authhead = req.headers.Authorization || req.headers.authorization;
        // console.log(Authhead);
        const token = Authhead.split(" ")[1];
        // console.log(token);

        if (!token) {
            return res.status(403).json({ message: "Access Denied: No Token Provided" });
            //redirect to login page.
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

            if (err) {
                return res.status(403).json({ message: "Invalid or Expired Token" });
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