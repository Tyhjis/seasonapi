var models = require('../models');
var seed = require('./dbseed.json');

var seasons = [];
for(var key in seed.seasons) {
  seasons.push({name: key});
}
models.season.bulkCreate(seasons)
  .then(function() {
    console.log("Seasons created");
  }).catch(function(error) {
    console.log(error);
  });
