const express = require('express');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	database:'event_db'
});



app.get('/',(req,res)=>{
	connection.connect((err)=>{
	if(err) throw err;
	console.log('connected');
})

connection.query('SELECT * FROM user_table', (err,rows) => {
  if(err) throw err;

  console.log('Data received from Db:');
  console.log(rows);
});

	connection.end((err) => {
  // The connection is terminated gracefully
  // Ensures all remaining queries are executed
  // Then sends a quit packet to the MySQL server.
});

	
	res.send(rows);
});



const port = process.env.port || 3000
app.listen(port,()=>console.log(`listening on port ${port}`));