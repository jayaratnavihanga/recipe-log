import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {fetchRecipes, addNewRecipe, updateRecipe, deleteRecipe} from '../services';
import AddRecipeModal from '../components/AddRecipeModal';
import EditRecipeModal from '../components/EditRecipeModal';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [recipeToEdit, setRecipeToEdit] = useState(null);
    const navigate = useNavigate();

    // Fetching recipes when the component mounts
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

    // Handle Add, Update, Delete actions
    const handleAction = async (action, id, data) => {
        try {
            if (action === 'add') {
                const addedRecipe = await addNewRecipe(data);
                setRecipes((prev) => [...prev, addedRecipe]);
            } else if (action === 'update') {
                await updateRecipe(id, data);
                setRecipes((prev) =>
                    prev.map((recipe) => (recipe._id === id ? {...recipe, ...data} : recipe))
                );
            } else if (action === 'delete') {
                await deleteRecipe(id);
                setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
            }
        } catch (error) {
            console.error(`Error during ${action} action:`, error);
        }
    };

    // Show loading spinner while fetching data
    if (loading) return <div className="flex justify-center items-center h-screen"><span
        className="loading loading-spinner loading-lg"></span></div>;

    // Handle Edit button click
    const handleEdit = (recipe) => {
        setRecipeToEdit(recipe);
        setIsEditModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/bg.jpg')] relative pt-5">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative h-96 sm:h-80 w-full"
                        >
                            <div className="p-4 sm:p-6"
                                 onClick={() => navigate(`/recipe/${recipe._id}`)} // Navigate to recipe details page
                            >
                                <h2
                                    className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-green-500"
                                    onClick={() => navigate(`/recipe/${recipe._id}`)} // Navigate to recipe details page
                                >
                                    {recipe.name}
                                </h2>
                                <p className="text-sm sm:text-base text-gray-700 mb-4 line-clamp-3">
                                    {recipe.description}
                                </p>
                                <h3 className="text-sm text-black sm:text-base font-semibold mb-2">Ingredients:</h3>
                                <ul className="list-disc pl-5 text-sm sm:text-base text-gray-600 line-clamp-3">
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Buttons for Edit and Delete actions */}
                            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row gap-2">
                                <button
                                    onClick={() => handleEdit(recipe)} // Trigger edit modal
                                    className="btn btn-secondary border-none bg-yellow-400 text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-yellow-500 w-full sm:w-auto"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        if (window.confirm('Are you sure?')) handleAction('delete', recipe._id); // Confirm and delete
                                    }}
                                    className="btn btn-secondary border-none bg-red-500 text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-red-600 w-full sm:w-auto"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Button to open Add Recipe Modal */}
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="fixed bottom-8 right-8 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 shadow-lg"
            >
                Add New Recipe
            </button>

            {/* Modals for Add and Edit Recipe */}
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
