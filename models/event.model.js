const sql = require("../config/db.js");



// constructor
const Event = function (event) {
    this.eventId = event.eventId;
    this.eventName = event.eventName;
    this.eventImgUrl = event.eventImgUrl;
    this.eventTypeId = event.eventTypeId;
    this.categoryId = event.categoryId;
    this.hostId = event.hostId;
    this.eventDate = event.eventDate;
    this.eventTime = event.eventTime;
    this.eventDuration = event.eventDuration;
    this.isEventRepetable = event.isEventRepetable;
    this.eventDescription = event.eventDescription;
};

Event.getAll = result => {
    sql.query("SELECT * FROM event_db.events_table", (err, res) => {
        if(err){
        console.log("error",err);
        result(null,err);
        return;
        }

        console.log("Events ", res);
        result(null,res);
    });
};

Event.create = (newEvent,result) => {
    sql.query("INSERT INTO event_db.events_table SET ?", newEvent, (err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }

        console.log("Created Event", {id:res.eventId, ...newEvent});
        result(null,{id : res.eventId, ...newEvent});
    });

}

module.exports = Event;
