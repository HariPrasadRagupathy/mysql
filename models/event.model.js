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

Event.findByEventId = (eventId,result) => {
	sql.query(`SELECT * FROM event_db.events_table WHERE eventId=${eventId}`, (err,res)=>{
		if(err)
		{
			console.log("error",err);
			 if (err.code === 'ER_BAD_FIELD_ERROR')
			result({message:"bad_request",code:400},null);
			 else
				 result({message:"Internal Server Error",code:500},null);
			return;
		}
	
	if(res.length){
		result(null,res[0]);
		return;
	}
	
	result({message:"Not found",code:400},null);

	});
};

Event.findByCategoryId = (categoryId, result) =>{
	sql.query(`SELECT * FROM event_db.events_table WHERE categoryId=${categoryId}`,(err,res)=>{
		if(err)
			{
				console.log("error",err);
				if(err.code === 'ER_BAD_FIELD_ERROR')
					result({message:"bad_request",code:404},null);
				else
					result({message:"Internal Server Error",code:500},null);
				return
			}
		
		if(res.length>0)
			{
			console.log("Found Events: ",res);
			result(null,res);
			return;
			}
		
		result({message:"not found",code:400},null);
	});
};

Event.findByEventTypeID = (eventTypeId,result) =>{
	sql.query(`SELECT * FROM event_db.events_table WHERE eventTypeId=${eventTypeId}`,(err,res)=>{
		if(err)
			{
				if(err.code === 'ER_BAD_FIELD_ERROR')
						result({message:"Bad Request!",code:404},null);
				else
					result({message: "Internal Server Error!",code:500},null)
				return
			}
		
		if(res.length>0)
			{
				result(null,res);
				return;
			}
		
		result({message:"Data Not Found!",code:400},null);
	});
}

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
