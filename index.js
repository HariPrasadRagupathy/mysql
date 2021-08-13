const express = require('express');
const app = express();
const mysql = require('mysql');


//Routes
const event_route = require('./routes/event');
const user_route = require('./routes/user');
const auth_route = require('./routes/auth');


//Use
app.use(express.json());
app.use('/events', event_route);
app.use('/user',user_route);
app.use('/auth',auth_route);



app.get('/',(req,res)=>{

	res.send('<br/><center><h1>Welcome, REST API Learning, Hari.</h1><h3> <a href="https://app.swaggerhub.com/apis/Harirexzeon/REST_API_Training/1.0.0-oas3">Open API Specification</a></h3></center>');

});




const port = process.env.port || 3000
app.listen(port,()=>console.log(`listening on port ${port}`));