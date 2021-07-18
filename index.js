const express = require('express');
const app = express();
const mysql = require('mysql');
<<<<<<< HEAD
const connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	//password : 'Hari1988',
	database:'event_db'
});
=======
const sql = require('./config/db.js');

//Routes
const event_route = require('./routes/event');


//Use
app.use(express.json());
app.use('/eventsAll', event_route);
>>>>>>> e867eb52341e0823f2628109ba80cf4f4a8c07c1


app.get('/',(req,res)=>{
	
	var data;
	
sql.query('SELECT * FROM user_table', (err,rows) => {
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