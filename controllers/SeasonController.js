'use strict';

var models = require('../models');

function addVegToSeason(req, res, next) {
  models.season.findById(req.params.id)
    .then(function(season) {
      models.vegetable.findById(req.params.veg_id)
        .then(function(vegetable) {
          season.addVegetable(vegetable)
          return res.json({success: 'OK'});
        })
        .catch(function(error) {
          return res.status(500).json(error);
        });
    })
    .catch(function(error) {
      return res.status(500).json(error);
    });
}

function getSeasons(req, res, next) {
  models.season.findAll()
    .then(function(seasons) {
      return res.json(seasons);
    })
    .catch(function(error) {
      return res.status(500).json(error);
    });
}

function getSeason(req, res, next) {
  models.season.findById(req.params.id, {
    include: [
      { all: true }
    ]
  }).then(function(season) {
      return res.json(season);
    })
    .catch(function(error) {
      return res.status(500).json(error);
    });
}

module.exports.addVegToSeason = addVegToSeason;
module.exports.getSeasons = getSeasons;
module.exports.getSeason = getSeason;
