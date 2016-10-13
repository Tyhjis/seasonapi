var models = require('../models');
var seed = require('./dbseed.json');

var seasons = [];
for(var key in seed.seasons) {
  seasons.push({name: key, vegetables: seed.seasons[key]});
}
console.log(seasons);
seasons.forEach(function(season) {
  var vegs = season.vegetables;
  models.season.findOne({where: {name: season.name}})
    .then(function(dbseason) {
      vegs.forEach(function(veg) {
        models.vegetable.findOne({where: {name: veg }})
          .then(function(vegetable) {
            console.log(dbseason.name + ": " + vegetable.name);
            dbseason.addVegetable(vegetable);
          }).catch(function(error) {
            console.err(error);
          });

      });
    }).catch(function(error) {
      console.log(error);
    });
});
