import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipes } from '../services';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                const recipes = await fetchRecipes();
                const selectedRecipe = recipes.find((r) => r._id === id);
                setRecipe(selectedRecipe);
            } catch (error) {
                console.error('Error loading recipe:', error);
            } finally {
                setLoading(false);
            }
        };
        loadRecipe();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (!recipe) return <div className="text-center mt-20">Recipe not found.</div>;

    return (
        <div className="min-h-screen bg-yellow-400  py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
                <p className="text-gray-700 mb-4">{recipe.description}</p>
                <h2 className="text-2xl font-semibold mb-2">Ingredients:</h2>
                <ul className="list-disc pl-5 mb-4">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <Link to="/" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default RecipeDetails;
