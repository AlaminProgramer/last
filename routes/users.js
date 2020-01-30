const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const passport=require('passport');
const multer=require('multer');
const keys=require('../config/keys');
const passwordChageValidator =require('../validation/passwordChageValidator')

const validateRegisterInput=require('../validation/register');
const validateLoginInput=require('../validation/login');
const User=require('../models/User');
const router=express.Router();
const updateProfile=require('../validation/upodateProfile')

const storage=multer.diskStorage({
	destination:function(req, file , cb){
		cb(null , './uploads/')
	},
	filename:function(req, file , cb){
		cb(null , Date.now().toString()+'-'+file.originalname )
	}
})
const upload=multer({
	storage:storage,
	fileFilter:function(req, file, cb){
		if(file.mimetype==='image/jpeg' ||file.mimetype==='image/png'){
			cb(null , true)
		}else{
			cb(null , false)
		}
	},
	limits:{fileSize:1024*1024*5}
})
router.post('/register',upload.single('file'), (req, res)=>{
	console.log(req.body)
	const {errors, isValid}=validateRegisterInput(req.body)
	if(!isValid ){
		return res.status(400).json(errors)
	}
	User.findOne({email:req.body.email})
	.then(user=>{
		if(user){
			return res.status(400).json({email:"user  exist"})
		}else{
			bcrypt.hash(req.body.password, 12,((err, hash)=>{
				if(err){
					console.log(err)
					res.status(500).json({massage:"Server error occurd "})
				}else{
					const day= new Date()
					const dd= day.getDate()
					const mm= day.getMonth()+1
					const yy= day.getFullYear()
					const newDate= dd+'-'+mm+'-'+yy
					const newUser=  new User({
						image:'',
						username:req.body.username,
						email:req.body.email,
						role:req.body.role,
						password:hash,
						isApproved:req.body.isApproved,
						date:newDate,
						link:req.body.link
					})
					newUser.save()
					.then(user=>{
						console.log(user)
						res.json({massage:"user created success full "})
					})
					.catch(err=>{
						console.log(err)
					})
				}
			}))
		}
	})
	.catch(err=>{
		console.log(err)
		res.json({massage:"server error occurd "})
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
		    return	res.status(404).json(errors);
		}

		bcrypt.compare(req.body.password, user.password)
		.then(isMatch=>{
			if(isMatch && user.isApproved){
				const payload={id:user.id, email:user.email, role:user.role, name:user.username, date:user.date, image:user.image, link:user.link};
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
	})
	.catch(err=>{
		console.log(err)
		res.json({err:err})
	})
});

router.get('/all', (req, res)=>{
	User.find()
	.then(data=>{ res.json(data) })
	.catch(err=> console.log(err));
})

router.get('/mentor', (req, res)=>{
	User.find({role:"mentor"})
	.then(data=>{ res.json(data) })
	.catch(err=> console.log(err));
})

router.get('/mentee', (req, res)=>{
	User.find({role:"mentee"})
	.then(data=>{ res.json(data) })
	.catch(err=> console.log(err));
})

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
//User profile

router.get('/singleUser/:id',(req,res)=>{
	const id=req.params.id
	User.findById(id)
	.then((data)=>{
		res.json(data)
	})
	.catch(err=>{
		res.json({massage:"Server error orrurd"})
	})

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





router.post ('/updateInfo/:id', upload.single('file'), (req, res)=>{
	
	let{ errors , isValid}=updateProfile(req.body)
	if(!isValid){
		return res.status(400).json(errors)
	}
	if(!req.file){
		return res.status(400).json({image:"Select an image"})
	}
	User.findByIdAndUpdate({_id:req.params.id})
	.then(data=>{
		data.username=req.body.username
		data.email=req.body.email
		data.link=req.body.link
		data.image=req.file.path
		data.save()
		.then(result=>{
			console.log(result)
			res.status(200).json({massage:"profile updated"})
		})
		.catch(err=>{
			console.log(err)
			res.status(500).json({massage:"server error occurd"})
		})
	})
	.catch(err=>{
		console.log(err)
		res.json({massge:"server error occurd"})
	})
})  
router.post('/changePassword/:id' , (req,res)=>{
	console.log(req.body)
	const {oldPassword , newPassword , newPassword2nd }=req.body
	const pass={oldPassword ,newPassword , newPassword2nd}
	const validate=passwordChageValidator (pass)
	// console.log(oldPassword,newPassword,newPassword2nd)
	const id=req.params.id
	// console.log(validate)
	if(!validate.isValid){
		return res.status(400).json(validate.errors)
		
	}

	User.findByIdAndUpdate({_id:id})
	.then(user=>{
		bcrypt.compare(oldPassword , user.password , (err , result)=>{
			if(err){
				return res.status(400).json({massage:"Error occure while changing password"})
			} 
			if(!result){
				return res.status(400).json({massage:"Wrong password provided"})
			}
			bcrypt.hash(newPassword ,12 , (err , hash)=>{
				if(err){
					console.log(err)
					return res.json({massage:"server error "})
				}
				user.password=hash
				user.save()
				.then(data =>{
					return res.status(400).json({done:"Password change successfull"})
				})
				.catch(err=>{
					console.log(err)
					return res.status(200).json({massage:"Server error occurd"})
				})
			} )
		})

	})
	.catch(err=>{
		res.json({err})
	})
})
module.exports=router;
