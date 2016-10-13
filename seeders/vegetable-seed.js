'use strict';
var models = require('../models');
var vegs = require('./vegetables.json');
models.vegetable.bulkCreate(vegs, {});
