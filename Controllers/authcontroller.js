const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../Services/db.js"); 

const register = async (req, res) => {
    const {username , password , email}= req.body;
    
    const hashpassword = await bcrypt.hash(password, 10);

    const result = await pool.query(`INSERT INTO  users (username , email , password) values ( $1, $2, $3 )`,[username, email, hashpassword]);
     
    console.log(result.rowCount);
    res.json(result);
}

const login = async (req , res) => {
    const {username , password } = req.body;
    const user =  await pool.query(`select * from users where username = $1`,[username]);
    // console.log(user.rows[0].password);

    if(!user){
        return res.json({"message" : 'user not found'});
    }
    const hashp = user.rows[0].password;
    const isMatch = await bcrypt.compare(password,hashp);

    if(!isMatch){
        return res.status(400).json({message : "incorrect password"});
    }


    const token = jwt.sign(username, process.env.JWT_SECRET)

    res.json({token});
}

module.exports = { register , login}