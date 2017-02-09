
var leboncoin = require('./js/leboncoin');
var meilleursagents = require('./js/meilleursagent');

var button = document.querySelector('#submit');

button.addEventListener('click', function onClick () {
    var link=document.querySelector('#lien').value;
    leboncoin.compute(link, function(data){
        var jsonBC = JSON.parse(data);
        meilleursagents.getMA(jsonBC.city,jsonBC.type,function(data){
            var jsonMA = JSON.parse(data);
        });
    });
}
