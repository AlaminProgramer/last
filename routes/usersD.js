const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const passport=require('passport');
const keys=require('../config/keys');

const passwordChageValidator =require('../validation/passwordChageValidator')
const validateRegisterInput=require('../validation/register');
const validateLoginInput=require('../validation/login');
const User=require('../models/User');
const router=express.Router();

router.post('/register',(req,res)=>{
	const {errors, isValid}=validateRegisterInput(req.body);
    console.log(req.body);
    if(!isValid){
    	return res.status(400).json(errors);
    }

	User.findOne({ email:req.body.email })
	.then((user)=>{
		if(user){
			errors.email='Email already exits';
			res.status(400).json(errors);
		}else{
			const newUser= new User({
				username    :req.body.username,
				email   :req.body.email,
				role    :req.body.role,
				password:req.body.password,
				isApproved:req.body.isApproved
			})

			bcrypt.genSalt(10, (err,salt)=>{
				bcrypt.hash(newUser.password,salt,(err,hash)=>{
					if(err) throw err;
					newUser.password=hash;
					newUser.save()
					.then((user)=>{
						res.json(user);
					})
					.catch((err)=>{
						console.log(err);
					})
				})

			})
		}
	})
})

router.post('/login',(req,res)=>{

	const {errors, isValid}=validateLoginInput(req.body);

    if(!isValid){
    	return res.status(400).json(errors);
    }

	const email=req.body.email;
	const password=req.body.password;
	User.findOne({email})
	.then(user=>{
		if(!user){
			errors.email='User not found';
			res.status(404).json(errors);
		}

		bcrypt.compare(password, user.password)
		.then(isMatch=>{
			if(isMatch && user.isApproved){
				const payload={id:user.id, email:user.email, role:user.role, name:user.username};
				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn:3600 },
					(err,token)=>{
						res.json({
							success:true,
							token:'bearer ' +token
						})
					});
			}else{
				if(!user.isApproved){
					errors.approved="Your account is not Approved yet"
				}else{
					errors.password='Incorrect password';
				}
				res.status(400).json(errors);
			}
		})
	});
});

router.get('/all', (req, res)=>{
	User.find()
	.then(data=>{ res.json(data) })
	.catch(err=> console.log(err));
})
router.get('/edit/:id',function(req, res) {
	let id = req.params.id;
	User.findById(id)
	.then(data=> res.json(data))
	.catch(err=> res.json(err));
  });

  router.post('/update/:id',function(req, res) {
	User.findById(req.params.id)
	.then(data=>{
		data.isApproved=true

	  data.save()
		.then((user)=>{
		  res.json(user);
		})
		.catch((err)=>{
		  console.log(err);
		})
	})
  });

  router.get('/delete/:id', (req, res)=>{
	  User.findByIdAndRemove({_id:req.params.id})
	  .then(data=> console.log('data delete succesfully'))
	  .catch(err=> console.log(err));
  })
router.get('/current',passport.authenticate('jwt',{session:false}), (req,res)=>{
	res.json({
		id:req.user.id,
		name:req.user.name,
		email:req.user.email
	});
});

router.get('/singleUser/:id' ,(req,res)=>{
	const id=req.params.id
	User.find({_id:id})
	.then(data=>{
		res.json({data})
	})
	.catch(err=>{
		res.json({massage:"Server error occurd"})
	})
})

router.post('/changePassword/:id' , (req,res)=>{
	const {oldPassword , newPassword , newPassword2nd }=req.body
	const pass={oldPassword ,newPassword , newPassword2nd}
	const validate=passwordChageValidator (pass)
	const id=req.params.id

	User.findByIdAndUpdate({_id:id})
	.then(user=>{
		console.log("thanks")
		bcrypt.compare(oldPassword , user.password , (err , result)=>{
			if(err){
				res.json({massage:"Error occure while changing password"})
			} 
			if(!result){
				res.json({massage:"Wrong password provided"})
			}
				bcrypt.hash(newPassword ,12 , (err , hash)=>{
					if(err){
						console.log(err)
						res.json({massage:"server error "})
					}
					user.password=hash 
					user.save()
					.then(data =>{
						res.json({massage:"Password change successfull"})
					})
					.catch(err=>{
						console.log(err)
						res.json({massage:"Server error occurd"})
					})
				} )
				 
			
		})

	})
	.catch(err=>{
		res.json({err})
	})
})
module.exports=router;
