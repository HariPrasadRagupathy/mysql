const Event = require("../models/event.model.js");


exports.findAll = (req, res) => {
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
            res.send(data);
        }
    
    })
};

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