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
  getMA : function(){

    'https://www.meilleursagents.com/prix-immobilier/'+formatCity(city);

      request(url, function(error, response, html){
          if(!error){
              var $ = cheerio.load(html);
              var lowPriceHouse, lowPriceFlat, meanPriceHouse, meanPriceFlat, highPriceHouse, highPriceFlat;
              var json = { lowPriceHouse: "", lowPriceFlat: "", meanPriceHouse: "", meanPriceFlat: "", highPriceHouse: "", highPriceFlat: ""};

              $('')
              $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2)').each(function(i, elm){
                  json.lowPriceFlat=cleanData($(this).find('div.small-4.medium-2.medium-offset-0.columns.prices-summary__cell--muted').text());
                  json.meanPriceFlat=cleanData($(this).find('div.small-4.medium-2.columns.prices-summary__cell--median').text());
                  json.highPriceFlat=cleanData($(this).find('div:nth-child(4)').text());
              })

              $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(3)').each(function(i, elm){
                  json.lowPriceHouse=cleanData($(this).find('div.small-4.medium-2.medium-offset-0.columns.prices-summary__cell--muted').text());
                  json.meanPriceHouse=cleanData($(this).find('div.small-4.medium-2.columns.prices-summary__cell--median').text());
                  json.highPriceHouse=cleanData($(this).find('div:nth-child(4)').text());
              })
              fs.writeFile('json\\meilleursagent.json', JSON.stringify(json, null, 6))
          }
      })
    }
}
console.log('Everything is possible with us nigga');
