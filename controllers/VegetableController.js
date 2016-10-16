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
      if(season == null){
        return res.status(404).json({error: 'Not found.'});
      }
      return res.json(season);
    }).catch(function(error) {
      return res.status(500).json(error);
    });
}

function getVegetable(req, res, next) {
  models.vegetable.findById(req.params.id, {
    include: [
      { all: true }
    ]
  }).then(function(vegetable) {
    return res.json(vegetable);
  }).catch(function(error) {
    return res.status(500).json(error);
  });
}

function postVegetable(req, res, next) {
  models.vegetable.create(filterPostBody(req.body))
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

function filterPostBody(body) {
  if(body.name == null) {
    return null;
  }
  return {name: body.name};
}

module.exports.getVegetable = getVegetable;
module.exports.getVegetables = getVegetables;
module.exports.postVegetable = postVegetable;
module.exports.getVegetablesBySeason = getVegetablesBySeason;
