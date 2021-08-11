const Event = require("../models/event.model.js");
const Joi = require('joi');



exports.findAll = (req, res) => {
	var dataObject = {};
	var responseObject = {};
	
	
    Event.getAll((err,data)=>{
        if(err)
        {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving events." 
            });
        }
        else
        {	
            dataObject['eventList'] = data;
			responseObject['statusCode'] = res.statusCode;
			responseObject['message'] = "success";
			responseObject['data'] = dataObject;
            res.send(responseObject);
        }
    
    });
			
};


exports.findByEventId = (req, res) => {
		var dataObject = {};
	var responseObject = {};
	
	
	const schema = Joi.object({
		eventId : Joi.string()
					.alphanum()
					.min(3)
					.required()
	});
	
	const {error,value}= schema.validate({eventId : req.params.eventId});
	
	console.log(error);
	
	if(error)
		{
				res.status(400);
				dataObject['event'] = null;
				responseObject['statusCode'] = res.statusCode;
				responseObject['message'] = error.details[0].message;
				responseObject['data'] = dataObject;
				res.send(responseObject);
		}
	
	
	Event.findByEventId(req.params.eventId,(err,data)=>{
		if(err){
			if(err.kind === "not found")
			{
				res.status(404);
				dataObject['event'] = null;
				responseObject['statusCode'] = res.statusCode;
				responseObject['message'] = "Record not Found";
				responseObject['data'] = dataObject;
				res.send(responseObject);
			}
			else if(err.kind === "bad_request")
			{
				res.status(400);
				dataObject['event'] = null;
				responseObject['statusCode'] = res.statusCode;
				responseObject['message'] = "Bad Request";
				responseObject['data'] = dataObject;
				res.send(responseObject);
			}
			else
			{
				res.status(500);
				dataObject['event'] = null;
				responseObject['statusCode'] = res.statusCode;
				responseObject['message'] = "Internal Server Error"
				responseObject['data'] = dataObject;
				res.send(responseObject);
			}
		}
		else
		{
			dataObject['event'] = data;
			responseObject['statusCode'] = res.statusCode;
			responseObject['message'] = "success";
			responseObject['data'] = dataObject;
            res.send(responseObject);
			
		}
						
	});
};

exports.findByCategory = (req,res)=>{
	var dataObject = {};
	var responseObject = {};
	
	Event.findByCategoryId(req.params.categoryId,(err,data)=>{
		if(err){
			if(err.kind === 'not found')
			{
				res.status(404);
				dataObject['eventList'] = null;	
				responseObject['statusCode'] = res.statusCode;
				responseObject['message'] = "Data Not Found!";
				responseObject['data'] = dataObject;
				res.send(responseObject);
			}
			else if(err.kind === 'bad_request')
			{
				res.status(400);
				dataObject['eventList'] = null;
				responseObject['statusCode'] = res.statusCode;
				responseObject['message'] = "Bad Request";
				responseObject['data'] = dataObject;
				res.send(responseObject);
				
			}
			else
			{
				res.status(500);
				dataObject['eventList'] = null;
				responseObject['statusCode'] = res.statusCode;
				responseObject['message'] = "Internal Server Error";
				responseObject['data'] = dataObject;
				res.send(responseObject);
				
			}
		}
		else
		{
			dataObject['eventList']=data;
			responseObject['statusCode'] = res.statusCode;
			responseObject['message'] = "Success";
			responseObject['data'] = dataObject;
			res.send(responseObject);
		}
	});
	
};

exports.findByEventType = (req,res)=>{
	var dataObject = {};
	var responseObject = {};
	
	Event.findByEventTypeID(req.params.eventTypeId,(err,data)=>{
		if(err)
		{
			if(err.kind === 'not found')
			{
				res.status(404);
				dataObject['eventList'] = null;
				responseObject['statusCode'] = res.statusCode;
				responseObject['message'] = "Data Not Found!";
				responseObject['data'] = dataObject;
				res.send(responseObject);
			}
			else if(err.kind === 'bad_request')
			{
				res.status(400);
				dataObject['eventList'] = null;
				responseObject['statusCode'] = res.statusCode;
				responseObject['message'] = "Bad Request!";
				responseObject['data'] = dataObject;
				res.send(responseObject);
			}
			else
			{
				res.status(500);
				dataObject['eventList'] = null;
				responseObject['statusCode'] = res.statusCode;
				responseObject['message'] = "Internal Server Error";
				responseObject['data'] = dataObject;
				res.send(responseObject);
				
			}
				
		}
		else
		{
			dataObject['eventList'] = data;
			responseObject['statusCode'] = res.statusCode;
			responseObject['message'] = "Success";
			responseObject['data'] = dataObject;
			res.send(responseObject);
		}
		
	})
}

exports.create = (req,res) =>{

    console.log(req.body.eventId);

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

    Event.create(event,(err, data)=>{
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send(data);
    });
}