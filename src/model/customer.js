const mongoose=require('mongoose');
const CustomerSchema=new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	id:{
		type:Number,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	mobile:{
		type:Number,
		required:true
    },
    address:{
		type:String,
		required:true
	}


	
}); 

const Customer=mongoose.model("Customer",CustomerSchema);
module.exports=Customer;