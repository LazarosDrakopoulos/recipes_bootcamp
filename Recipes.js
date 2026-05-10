async function searchRecipes(query) {
    const apiKey = '823e560fc7d1417ebd194655f94d7e01';
    const apiUrl = `https://api.spoonacular.com/recipes/search?query=${query}&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results.length > 0) {
          const recipeId = data.results[0].id;
          const recipeDetailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

          const detailsResponse = await fetch(recipeDetailsUrl);
          const recipeDetails = await detailsResponse.json();

          displayRecipe(recipeDetails);
        } else {
            console.error('No recipes found for the given query.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayRecipe(recipe) {
    const recipeCardBody = document.querySelector('.card-body');
    const ingredientList = document.querySelector('.ingredient-list');
    const instructionsElement = document.querySelector('.instructions');

    ingredientList.innerHTML = '';

    recipe.extendedIngredients.forEach(ingredient => {
      const ingredientElement = document.createElement('li');
      ingredientElement.textContent = ingredient.original;
      ingredientElement.classList.add('ingredient');
      ingredientList.appendChild(ingredientElement);
    });

    const instructions = recipe.instructions;
  
    if (instructions) {
      const sentences = instructions.split('. ');
      let currentInstruction = '';

        sentences.forEach((sentence, index) => {
          currentInstruction += sentence + '. ';

            if ((index + 1) % 5 === 0 || index === sentences.length - 1) {
              const instructionElement = document.createElement('li');
              instructionElement.textContent = currentInstruction.trim();
              instructionsElement.appendChild(instructionElement);

              currentInstruction = '';
            }
        });
    }
}
