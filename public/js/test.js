 var fs = require("fs");
 var contents = fs.readFileSync("carrez\\public\\json\\leboncoin.json");
 var jsonContent = JSON.parse(contents);
 console.log("price:", jsonContent.price);
 console.log("surface:", jsonContent.surface);
 console.log("city:", jsonContent.city);
 console.log("type:", jsonContent.type);
