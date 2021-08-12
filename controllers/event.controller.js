const Event = require("../models/event.model.js");
const GeneralResponse = require("../models/response.model.js");

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
		var message;
	
 		const {error} = validateEventId(req);
	
	
	
		if(!error)
		{
			Event.findByEventId(req.params.eventId, (err, data) => {
				if (data!=null) {
					console.log("yes data");
					console.log(data);
					dataObject['event'] = data;
					message = "success";
				}
				else {
					console.log("error");
					dataObject['event'] = null;
					console.log(err)
					if (err.kind === "not found") {
						res.status(404);
						message = "Record not Found";
						console.log(message)
					}
					else if (err.kind === "bad_request") {
						res.status(400);
						message = "Bad Request";
					}
					else {
						res.status(500);
						message = "Internal Server Error"
					}
					
				}
				responseObject['statusCode'] = res.statusCode;
					responseObject['message'] = message;
					responseObject['data'] = dataObject;
					console.log(message)
					res.send(responseObject);
			});
		}
		else
		{
				res.status(400);
				message = error.details[0].message;
				dataObject['event'] = null;

				responseObject['statusCode'] = res.statusCode;
				responseObject['message'] = message;
				console.log(message)
				res.send(responseObject);
				
		}
	
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




//Validation

function validateEventId(req)
{
		
	const schema = Joi.object({
		eventId : Joi.number()
	
					.integer()
					.required()
	});
	
	return schema.validate({eventId : req.params.eventId});
}