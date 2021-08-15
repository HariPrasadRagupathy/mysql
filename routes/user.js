const auth = require('../middleware/auth')
const express = require('express');
const router = express.Router();
const user = require("../controllers/user.controller.js")


router.post('/',user.create);
router.get('/me',auth,user.findme);


module.exports = router;