export const fetchRecipes = async () => {
    const response = await fetch('http://localhost:5000/api/recipes');
    if (!response.ok) {
        throw new Error('Failed to fetch recipes');
    }
    return response.json();
};

export const addNewRecipe = async (newRecipe) => {
    const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
    });
    if (!response.ok) {
        throw new Error('Failed to add new recipe');
    }
    return response.json();
};

export const updateRecipe = async (id, updatedRecipe) => {
    const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe),
    });

    if (!response.ok) {
        throw new Error('Failed to update the recipe');
    }
    return response.json();
};

export const deleteRecipe = async (id) => {
    const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete recipe');
    }

    return response.json();
};
