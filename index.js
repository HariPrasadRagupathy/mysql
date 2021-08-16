require('express-async-errors');
const winston = require('winston')


const express = require('express');
const app = express();


const logger=require('./startup/logging');
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/validation')();

if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: winston.format.simple(),
	}));
}

app.get('/',(req,res)=>{
	res.send('<br/><center><h1>Welcome, REST API Learning, Hari.</h1><h3> <a href="https://app.swaggerhub.com/apis/Harirexzeon/REST_API_Training/1.0.0-oas3">Open API Specification</a></h3></center>');
});

const port = process.env.port || 3000
app.listen(port,()=>logger.info(`listening on port ${port}`));