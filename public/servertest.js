'use strict';
var leboncoin = require('./js/leboncoin');
var meilleursagents = require('./js/meilleursagent');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');


var app = express();
app.use("/css",  express.static(__dirname + '/css'));

app.get('/', function (req, res) {
      res.sendFile(__dirname + '/index.html');
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/compute", function (req, res) {
    var link=req.body.lien;

    leboncoin.compute(link, function(data){
        var jsonBC = JSON.parse(data);
        meilleursagents.getMA(jsonBC.city,jsonBC.type,function(data){
            var jsonMA = JSON.parse(data);
        });
    });

    res.sendFile(__dirname + '/index.html');
});


app.listen(8000);
console.log("Every thing is possible with our server nigga");
