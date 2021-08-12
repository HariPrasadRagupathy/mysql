

// constructor
const GeneralResponse = function (status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  
};

GeneralResponse.sendResponse = (status,message, data, callback) => {

    console.log(message);
    callback(new Response(this.status= status, this.message=message,this.data = data));
};

module.exports = GeneralResponse;