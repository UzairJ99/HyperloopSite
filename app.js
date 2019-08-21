//2019-08-19 
//Applied backend NodeJS with ExpressJS framework to hyperloop website
//Uzair Jawaid

//require necessary frameworks
var express = require("express");
var app = express();
var nodemailer = require("nodemailer");
var bodyParser = require("body-parser");

//sets main directory path to start in /public
app.use(express.static("public"));
//allows form information extraction
app.use(bodyParser.urlencoded({extended: true}));

//transponder goes here for nodemailer

//setting up email information
var mailOptions = {
  from: 'hyperloopmailman@gmail.com',
  to: 'mcmasterhyperloopteam@gmail.com',
  subject: 'Hyperloop Website',
  text: ''
};

//sends an email using nodemailer
function sendIt()
{
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

//set up local host port
app.listen(3000, function()
{
  console.log("server started.");
});

//Contact post route
app.post("/", function(req, res)
{
  //extract info from form
  var name = req.body.name;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var message = req.body.message;
    
  var sendThis = "<p> Email sent from: " + name + lastName + '.</p><br>';
      sendThis += "<p> Their email is: " + email + '.</p><br>';
      sendThis += "<p> Their message is: " + message + '.</p><br>';

  //replaces nodemailer defualt text message
  mailOptions.html = sendThis;
  sendIt();

  console.log(sendThis);
  res.render("index.ejs");
});

//router get methods to render each page
app.get("/", function(req, res)
{
  res.render("index.ejs");
});

app.get("/contact", function(req, res)
{
  res.render("contact.ejs");
});

app.get("/about", function(req, res)
{
  res.render("about.ejs");
});

app.get("/blog", function(req, res)
{
  res.render("blog.ejs");
});

app.get("/ourTeam", function(req, res)
{
  res.render("ourTeam.ejs");
});

app.get("/partners", function(req, res)
{
  res.render("partners.ejs");
});