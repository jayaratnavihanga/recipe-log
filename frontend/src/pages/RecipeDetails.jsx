import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipes } from '../services';

const RecipeDetails = () => {
    // Fetching the recipe ID from the URL parameters
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetching recipe details based on the ID
    useEffect(() => {
        const loadRecipe = async () => {
            try {
                const recipes = await fetchRecipes(); // Fetching all recipes
                const selectedRecipe = recipes.find((r) => r._id === id); // Find the recipe by ID
                setRecipe(selectedRecipe);
            } catch (error) {
                console.error('Error loading recipe:', error); // Error handling
            } finally {
                setLoading(false); // Stop the loading spinner once the recipe is fetched
            }
        };
        loadRecipe();
    }, [id]); // Re-fetch when the ID changes

    // Loading spinner while fetching recipe data
    if (loading) return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;

    // Display message if no recipe is found for the given ID
    if (!recipe) return <div className="text-center mt-20">Recipe not found.</div>;

    return (
        <div className="min-h-screen text-black bg-cover bg-center bg-no-repeat bg-[url('/bg.jpg')] py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
                <p className="mb-4">{recipe.description}</p>
                <h2 className="text-2xl font-semibold mb-2">Ingredients:</h2>
                <ul className="list-disc pl-5 mb-4">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                {/* Link to navigate back to the Home page */}
                <Link to="/"
                      className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default RecipeDetails;
