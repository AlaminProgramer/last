const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
	image:{
		type:String
	},
	link:{
		type:String
	},
	userId:mongoose.Types.ObjectId,
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
		type:String
	}
},{
	collection:"users"
})

module.exports=User=mongoose.model('users',userSchema);
