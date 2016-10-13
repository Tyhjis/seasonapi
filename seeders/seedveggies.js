var models = require('../models');
var seed = require('./dbseed.json');

var vegetables = [];
for(var key in seed.vegetables) {
  vegetables.push({name: key});
}
models.vegetable.bulkCreate(vegetables)
  .then(function() {
    console.log("Veggies created");
  }).catch(function(error) {
    console.log(error);
  });
