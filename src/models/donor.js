const mongoose= require('mongoose');
const donorSchema= new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true
    },
    Age:{
        type:Number,
        required:true
    },
    BG:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    }, 
    City:{
        type:String,
        required:true
    },  
    Pincode:{
        type:String,
        required:true
    },  
    Address:{
        type:String,
        required:false
    }, 
})

//create collection
const Donor = new mongoose.model("Donors",donorSchema,"donor");
module.exports=Donor;