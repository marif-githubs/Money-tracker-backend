const dbpool = require("../Configuration/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handlelogin = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    try {
        const pool = await dbpool.connect()
        const result = await pool.query("SELECT * FROM USERS WHERE username = $1", [username]);

        if (result.rowCount != 1) {
            return res.json({ Message: "User Not Found", status: "Fail" });
        }

        const isMatch = await bcrypt.compare(password, result.rows[0].password);

        if (!isMatch) {
            return res.json({ Message: " Password Incorrect ", status: "Fail" });
        }

        const payload = {
            id: result.rows[0].userid,
            username: result.rows[0].username,
            email: result.rows[0].email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '55m' });

        if (!token) {
            return res.status(403).json({ Message: "Login Fail", status: "Fail" })
        }

        // res.cookie('JWT_token', token, {
        //     httpOnly: true,
        //     sameSite: "None",
        //     secure: true,
        //     maxAge: 3600000,
        //     path: "/"
        // });

        pool.release();

        res.status(201).json({
            Message: "Login Successful ",
            token, status: "Success"
        });


    } catch (err) {
        console.log(err);
        res.json({ Message: "Login Error", status: "Fail" })
    }
};

const handleregister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const pool = await dbpool.connect();

        const hashpassword = await bcrypt.hash(password, 12);

        let result = await pool.query("SELECT * FROM  USERS WHERE username = $1 OR email = $2", [username, email]);

        if (result.rowCount != 0) {
            return res.json({ Message: "Cridentials already Exit", status: "Fail" })
        }

        result = await pool.query(
            "INSERT INTO USERS( username, password, email) VALUES($1, $2, $3)",
            [username, hashpassword, email]
        );

        if (result.rowCount != 1) {
            console.log('not')
            return res.json({ Message: " Registration Fail ", status: "Fail" })
        }

        pool.release();

        res.json({ Message: "User Register Successful", status: "Success" });
        console.log("handleregister");

    } catch (err) {
        res.json({ Message: " Registration Fail Error", status: "Fail" })
        console.error(err);
    }
};

module.exports = {
    handlelogin,
    handleregister,
};
