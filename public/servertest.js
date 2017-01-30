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

app.post("/", function (req, res) {
    var link=req.body.lien;
    var values;
    leboncoin.compute(link);
    fs.readFile('json\\leboncoin.json', 'utf8', function (err, data) {
        values = JSON.parse(data);
        console.log(values.type);
        console.log(values.price);
        console.log(values.city);
        console.log(values.surface);
    });
    res.sendFile(__dirname + '/index.html');
    console.log(values); // WTF??
});


app.listen(8000);
console.log("Every thing is possible with our server nigga");
