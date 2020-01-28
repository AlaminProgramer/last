const validator=require('validator');
const isEmpty = require('./is-empty');

module.exports=function validateRegisterInput(data, file){
	let errors={};

	data.name=!isEmpty(data.username)? data.username:'';
	data.email=!isEmpty(data.email)? data.email:'';
	data.password=!isEmpty(data.password)? data.password:'';
	data.password2=!isEmpty(data.password2)? data.password2:'';
	data.role=!isEmpty(data.role)?data.role:''
	data.link=!isEmpty(data.link)?data.link:''

	if(!validator.isLength(data.username, { min:2, max:30})){
		errors.name='Username must be between 2 and 30 characters';
	}
	if(validator.isEmpty(data.username)){
		errors.name='Username is required';
	}

	if(validator.isEmpty(data.email)){
		errors.email='Email is required';
	}else if(!validator.isEmail(data.email)){
		errors.email='Email is invalid';
	}
	if(validator.isEmpty(data.password)){
		errors.password='Password is required';
	} else if(!validator.isLength(data.password, {min:5, max:20})){
		errors.password='Password must be at least 5 charaters';
	}
	if(validator.isEmpty(data.password2)){
		errors.password2='Confirm password is required';
	}else if(!validator.equals(data.password, data.password2)){
		errors.password2='password is not match';
	}
	if(validator.isEmpty(data.role)){
		errors.role="Please select a type !"
	}
	if(validator.isEmpty(data.link)){
		errors.link="Please select a link !"
	}
	return {
		errors,
		isValid:isEmpty(errors)
	}
}
