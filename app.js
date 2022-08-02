const express = require("express");
const https = require("https");// HTTPS IS THE STANDARD LIBRARY TO MAKE GET REQUEST
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
res.sendFile(__dirname +"/index.html")
  
})
app.post("/", function(req, res){
//console.log(req.body.cityName) ;  whatever input we give to it, it gets logged in console.

 // https.get("http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=381235d7077b2bfee7b045fdd79f87f4")   OR
 
 const query =req.body.cityName;
 const apikey = "381235d7077b2bfee7b045fdd79f87f4"
 const units = "metric";
 const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+" &appid="+ apikey+"&units="+units+" ";

 https.get(url, function(response){
     console.log(response.statusCode); // gives 200 ->Success

 response.on("data",function(data){
 // console.log(data); Response comes in terminal in hexadecimal form. Put it in hexadecimal convertor and u l see json api info. 
     
 const weatherData = JSON.parse(data); // giving it a structure(kind of string)

 const temp = weatherData.main.temp;
 const wDescp = weatherData.weather[0].description;
 res.write (" <h1>The temprature in "+query+"is "+ temp+" Fahrenheit</h1>");//sending the result to client

 const icon = weatherData.weather[0].icon;
 const imageUrl = "https://openweathermap.org/img/wn/10d@2x.png";
 res.write("<p>The weather is currently "+wDescp +"</p>");
 res.write("<img src=" +imageUrl + ">");
 res.send();
 })

})
})


app.listen(3000,function(){// Call back function
    console.log("Server is running on port 3000");
})