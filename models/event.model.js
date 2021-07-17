const sql = require("../config/db.js");



// constructor
const Event = function (event) {
    this.eventId = event.eventId;
    this.eventName = event.eventName;
    this.eventImg = event.eventImg;
    this.eventTypeId = event.eventTypeId;
    this.categoryId = event.categoryId;
    this.hostId = event.hostId;
    this.eventDate = event.eventDate;
    this.eventTime = event.eventTime;
    this.eventDuration = event.eventDuration;
    this.isRepeatable = event.isRepeatable;
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

module.exports = Event;
