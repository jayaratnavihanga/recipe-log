import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to the RecipeDetails page
import { fetchRecipes, addNewRecipe, updateRecipe, deleteRecipe } from '../services';
import AddRecipeModal from '../components/AddRecipeModal';
import EditRecipeModal from '../components/EditRecipeModal';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [recipeToEdit, setRecipeToEdit] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const data = await fetchRecipes();
                setRecipes(data);
            } catch (error) {
                console.error('Error loading recipes:', error);
            } finally {
                setLoading(false);
            }
        };
        loadRecipes();
    }, []);

    const handleAction = async (action, id, data) => {
        try {
            if (action === 'add') {
                const addedRecipe = await addNewRecipe(data);
                setRecipes((prev) => [...prev, addedRecipe]);
            } else if (action === 'update') {
                await updateRecipe(id, data);
                setRecipes((prev) =>
                    prev.map((recipe) => (recipe._id === id ? { ...recipe, ...data } : recipe))
                );
            } else if (action === 'delete') {
                await deleteRecipe(id);
                setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
            }
        } catch (error) {
            console.error(`Error during ${action} action:`, error);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    const handleEdit = (recipe) => {
        setRecipeToEdit(recipe);
        setIsEditModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat /*bg-yellow-400*/ bg-[url('/bg.jpg')] relative pt-5">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <h2
                                    className="text-2xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-blue-500"
                                    onClick={() => navigate(`/recipe/${recipe._id}`)} // Navigate to recipe details
                                >
                                    {recipe.name}
                                </h2>
                                <p className="text-gray-700 mb-4">{recipe.description}</p>
                                <h3 className="font-semibold mb-2">Ingredients:</h3>
                                <ul className="list-disc pl-5 text-gray-600 mb-4">
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Are you sure?')) handleAction('delete', recipe._id);
                                        }}
                                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleEdit(recipe)}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => setIsAddModalOpen(true)}
                className="fixed bottom-8 right-8 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 shadow-lg"
            >
                Add New Recipe
            </button>

            <AddRecipeModal
                isOpen={isAddModalOpen}
                closeModal={() => setIsAddModalOpen(false)}
                addRecipe={(data) => handleAction('add', null, data)}
            />

            <EditRecipeModal
                isOpen={isEditModalOpen}
                closeModal={() => setIsEditModalOpen(false)}
                recipe={recipeToEdit}
                updateRecipe={(data) => handleAction('update', recipeToEdit._id, data)}
            />
        </div>
    );
};

export default Home;
