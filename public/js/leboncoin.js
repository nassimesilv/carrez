var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');

<<<<<<< HEAD
=======
function cleanData(text){
  text.replace(/(\r\n|\n|\r)/gm,"");
  text=text.trim();
  return text;
}

app.get('/scrape', function(req, res){
  var title;
    url = 'https://www.leboncoin.fr/ventes_immobilieres/1076257949.htm?ca=12_s';
>>>>>>> ae80471d42271ffd55e7f993de10b7352c57ca0d

function cleanData(text){
  text.replace(/(\r\n|\n|\r)/gm,"");
  text=text.trim();
  return text;
}




module.exports = {compute :function(url){
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
<<<<<<< HEAD
                else if ($(this).prev().children().first().text()=="Ville") {
                  json.city=cleanData($(this).text());
=======
                else if (prop.children().first().text()=="Ville") {
                  json.city=cleanData(data.text());
>>>>>>> ae80471d42271ffd55e7f993de10b7352c57ca0d
                }
                else if (prop.text()=="Surface") {
                  json.surface=data.text();
                }
            });

<<<<<<< HEAD
            fs.writeFile('json\\leboncoin.json', JSON.stringify(json, null, 4))
=======
            fs.writeFile('..\\json\\leboncoin.json', JSON.stringify(json, null, 4), function(err){
                res.send('File successfully written! - Check your project directory for the output.json file');
            })
>>>>>>> ae80471d42271ffd55e7f993de10b7352c57ca0d
        }
    })

}
}


console.log('Everything is possible with us nigga');
