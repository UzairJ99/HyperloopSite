var express = require("express");
var app = express();

app.use(express.static("public"));

app.listen(3000, function(){
  console.log("server started.");
});

app.get("/", function(req, res){
  res.render("index.ejs");
});

app.get("/contact", function(req, res){
  res.render("contact.ejs");
});