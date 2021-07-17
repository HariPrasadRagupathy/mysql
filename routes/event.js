const express = require('express');
const router = express.Router();
const event = require("../controllers/event.controller.js")


router.get('/', event.findAll);


module.exports = router;