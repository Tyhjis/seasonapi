'use strict';

var models = require('../models');

function postRecipe(req, res, next) {
  var body = req.body;
  models.recipe.create(req.body)
    .then(function(result) {
      if(body.vegetables != null && body.vegetables.length > 0) {
        var temp = result;
        for(var veg of body.vegetables) {
          models.vegetable.findById(veg)
            .then(function(vegetable) {
              result.addVegetable(vegetable);
            }).catch(function(error) {
              return res.json(error);
            });
        }
      }
      return res.json(result);
    }).catch(function(error) {
      return res.json(error);
    });
}

function getRecipe(req, res, next) {
  models.recipe.findById(req.params.id, {
    include: {
      all: true
    }
  }).then(function(recipe) {
    if(recipe == null) {
      return res.status(404).json({error: 'Not found.'});
    }
    return res.json(recipe);
  }).catch(function(error) {
    return res.status(500).json(error);
  });
}

function getRecipes(req, res, next) {
  models.recipe.findAll()
    .then(function(recipes) {
      return res.json(recipes);
    }).catch(function(error) {
      return res.status(500).json(error);
    });
}

module.exports.getRecipe = getRecipe;
module.exports.getRecipes = getRecipes;
module.exports.postRecipe = postRecipe;
