//2019-08-19 
//Applied backend NodeJS with ExpressJS framework to hyperloop website
//Uzair Jawaid

//require necessary frameworks
var express = require("express");
var app = express();

//sets main directory path to start in /public
app.use(express.static("public"));

//set up local host port
app.listen(3000, function()
{
  console.log("server started.");
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