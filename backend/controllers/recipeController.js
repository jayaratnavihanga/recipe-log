const Recipe = require('../models/Recipe');

exports.getRecipes = async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
};

exports.addRecipe = async (req, res) => {
    const { name, ingredients, description } = req.body;
    const recipe = new Recipe({ name, ingredients, description });
    await recipe.save();
    res.json(recipe);
};

exports.deleteRecipe = async (req, res) => {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    res.json({ message: 'Recipe deleted' });
};

exports.updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, description } = req.body;
    const recipe = await Recipe.findByIdAndUpdate(id, { name, ingredients, description }, { new: true });
    res.json(recipe);
};
