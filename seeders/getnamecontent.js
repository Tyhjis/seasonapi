var models = require('../models');
var fs = require('fs');

var tables = {
  seasons: {},
  vegetables: {},
  recipes: []
};

Promise.all([
  models.season.findAll({include: [{all: true}]}),
  models.vegetable.findAll({include: [{all: true}]}),
  models.recipe.findAll()
]).then(function(results) {
  results[0].forEach(function(season) {
    tables.seasons[season.name] = [];
    season.vegetables.forEach(function(vegetable) {
      tables.seasons[season.name].push(vegetable.name);
    })
  });
  results[1].forEach(function(vegetable) {
    tables.vegetables[vegetable.name] = [];
    vegetable.recipes.forEach(function(recipe) {
      tables.vegetables[vegetable.name].push(recipe.name);
    })
  });
  results[2].forEach(function(recipe) {
    tables.recipes.push(recipe.name);
  });
  fs.writeFileSync('dbseed.json', JSON.stringify(tables));
}).catch(function(error) {
  console.log(error);
});
