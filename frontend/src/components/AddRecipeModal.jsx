import React, { useState } from 'react';

const AddRecipeModal = ({ isOpen, closeModal, addRecipe }) => {
    // State to manage form data (name, description, ingredients)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        ingredients: [''], // Start with one empty ingredient field
    });

    // Handle changes to general input fields (name, description)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle changes to a specific ingredient field
    const handleIngredientChange = (index, value) => {
        const updatedIngredients = formData.ingredients.map((ingredient, i) =>
            i === index ? value : ingredient // Update the ingredient at the given index
        );
        setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
    };

    // Add a new empty ingredient field to the ingredients list
    const handleAddIngredient = () => setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, ''],
    }));

    // Remove an ingredient from the list based on its index
    const handleRemoveIngredient = (index) => {
        const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
    };

    // Handle form submission to add the new recipe
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const { name, description, ingredients } = formData;

        // Call the addRecipe function passed from the parent component
        await addRecipe({
            name,
            description,
            ingredients: ingredients.filter(ingredient => ingredient.trim() !== ''), // Filter out empty ingredients
        });

        // Reset the form after submission
        setFormData({ name: '', description: '', ingredients: [''] });
        closeModal(); // Close the modal after submitting the form
    };

    // If the modal is not open, return null to avoid rendering anything
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl text-black font-bold mb-4">Add New Recipe</h2>
                <form onSubmit={handleSubmit}>
                    {/* Recipe Name Input */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm text-black font-semibold">Recipe Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Recipe Description Input */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-semibold text-black">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows="4"
                            required
                        />
                    </div>

                    {/* Ingredients Section */}
                    <div className="mb-4">
                        <label className="block text-sm text-black font-semibold">Ingredients</label>
                        {formData.ingredients.map((ingredient, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={ingredient}
                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder={`Ingredient ${index + 1}`}
                                    required
                                />
                                {/* Remove button for each ingredient */}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveIngredient(index)}
                                    className="ml-2 text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        {/* Add button to add a new ingredient */}
                        <button type="button" onClick={handleAddIngredient} className="text-blue-500">Add Ingredient</button>
                    </div>

                    {/* Action Buttons: Submit and Close */}
                    <div className="flex justify-between">
                        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Add Recipe</button>
                        <button type="button" onClick={closeModal} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRecipeModal;
