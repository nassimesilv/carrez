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

module.exports = {
  getMA : function(city,type,callback){

    var url='https://www.meilleursagents.com/prix-immobilier/'+(city);
      request(url, function(error, response, html){
          if(!error){
              var $ = cheerio.load(html);
              var json = { lowPrice: "", meanPrice: "", highPrice: ""};
              if(type==="Appartement"){
                  $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2)').each(function(i, elm){
                      json.lowPrice=cleanData($(this).find('div.small-4.medium-2.medium-offset-0.columns.prices-summary__cell--muted').text());
                      json.meanPrice=cleanData($(this).find('div.small-4.medium-2.columns.prices-summary__cell--median').text());
                      json.highPrice=cleanData($(this).find('div:nth-child(4)').text());
                  })
              }
              else if(type==="Maison"){
                  $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(3)').each(function(i, elm){
                      json.lowPrice=cleanData($(this).find('div.small-4.medium-2.medium-offset-0.columns.prices-summary__cell--muted').text());
                      json.meanPrice=cleanData($(this).find('div.small-4.medium-2.columns.prices-summary__cell--median').text());
                      json.highPrice=cleanData($(this).find('div:nth-child(4)').text());
                  })
              }
              else {
                  json.lowPrice=null;
                  json.meanPrice=null;
                  json.highPrice=null;
              }
              fs.writeFile('json\\meilleursagent.json', JSON.stringify(json, null, 6))
              callback(JSON.stringify(json, null, 4));
          }
      })
    }
}
console.log('Everything is possible with MEILLEURAGENT nigga');
