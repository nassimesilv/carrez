var express = require('express');
var request = require('request');
var app     = express();



var button = document.querySelector('#compute');

button.addEventListener('click', function onClick () {
  app.post('/compute', function(req, res) {
      var url = document.getElementById('#lien').value;
      res.send(url);
  });
}

app.get('/compute', function(req, res) {
  var url = req.body.url;

});
