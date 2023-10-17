//jshint esversion:6
// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// var encrypt = require("mongoose-encryption");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const md5 = require("md5");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

const app = express();

// console.log(process.env.API_KEY);
// console.log(md5("123456"));

app.use(express.static("public"));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
    extended:true
}));


mongoose.connect("mongodb+srv://aadilgani2001:RnRX8ol50nmIIOxV@cluster0.fxupkny.mongodb.net/secrets?directConnection=true",{ useNewUrlParser: true ,useUnifiedTopology: true })
.then(()=>console.log('connected Sucessfully'))
.catch((err)=> {console.log(err);});


const userSchema = new mongoose.Schema({
    email:String,
    password:String
});

// const secret = "thisislittlesecret"

// userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:["password"]});

const User = new mongoose.model("User",userSchema);

app.get("/",function(req,res){
    res.render("home");
});

app.get("/login",function(req,res){
    res.render("login");
});
app.get("/register",function(req,res){
    res.render("register");
});
app.post("/register",function(req,res){
    const newUser = new User({
        email : req.body.username,
        password: req.body.password
    });

    newUser.save().then(()=>{
        res.render("secrets");
    }).catch((err)=>{
        console.log(err);
    });
});

app.post("/login",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email:username}).then((foundUser)=>{    
    if(foundUser.password === password){
            res.render("secrets");
       }
    }).catch((err)=>{
        
        console.log(err);    
    });
    });

app.listen(3000,function(){
    console.log("Server running on port 3000");
});