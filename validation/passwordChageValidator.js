const validator=require('validator');
const isEmpty = require('./is-empty');

module.exports=function passwordChageValidator(data){
	let errors={};

	data.oldPassword=!isEmpty(data.oldPassword)? data.oldPassword:'';

	data.newPassword=!isEmpty(data.newPassword)? data.newPassword:'';
	data.newPassword2nd=!isEmpty(data.newPassword2nd)? data.newPassword2nd:'';
	
	
	if(validator.isEmpty(data.oldPassword)){
		errors.oldPassword='Old  Password is required';
	}
	if(validator.isEmpty(data.newPassword)){
		errors.newPassword="Please enter new password"
	}
	if(validator.isEmpty(data.newPassword2nd)){
		errors.newPassword2nd='Please enter new password again';
	}else if(data.newPassword !== data.newPassword2nd){
		errors.newPassword2nd =" Both password are differant"
	}


	return {
		
		errors,
		isValid:isEmpty(errors)
	}
}
