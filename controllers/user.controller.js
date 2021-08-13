const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcrypt')
const _ = require('lodash');
const User = require("../models/user.model.js");


exports.create = async (req,res) =>{
	
	
	if(!req.body)
		{
			return res.status(400).send({
				message : "Content can not be empty"
		});
	}
	
	const salt = await bcrypt.genSalt(10);
	
	const user = new User({
		//userId : req.body.userId,	
		user_name : req.body.userName,
		user_password : req.body.userPassword,
		user_profession : req.body.userProfession,
		user_email : req.body.userEmail
	});
	
	user.user_password = await bcrypt.hash(user.user_password,salt)

	User.create(user,(err,data)=>{
		if(err)
			{
				res.status(500).send({
					message : err.message || "Some error occurred"
				})
			}
		else 
		{
			
			res.send(_.pick(data,['user_name']))
		};
	})
}

exports.authenticateUser = (req,res) =>{
	
	if(!req.body)
		{
			return res.status(400).send({
				message : "Content can not be empty"
			});
		}
	
	User.findUserByEmail (req.body.userEmail, async (err,data)=>{
		if(err){
			res.status(500).send({
				message:err.message || "Some error occurred"
			})		
		}
		else{
			console.log(req.body.userPassword)
			console.log(data[0].user_password)
			
			const validPassword = await bcrypt.compare(req.body.userPassword,data[0].user_password)
			if(!validPassword)
				return res.status(400).send("Invalid email or password")
			
			const token = jwt.sign({_id : data[0].user_id},'jwtPrivateKey')
			
			res.send(token);
		}
	});
	

	
}