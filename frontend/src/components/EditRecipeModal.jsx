import React, {useState, useEffect} from 'react';

const EditRecipeModal = ({isOpen, closeModal, recipe, updateRecipe}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        ingredients: [''],
    });

    useEffect(() => {
        if (recipe) {
            setFormData({
                name: recipe.name,
                description: recipe.description,
                ingredients: recipe.ingredients,
            });
        }
    }, [recipe]);

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

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            ingredients: updatedIngredients,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateRecipe(formData);
        closeModal();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold">Recipe Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold">Ingredients</label>
                        {formData.ingredients.map((ingredient, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={ingredient}
                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
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
