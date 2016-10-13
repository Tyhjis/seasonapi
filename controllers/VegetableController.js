'use strict';

var models = require('../models');


function getVegetables(req, res, next) {
  models.vegetable.findAll()
    .then(function(vegetables) {
      return res.json(vegetables);
    })
    .catch(function(error) {
      return res.status(500).json(error);
    });
}

function getVegetablesBySeason(req, res, next) {
  models.season.findOne({
    where: {
      name: req.query.s
    },
    include: {
      all: true
    }
  })
    .then(function(season) {
      res.json(season);
    }).catch(function(error) {
      res.status(500).json(error);
    });
}

function getVegetable(req, res, next) {
  models.vegetable.findById(req.params.id, {
    include: [
      { all: true }
    ]
  }).then(function(vegetable) {
    res.json(vegetable);
  }).catch(function(error) {
    res.status(500).json(error);
  });
}

function postVegetable(req, res, next) {
  models.vegetable.create(req.body)
    .then(function() {
      models.vegetable.findAll()
        .then(function(vegetables) {
          return res.json(vegetables);
        })
        .catch(function(error) {
          return res.status(500).json(error);
        });
    })
    .catch(function(error) {
      return res.status(500).json(error);
    });
}

module.exports.getVegetable = getVegetable;
module.exports.getVegetables = getVegetables;
module.exports.postVegetable = postVegetable;
module.exports.getVegetablesBySeason = getVegetablesBySeason;
