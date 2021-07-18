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
    if(!req.body)
    {
        res.status(400).send({
            message:"Content can not be empty!"
        });
    }

    const event = new Event({
    eventId = event.eventId;
    eventName = event.eventName;
    eventImg = event.eventImg;
    eventTypeId = event.eventTypeId;
    categoryId = event.categoryId;
    hostId = event.hostId;
    eventDate = event.eventDate;
    eventTime = event.eventTime;
    eventDuration = event.eventDuration;
    isRepeatable = event.isRepeatable;
    eventDescription = event.eventDescription;
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