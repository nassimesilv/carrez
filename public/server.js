'use strict';
var leboncoin = require('./js/leboncoin');
var meilleursagents = require('./js/meilleursagent');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');


var app = express();
app.use("/css",  express.static(__dirname + '/css'));
app.set('view engine','ejs');

app.get('/', function (req, res) {
    res.render(__dirname + '/HTML/index',{result_text:"Hello, we'll predict if the good's price is acceptable. ",yes_no:"null",result_values:""});
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/", function (req, res) {
    var link=req.body.lien;
    leboncoin.compute(link, function(data){
        var jsonBC = JSON.parse(data);
        meilleursagents.getMA(jsonBC.city,jsonBC.type,function(data){
            var jsonMA = JSON.parse(data);
            var percent;
            var result,result_values;
            var yes_no;
            var pricePerM2=jsonBC.price/jsonBC.surface;
            if(jsonMA.lowPrice==null || jsonMA.lowPrice==""){
                result="We cannot compute for your proprety. We handle houses and apartment only.";
                yes_no="error";
            }
            else{
                percent = (((jsonMA.meanPrice-pricePerM2)/(pricePerM2))*100).toFixed(2);
                result="Best price :"+jsonMA.lowPrice+" € 	 Mean price : "+jsonMA.meanPrice+" €  	    Worst Price : "+jsonMA.highPrice+" €.";
                if(percent<15 && percent>-15){
                  result_values=" Your house is "+ percent +" % further than the mean price, you can buy this one!";
                  yes_no="good";
                }
                else{
                  percent = (((pricePerM2 - jsonMA.meanPrice)/(jsonMA.meanPrice))*100).toFixed(2);
                  result_values=" Your house is "+ percent +" % further than the mean price, you can have a better one.";
                  yes_no="no good";
                }
            }
            res.render(__dirname + '/HTML/index',{result_text:result,yes_no:yes_no,result_values:result_values});
            });
    });
});

app.listen(8000);
console.log("Every thing is possible with our server nigga");
