

// constructor
const GeneralResponse = function (status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  
};

Response.send = (status,message, data, callback) => {

    
    callback(new Response(this.status= status, this.message=message,this.data = data));
};