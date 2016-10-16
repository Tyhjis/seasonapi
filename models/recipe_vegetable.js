'use strict';

module.exports = function(sequelize, DataTypes) {
  var RecipeVegetable = sequelize.define("recipe_vegetable");
  return RecipeVegetable;
};
