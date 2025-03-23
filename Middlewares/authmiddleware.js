const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token;
    let header = req.headers.Authorization || req.headers.authorization ;
    console.log(header)
    try{
    if(header){
        token =  header.split(" ")[1];
        console.log(token);
        if(!token){
            return res.status(400).json({message : "auth denied"});
        }

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log(decode);
            return res.json({message : 'user verified'})
            
    }
    }catch(err){
        console.log(err);
    }

}

module.exports = verifyToken;