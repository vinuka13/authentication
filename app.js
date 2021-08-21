const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
mongoose.connect('mongodb://localhost:27017/loginDB', {useNewUrlParser: true, useUnifiedTopology: true});

const loginSchema = new mongoose.Schema({
  username: String,
  password: String,
})

const Logdata = mongoose.model('Logdata', loginSchema)

app.get("/", function(req, res){
  res.sendFile(__dirname+"/home.html");

})

app.post("/", function(req, res){
  var un = req.body.username;
  var pass = req.body.password;

  Logdata.find({}, function(err, docs){
    for(var i=0; i<docs.length; i++){
      if(docs[i].username === un){
        if(docs[i].password === pass){
      //return statment is not to get the error [ERR_HTTP_HEADERS_SENT]
      return res.render("main", {message: "Successsfuly loged in"})
        } else{
      //return statment is not to get the error [ERR_HTTP_HEADERS_SENT]     
        return  res.render("main", {message: "Password incoorect"})
        }
      } else{
        console.log("username not found")
      }
    } res.render("main", {message: "Username not found"})
  })
})


app.get("/sign-up", function(req,res){
  res.sendFile(__dirname+"/sign-up.html");
})

app.post("/sign-up", function(req, res){
    var user = req.body.name;
    var password = req.body.word;

    const newLogindata = new Logdata ({
      username: user,
      password: password
    });

    newLogindata.save(function(err){
      if(!err){
        res.redirect("/")
      }
    })


})

app.listen(3000, function(){
  console.log("server runnig");
})
