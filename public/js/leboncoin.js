var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');


function cleanData(text){
  text.replace(/(\r\n|\n|\r)/gm,"");
  text=text.trim();
  return text;
}


module.exports = {compute :function(url){
request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var price, city, type,surface;
            var json = { price : "", city : "", type : "", surface:""};

            $('.item_price.clearfix').filter(function(){
                var data = $(this);
                price = data.attr('content');
                json.price = price;
            })

            // get data
            $('.properties.lineNegative').find('div.line > h2 > span.value').each(function(i, elm) {
                //console.log($(this).text());
                if($(this).prev().text()=="Type de bien"){
                    json.type=$(this).text();
                }
                else if ($(this).prev().children().first().text()=="Ville") {
                  json.city=cleanData($(this).text());
                }
                else if ($(this).prev().text()=="Surface") {
                  json.surface=$(this).text();
                }

            });

            fs.writeFile('json\\leboncoin.json', JSON.stringify(json, null, 4))
        }
    })

}
}


console.log('Everything is possible with us nigga');
