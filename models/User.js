const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
	image:{
		type:String
	},
	userId:{
		type:String
	},
	username:{
		type:String,
		require:true
	},
	email:{
		type:String,
		require:true
	},
	role:{
		type:String
	},
	password:{
		type:String,
		require:true
	},
	isApproved:{
		type:Boolean
	},
	date:{
		type:Date,
		default:Date.now
	}
},{
	collection:"users"
})

module.exports=User=mongoose.model('users',userSchema);
