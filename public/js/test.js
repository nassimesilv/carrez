

function formatCity(text){
  text.split(' ').join('-')
  return text;
}

function cleanData(text){
  text.replace(/(\r\n|\n|\r)/gm,"");
  text=text.trim();
  return text;
}

console.log("begoni");
var text=('\\n chalons en champagne 51000 \\n');
text=cleanData(text)
console.log(text)
console.log("end");
