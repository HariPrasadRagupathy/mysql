const auth=require('../middleware/auth')
const express = require('express');
const router = express.Router();
const event = require("../controllers/event.controller.js")

//get
router.get('/',auth, event.findAll);

router.get('/:eventId', event.findByEventId);

router.get('/byCategory/:categoryId',event.findByCategory);

router.get('/byEventType/:eventTypeId',event.findByEventType);


//post
router.post('/',event.create);


module.exports = router;