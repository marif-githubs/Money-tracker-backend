const express = require("express");
const router = express.Router();
const { handlelogin, handleregister } = require("../Controllers/authcontroller");

router.post('/login', handlelogin);
router.post('/register', handleregister);

module.exports = router;