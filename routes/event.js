const auth=require('../middleware/auth')
const express = require('express');
const router = express.Router();
const event = require("../controllers/event.controller.js")

//get
router.get('/', auth, event.findAll);

router.get('/:eventId', auth,event.findByEventId);

router.get('/byCategory/:categoryId',auth,event.findByCategory);

router.get('/byEventType/:eventTypeId',auth,event.findByEventType);


//post
router.post('/',auth,event.create);


module.exports = router;