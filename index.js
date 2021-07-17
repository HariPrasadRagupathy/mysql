const express = require('express');
const app = express();
const mysql = require('mysql');

//Routes
const event_route = require('./routes/event');


//Use
app.use('/eventsAll',event_route);


const connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password : 'Hari1988',
	database:'event_db'
});

connection.connect((err)=>{
	if(err) throw err;
	console.log('connected');
})

app.get('/',(req,res)=>{
	
	var data;
	


connection.query('SELECT * FROM user_table', (err,rows) => {
  if(err) {
	  res.status(400).send('Error in database');
  }
  else
  {
    console.log('Data received from Db:');
	data = JSON.stringify(rows);	  
	res.send(data);
  }

 
});

});

/*	connection.end((err) => {
  // The connection is terminated gracefully
  // Ensures all remaining queries are executed
  // Then sends a quit packet to the MySQL server.
});*/



const port = process.env.port || 3000
app.listen(port,()=>console.log(`listening on port ${port}`));