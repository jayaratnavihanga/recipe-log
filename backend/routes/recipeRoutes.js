const express = require('express');
const { getRecipes, addRecipe, deleteRecipe, updateRecipe } = require('../controllers/recipeController');
const router = express.Router();

router.get('/', getRecipes);
router.post('/', addRecipe);
router.delete('/:id', deleteRecipe);
router.put('/:id', updateRecipe);

module.exports = router;
