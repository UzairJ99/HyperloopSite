//2019-08-19 
//Applied backend NodeJS with ExpressJS framework to hyperloop website
//Uzair Jawaid

//require necessary frameworks
var express = require("express");
var app = express();
var nodemailer = require("nodemailer");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//connect to MongoDB
mongoose.connect("mongodb://localhost/hyperloopblogs", {useNewUrlParser: true});

//schema setup
var blogSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    description: String,
    date: String
  }
);

//create mongo model to use schema
var Blog = mongoose.model("Blog", blogSchema);

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

Blog.create(
  {
    title: "Website Deployment",
    image: "",
    description: "McMaster's hyperloop team has officially hosted their website into live production!",
    date: date
  },
  function(err, blog)
  {
    if(err)
    {
      console.log(err);
    }
    else
    {
      console.log("New blog created.");
      console.log(blog);
    }
  }
);

//sets main directory path to start in /public
app.use(express.static("public"));
//allows form information extraction
app.use(bodyParser.urlencoded({extended: true}));


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
  //search database for all blogs and pass them through as allBlogs
  Blog.find({}, function(err, allBlogs)
  {
    if(err)
    {
      console.log(err);
    }
    else
    {
      //render the page
      //the ejs file will reference each item from the database as 'blogs'
      res.render("blog.ejs", {blogs:allBlogs});
    }
  });

});

app.get("/ourTeam", function(req, res)
{
  res.render("ourTeam.ejs");
});

app.get("/partners", function(req, res)
{
  res.render("partners.ejs");
});