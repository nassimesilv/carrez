var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

function cleanData(text){
  text.replace(/(\r\n|\n|\r)/gm,"");
  text=text.trim();
  return text;
}

app.get('/scrape', function(req, res){
  var title;
    url = 'https://www.leboncoin.fr/ventes_immobilieres/1076257949.htm?ca=12_s';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var json = { price : "", city : "", type : "", surface:""};

            $('.item_price.clearfix').filter(function(){
                var data = $(this);
                json.price = data.attr('content');
            })

            // get data
            $('.properties.lineNegative').find('div.line > h2 > span.value').each(function(i, elm) {
                var data=$(this);
                var prop=data.prev();
                if(prop.text()=="Type de bien"){
                    json.type=data.text();
                }
                else if (prop.children().first().text()=="Ville") {
                  json.city=cleanData(data.text());
                }
                else if (prop.text()=="Surface") {
                  json.surface=data.text();
                }
            });

            fs.writeFile('..\\json\\leboncoin.json', JSON.stringify(json, null, 4), function(err){
                res.send('File successfully written! - Check your project directory for the output.json file');
            })
        }
    })

})

app.listen('8082')

console.log('Everything is possible with us nigga');

exports = module.exports = app;
