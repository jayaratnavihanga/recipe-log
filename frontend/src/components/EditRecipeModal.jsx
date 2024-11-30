import React, { useState, useEffect } from 'react';

const EditRecipeModal = ({ isOpen, closeModal, recipe, updateRecipe }) => {
    // State to manage form data for name, description, and ingredients
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        ingredients: [''],
    });

    // Set initial form data when the recipe prop changes
    useEffect(() => {
        if (recipe) {
            setFormData({
                name: recipe.name,
                description: recipe.description,
                ingredients: recipe.ingredients,
            });
        }
    }, [recipe]);

    // Handle changes to input fields (name, description)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle changes to individual ingredients
    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients[index] = value;
        setFormData((prevData) => ({
            ...prevData,
            ingredients: updatedIngredients,
        }));
    };

    // Remove an ingredient from the list
    const handleRemoveIngredient = (index) => {
        const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            ingredients: updatedIngredients,
        }));
    };

    // Handle form submission to save the changes
    const handleSubmit = (e) => {
        e.preventDefault();
        updateRecipe(formData);  // Call the updateRecipe function passed from the parent
        closeModal();  // Close the modal after saving changes
    };

    // If the modal is not open, render nothing
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                <h2 className="text-2xl text-black font-bold mb-4">Edit Recipe</h2>
                <form onSubmit={handleSubmit}>
                    {/* Recipe Name Input */}
                    <div className="mb-4">
                        <label className="block text-sm text-black font-semibold">Recipe Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded bg-white"
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div className="mb-4">
                        <label className="block text-sm text-black font-semibold">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded bg-white"
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
                                    className="w-full p-2 border border-gray-300 rounded bg-white"
                                    placeholder={`Ingredient ${index + 1}`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveIngredient(index)}
                                    className="ml-2 text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    ingredients: [...prevData.ingredients, ''],
                                }))
                            }
                            className="text-blue-500"
                        >
                            Add Ingredient
                        </button>
                    </div>

                    {/* Action Buttons: Cancel and Save Changes */}
                    <div className="flex justify-end">
                        <button type="button" onClick={closeModal}
                                className="mr-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRecipeModal;
