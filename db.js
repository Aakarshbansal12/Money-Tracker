var mongoose=require('mongoose');
require('dotenv').config();

//Connecting to database
//const mongourl=process.env.MONGODB_URL_LOCAL
const mongourl=process.env.MONGODB_URL
mongoose.connect(mongourl,{

})
var db=mongoose.connection;

db.once('connected',()=>{
    console.log('connected to mongodb server');
});

db.on('error',(err)=>{
    console.log('connection error',err);
});

db.on('disconnected',()=>{
    console.log('disconnected to mongodb server');
});

//Export the database connection
module.exports=db;