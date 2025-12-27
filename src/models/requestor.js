const mongoose= require('mongoose');
const reqSchema= new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    PhoneNo:{
        type:Number,
        required:true
    },
    BLG:{
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
    PinCode:{
        type:String,
        required:true
    },  
    Address:{
        type:String,
        required:false
    }, 
})

//create collection
const Req = new mongoose.model("Req",reqSchema,"req");
module.exports=Req;