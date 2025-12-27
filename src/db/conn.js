const mongoose=require("mongoose");
mongoose.connect(
  "mongodb+srv://alaypatel212_db_user:elG3KwGrOZZzBw8q@bloodbond.kv5cktk.mongodb.net/?appName=BloodBond",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() =>{
    console.log(`connection successful`);
}).catch((e) =>{
    console.log(`no connection`);
})
