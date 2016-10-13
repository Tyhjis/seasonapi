'use strict';

module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define('recipe', {
    name: DataTypes.STRING,
    instructions: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Recipe.belongsToMany(models.vegetable, { through: 'recipe_vegetables' })
      }
    }
  });
  return Recipe;
}
