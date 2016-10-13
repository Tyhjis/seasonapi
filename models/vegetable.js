'use strict';

module.exports = function(sequelize, DataTypes) {
  var Vegetable = sequelize.define("vegetable", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Vegetable.belongsToMany(models.season, { through: 'vegetable_seasons' });
        Vegetable.belongsToMany(models.recipe, { through: 'recipe_vegetables' });
      }
    }
  });
  return Vegetable;
};
