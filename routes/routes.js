var router = require('express').Router();

var SeasonController = require('../controllers/SeasonController.js');
var VegetableController = require('../controllers/VegetableController.js');
var RecipeController = require('../controllers/RecipeController.js');

// Static html files
router.get('/', index);
//router.get('/recipes', recipes);

// API Requests
//router.get('/api', apiRequestHandler);

// api/seasons
router.get('/api/seasons', SeasonController.getSeasons);
router.get('/api/seasons/:id/', SeasonController.getSeason);
router.post('/api/seasons/:id/:veg_id', SeasonController.addVegToSeason);

// api/vegetables
router.get('/api/vegetables', VegetableController.getVegetables);
router.get('/api/vegetables/byseason', VegetableController.getVegetablesBySeason);
router.get('/api/vegetables/:id/', VegetableController.getVegetable);
router.get('/api/vegetables/:id/recipes', VegetableController.getVegetableRecipes);
router.post('/api/vegetables', VegetableController.postVegetable);

router.get('/api/recipes', RecipeController.getRecipes);
router.get('/api/recipes/:id', RecipeController.getRecipe);
router.post('/api/recipes', RecipeController.postRecipe);

function index(req, res, next) {
  return res.sendFile('index.html');
}

function apiRequestHandler(req, res, next) {
  return res.json(req.query);
}

function responseResultJson(object) {
  return res.json(object);
}

module.exports = router;
