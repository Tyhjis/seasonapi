'use strict';

module.exports = function(sequelize, DataTypes) {
  var Season = sequelize.define("season", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Season.belongsToMany(models.vegetable, { through: 'vegetable_seasons' });
      }
    }
  });
  return Season;
};
