const Event = require("../models/event.model.js");
const GeneralResponse = require("../models/response.model.js");

const Joi = require('joi');



exports.findAll = (req, res) => {
	var dataObject = {};
	var message;

    Event.getAll((err,data)=>{
        if(err)
        {
            res.status(500)
			message= err.message || "Some error occurred while retrieving events."
			dataObject['eventList'] = null;
		}
        else
        {
            dataObject['eventList'] = data;
        }

		GeneralResponse.sendResponse(res.statusCode,"success",dataObject,(data)=>{
			res.send(data);
		})
    
    });
			
};


exports.findByEventId = (req, res) => {
		var dataObject = {};
		var message;

		const schema = Joi.object({
			eventId : Joi.number()
						.integer()
						.required()
		});

		const {inValid} = schema.validate({eventId : req.params.eventId});

 		if(inValid)
		{
			res.status(400);
			message = inValid.details[0].message;
			dataObject['event'] = null;
			return res.send(new GeneralResponse(res.statusCode,message,dataObject))
		}

 		Event.findByEventId(req.params.eventId, (err, data) => {
				if(err)
				{
					dataObject['event'] = null;
					res.status(err.code);
					message = err.message;
				}
			   dataObject['event'] = data;
			   message = "success";

			   res.send(new GeneralResponse(res.statusCode,message,dataObject));
 		});
};

exports.findByCategory = (req,res)=>{
	var dataObject = {};
	var message;

	const schema = Joi.object({
		categoryId : Joi.number().required().integer()
		})

	const {inValid} = schema.validate({categoryId : req.params.categoryId})

	if(inValid)
	{
		res.status(400)
		message = inValid.details[0].message
		dataObject['eventList']=null
		return res.send(new GeneralResponse(res.statusCode,message,dataObject))
	}

	Event.findByCategoryId(req.params.categoryId,(err,data)=>{
		if(err){
			dataObject['eventList']=null
			res.status(err.code)
			return res.send(new GeneralResponse(res.statusCode,err.message,dataObject))
		}
		else
		{
			dataObject['eventList']=data;
			res.send(new GeneralResponse(res.statusCode,"Success",dataObject));
		}
	});
	
};

exports.findByEventType = (req,res)=>{
	var dataObject = {};
	var message;

	const schema = Joi.object({
		eventTypeId : Joi.number().integer().required().positive()
	})

	const {inValid} = schema.validate({eventTypeId : req.params.eventTypeId})

	if(inValid)
	{
		res.status(400)
		dataObject['eventList'] = null
		return res.send(new GeneralResponse(res.statusCode,inValid.details[0].message,dataObject))
	}

	
	Event.findByEventTypeID(req.params.eventTypeId,(err,data)=>{
		if(err)
		{
			res.status(err.code)
			message = err.message
			dataObject['eventList'] = null
		}
		else
		{
			dataObject['eventList'] = data;
			message = "Success"
		}
		res.send(new GeneralResponse(res.statusCode,message,dataObject));
		
	})
}

exports.create = (req,res) =>{

    var dataObject = {}
	var message;

    const schema = Joi.object().keys(
		{
			eventId : Joi.number().integer(),
			eventName :  Joi.number().integer(),
			eventImgUrl : Joi.number().integer(),
			eventTypeId : Joi.number().integer(),
			categoryId : Joi.number().integer(),
			hostId : Joi.number().integer(),
			eventDate : Joi.number().integer(),
			eventTime : Joi.number().integer(),
			eventDuration : Joi.number().integer(),
			isEventRepetable : Joi.number().integer(),
			eventDescription : Joi.number().integer()
		}
	)



    if(!req.body)
    {
        res.status(400).send({
            message:"Content can not be empty!"
        });
    }

    const event = new Event({
    //eventId : req.body.eventId,
    eventName : req.body.eventName,
    eventImgUrl : req.body.eventImgUrl,
    eventTypeId : req.body.eventTypeId,
    categoryId : req.body.categoryId,
    hostId : req.body.hostId,
    eventDate : req.body.eventDate,
    eventTime : req.body.eventTime,
    eventDuration : req.body.eventDuration,
    isEventRepetable : req.body.isEventRepetable,
    eventDescription : req.body.eventDescription
    })

	const {inValid} = schema.validate(req.body)
    console.log(inValid.details[0].message)
  /*  Event.create(event,(err, data)=>{
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send(data);
    });*/
}

