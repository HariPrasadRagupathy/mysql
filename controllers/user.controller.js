const auth = require('../middleware/auth')
const config = require('config');
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require("../models/user.model.js");
const GeneralResponse = require('../models/response.model');


exports.create = async (req,res) =>{
	let message;
	let dataObject={}
	
	
	if(!req.body)
		{
			message = "Content can not be empty"
			res.status(400)
			dataObject['newUser']=null
			return res.send(new GeneralResponse(res.statusCode,message,dataObject))
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
				res.status(500)
				message=err.message || "Some error occurred"
				dataObject['newUser']=null
			}
		else 
		{
			const token = jwt.sign({_id:data.id},config.get('jwtPrivateKey'))
			res.header("x-auth-token",token)
			message="Success"
			dataObject['newUser']=_.pick(user,['user_name','user_profession','user_email'])
		};

		return res.send(new GeneralResponse(res.statusCode,message,dataObject))
	})
}

exports.authenticateUser = (req,res) =>{
	let message;
	let dataObject = {}

	if(!req.body)
		{
			message = "Content can not be empty"
			res.status(400)
			return res.send(new GeneralResponse(res.statusCode,message,null))
		}
	
	User.findUserByEmail (req.body.userEmail, async (err,data)=>{
		if(err){
			message = err.message || "Some error occurred"
			res.status(500)
			dataObject['authenticate']=null
		}
		else{
			const validPassword = await bcrypt.compare(req.body.userPassword,data[0].user_password)
			if(!validPassword) {
				message = "Invalid email or password"
				res.status(400)
				dataObject['authenticate']=null
				return res.send(new GeneralResponse(res.statusCode,message,dataObject))
			}
			
			const token = jwt.sign({_id : data[0].user_id},config.get('jwtPrivateKey'))
			res.header('x-auth-token',token)
			message = "Success"
			dataObject['authenticate']= {"isAuthenticated":true}

		}
		res.send(new GeneralResponse(res.statusCode,message,dataObject))

	});

}

exports.findme = (req,res) =>{

	let dataObject = {}
	let message;

	User.findUserById(req.user._id,(err,data)=>{
		if(err)
		{
			res.status(err.code)
			message=err.message
			dataObject=null
		}
		else
		{
			message="success"
			dataObject['me']=_.pick(data,['user_name','user_profession','user_email'])

		}
		res.send(new GeneralResponse(res.statusCode,message,dataObject))
	});



}