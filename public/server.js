'use strict';
var express = require('express');
var request = require('request');
var leboncoin = require('./js/leboncoin')
var meilleursagents = require('./js/meilleursagent')
var app     = express();


var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(3000, function(){
    console.log('Server running on 3000...');

});

leboncoin.compute("https://www.leboncoin.fr/ventes_immobilieres/1081123462.htm?ca=12_s")
