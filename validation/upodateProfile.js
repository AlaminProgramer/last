const validator=require('validator');
const isEmpty = require('./is-empty');
module.exports=function updateProfile(data, file){
	let errors={};
	data.name=!isEmpty(data.username)? data.username:'';
	data.email=!isEmpty(data.email)? data.email:'';
	data.link=!isEmpty(data.link)?data.link:''

	// full name
	if(!validator.isLength(data.username, { min:2, max:30})){
		errors.name='Username must be between 2 and 30 characters';
	}
	if(validator.isEmpty(data.username)){
		errors.name='Username is required';
	}
	// email
	if(validator.isEmpty(data.email)){
		errors.email='Email is required';
	}else if(!validator.isEmail(data.email)){
		errors.email='Email is invalid';
	}
	// link
	if(validator.isEmpty(data.link)){
		errors.link="Please select a link !"
	}
	return {
		errors,
		isValid:isEmpty(errors)
	}
}
