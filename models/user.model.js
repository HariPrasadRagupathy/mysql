const sql = require("../config/db.js");

const User = function(user){
	this.user_id = user.user_id;
	this.user_name = user.user_name;
	this.user_password = user.user_password;
	this.user_profession = user.user_profession;
	this.user_email = user.user_email;
}



User.create = (newUser,result) => {

	sql.query(`INSERT INTO event_db.user_table SET ?`,newUser,(err,res)=>{
		if(err){
			console.log("error: ",err);
			result(err,null);
			return;
		}
		result(null,{id:res.insertId, ...newUser});
	});
}


User.findUserByEmail = (userEmail, result) =>{
	sql.query(`SELECT * FROM event_db.user_table WHERE user_email='${userEmail}'`,(err,res)=>{
		if(err)
			{
				console.log(err)
				if(err.code === 'ER_BAD_FIELD_ERROR')
					result({message:"bad request",code:404},null);
				else
					result({message:"Internal Server Error",code:500},null)
				return
			}
		
		if(res.length>0)
			{
				result(null,res);
				return;
			}
		
		result({message:"not found",code:400},null)
	});
}


User.findUserById = (userId,result)=>{
	sql.query(`SELECT * FROM event_db.user_table WHERE user_id = ${userId}`,(err,res)=>{
		if(err)
		{
			console.log(err)
			if(err.code === 'ER_BAD_FIELD_ERROR')
				result({message:"bad request",code:404},null);
			else
				result({message:"Internal Server Error",code:500},null)
			return
		}



		if(res.length>0)
		{
			result(null,res[0]);
			return;
		}

		result({message:"not found",code:400},null)
	})
}

module.exports = User;