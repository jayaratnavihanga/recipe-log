import React, {useState} from 'react';

const AddRecipeModal = ({isOpen, closeModal, addRecipe}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        ingredients: [''],
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients[index] = value;
        setFormData((prevData) => ({
            ...prevData,
            ingredients: updatedIngredients,
        }));
    };

    const handleAddIngredient = () => {
        setFormData((prevData) => ({
            ...prevData,
            ingredients: [...prevData.ingredients, ''],
        }));
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            ingredients: updatedIngredients,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRecipe = {
            name: formData.name,
            ingredients: formData.ingredients.filter(ingredient => ingredient.trim() !== ''), // Remove empty ingredients
            description: formData.description,
        };
        await addRecipe(newRecipe);

        setFormData({
            name: '',
            description: '',
            ingredients: [''],
        });

        closeModal();
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-semibold">Recipe Name</label>
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
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-semibold">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold">Ingredients</label>
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
                            onClick={handleAddIngredient}
                            className="text-blue-500"
                        >
                            Add Ingredient
                        </button>
                    </div>

                    <div className="flex justify-between">
                        <button type="submit"
                                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                            Add Recipe
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRecipeModal;
