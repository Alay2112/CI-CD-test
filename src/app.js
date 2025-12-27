const express= require('express');
const app= express();
const path= require('path');
app.use(express.static(path.join(__dirname, "../public")));


const port=process.env.PORT || 3000;

require('./db/conn.js');
const Donor=require('./models/donor.js')
const Request=require('./models/requestor.js')
// const { homedir } = require("os");



app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/home.html'))
})
app.get('/req',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/req.html'))
})
app.get('/donor',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/donor.html'))
})
app.post('/donor',async(req,res)=>{
    try{
        const DonorDetails= new Donor({
        Name : req.body.Name ,
        Phone : req.body.Phone ,
        Age: req.body.Age,
        BG : req.body.BG ,
        State: req.body.State,
        City: req.body.City,
        Pincode : req.body.Pincode ,
        Address : req.body.Address 
     })
        const donor= await DonorDetails.save();
        console.log("Donor Saved",donor)
       res.redirect("/");
    }
    catch(error){
        res.status(400).send(error);
    }
})
app.post("/requestblood",async(req,res) =>{
  try{
   const UserReq= new Request({
       Name: req.body.Name,
       PhoneNo: req.body.PhoneNo,
       BLG : req.body.BLG ,
       State: req.body.State,
       City: req.body.City,
       PinCode: req.body.PinCode,
       Address: req.body.Adress,
   })    
      const request= await UserReq.save();
      console.log("Request Saved",request)
      res.redirect("/table.html");
   

  } catch(error) {
   res.status(400).send(error);
  }
});


app.get('/table',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/table.html'))
})


app.post("/finddonor", async (req, res) => {
  try {
    console.log("Incoming request to /finddonor:", req.body); 

    const {  BLG, Pincode, City, State } = req.body;

    if (!BLG) {
      return res.status(400).json({ error: "Blood Group is required" });
    }

    const allMatched = await Donor.find({ BG: BLG });

    const sorted = [
      ...allMatched.filter(d => d.Pincode === Pincode),
      ...allMatched.filter(
        d => d.Pincode !== Pincode && d.City.toLowerCase() === City.toLowerCase()
      ),
      ...allMatched.filter(
        d =>
          d.Pincode !== Pincode &&
          d.City.toLowerCase() !== City.toLowerCase() &&
          d.State.toLowerCase() === State.toLowerCase()
      )
    ];

    res.status(200).json(sorted);
  } catch (err) {
    console.error("Error while fetching donors:", err); // already here
    res.status(500).send("Server error while fetching donors");
  }
});


app.listen(port,()=>{
    console.log(`Server is running at port no. ${port}`)
})


// app.listen(3000,'0.0.0.0'); // for mobile use 
