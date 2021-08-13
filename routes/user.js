const express = require('express');
const router = express.Router();
const user = require("../controllers/user.controller.js")


router.post('/',user.create);


module.exports = router;