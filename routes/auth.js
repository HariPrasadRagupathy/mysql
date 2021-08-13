const express = require('express');
const router = express.Router();
const user = require("../controllers/user.controller.js");


router.post('/',user.authenticateUser);


module.exports = router;


