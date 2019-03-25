const express=require('express');
const app=express();
const Customer =require('./model/customer');
const mongoose=require('mongoose');
const url=require('../config/config').mongoUrl;

port=process.env.PORT || 5000;

mongoose.connect(url,{useNewUrlParser:true}).then(()=>{
	console.log('Connteced To Database');
})
.catch(err=>console.log(err)
);
app.use(express.urlencoded({extended:false}));

app.use(express.json());
app.get('/',(req,res)=>{
Customer.find({}).then((err,customer)=>{
if(err){
	res.send(err);
}
res.json(customer);
});
});

app.post('/add',(req,res)=>{
	Customer.findOne({name:req.body.name},(err,customer)=>{
		if(err){
			res.send(err);
			return;
		}
		if(customer!=null){
			res.status(400).send({msg:"Customer Already Exists"});
			return;
		}

		var customer=new Customer();
			customer.name=req.body.name;
			customer.id=req.body.id;
            customer.email=req.body.email;
            customer.mobile=req.body.mobile;
			customer.address=req.body.address;
			

		

		customer.save(function(err){
			if(err)
			{
				res.send(err);
				return;
			}
			res.json({msg:"Customer Record Saved"});
		});
	});
});

app.put('/update',(req,res)=>{

	Customer.findOne({id:req.body.id},(err,customer)=>{
		if(err){
			res.send(err);
		}
		if(customer==null){
			res.status(400).send({msg:"Customer Do not Exist"});
			return ;
		}
        customer.name=req.body.name;
        customer.id=req.body.id;
        customer.email=req.body.email;
        customer.mobile=req.body.mobile;
        customer.address=req.body.address;
			

		customer.save(function(err){
			if(err)
			{
				res.send(err);
			}
			res.json({msg:"Customer Record Updated Successfully"});
		});
	});
});

app.delete('/remove',(req,res)=>{
	Customer.findOneAndDelete({id:req.body.id}).then((customer)=>{

		if(customer==null){
			res.status(404).send("Data Not Found");
			return;
			
		}
			res.json({msg:"Customer Record Deleted Successfully"});
		});
	});



app.listen(port,()=>{
console.log(`Server Started  at ${port}`);
});

