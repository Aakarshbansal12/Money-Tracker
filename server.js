var express = require('express');
var bodyParser=require('body-parser');
const db = require('./db'); // connect with the database
require('dotenv').config();
const PORT=process.env.PORT || 5000;



const app=express();
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
app.post('/add',(req,res)=>{
    var category_select=req.body.category_select
    var amount_input=req.body.amount_input
    var info=req.body.info
    var date_input=req.body.date_input
    var data={
        "Category":category_select,
        "Amount":amount_input,
        "Info":info,
        "Date":date_input
    }
    db.collection('user').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted successfully")
    })
})
app.get('/',(req,res)=>{
    res.set({
        "Allow-access-Allow-origin":"*"
    })
    return res.redirect('index.html')
})
app.listen(PORT,() => {
    console.log("server is running at port 5000");
})