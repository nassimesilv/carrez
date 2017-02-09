var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');


function cleanData(text){
  text.replace(/(\r\n|\n|\r)/gm,"");
  text=text.trim();
  text=text.toLowerCase();
  text = text.replace(/[èéêë]/g,"e"); 
  return text.split(' ').join('-');
}



module.exports = {

  compute:function(url,callback){
      request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var data,parent;
            var json = { price : "", city : "", type : "", surface:""};
            $('.item_price.clearfix').filter(function(){
                data=$(this);
                json.price = data.attr('content');
            })

            $('.properties.lineNegative').find('div.line > h2 > span.value').each(function(i, elm) {
              data=$(this);
              parent=$(this).prev();
              if(parent.text()=="Type de bien"){
                  json.type=data.text();
              }
              else if (parent.children().first().text()=="Ville") {
                json.city=cleanData(data.text());
              }
              else if (parent.text()=="Surface") {
                json.surface=data.text();
              }

            });
            fs.writeFile('json\\leboncoin.json', JSON.stringify(json, null, 4))
            callback(JSON.stringify(json, null, 4));
        }
    })
  }
}


console.log('Everything is possible with LEBONCOIN nigga');
