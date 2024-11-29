import React, { useState, useEffect } from 'react';
import { fetchRecipes, addNewRecipe, updateRecipe, deleteRecipe } from '../services';
import AddRecipeModal from '../components/AddRecipeModal';
import EditRecipeModal from '../components/EditRecipeModal'; // Import the EditModal component

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control edit modal visibility
    const [recipeToEdit, setRecipeToEdit] = useState(null); // State to store the recipe being edited

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
        setRecipeToEdit(recipe); // Set the recipe to be edited
        setIsEditModalOpen(true); // Open the edit modal
    };

    return (
        <div>
            <button onClick={() => setIsAddModalOpen(true)} className="mb-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                Add New Recipe
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                        <div className="p-4">
                            <h2 className="text-xl font-bold">{recipe.name}</h2>
                            <p className="text-gray-700 mt-2">{recipe.description}</p>
                            <h3 className="mt-4 font-semibold">Ingredients:</h3>
                            <ul className="list-disc pl-5 text-gray-600">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>

                            <button onClick={() => { if (window.confirm("Are you sure?")) handleAction('delete', recipe._id); }} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                                Delete
                            </button>

                            <button onClick={() => handleEdit(recipe)} className="mt-4 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <AddRecipeModal isOpen={isAddModalOpen} closeModal={() => setIsAddModalOpen(false)} addRecipe={(data) => handleAction('add', null, data)} />

            {/* Edit Recipe Modal */}
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
