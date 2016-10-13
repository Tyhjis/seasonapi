var vegs = require('./kasvikset.json');
var fs = require('fs');

var uniqs = [];
var vegar = vegs.veggies.split(',');
vegar.forEach(function(veg) {
  if(uniqs.indexOf(veg.trim().toLowerCase()) === -1) {
    uniqs.push({name: veg.trim().toLowerCase()});
  }
});

var uniqJson = JSON.stringify(uniqs);
fs.writeFileSync('vegetables.json', uniqJson);
