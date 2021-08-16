const GeneralResponse = require("../models/response.model.js");

const logger=require('../startup/logging');

module.exports = function(err, req, res, next){
    logger.error(err.message,err);
    res.status(500)
    res.send(new GeneralResponse(res.status,"Something Failed.",null));
}