$(document).ready(function() {

  refreshTables();

  // =========================================
  // Makes recipe table rows clickable
  // =========================================
  $("#recipes-tbody").on('click', '.clickable-row', function() {
    window.location.href = $(this).data("href");
  });

  // =========================================
  // Delete recipe when clicked
  // =========================================
  $('#recipes-tbody').on('click', '.delete-recipe-td', function(e) {
    e.stopPropagation();
    let recipeToDelete = $(this).next().html();

    // Set currentRecipes equal to the recipes already in localStorage.recipes
    const currentRecipes = JSON.parse(localStorage.getItem('recipes'));

    // Find recipe in array by name and create new array of all other recipes.
    const updatedRecipes = $.grep(currentRecipes, function(e) {
      return e.recipeName != recipeToDelete;
    });

    // Save updated recipe list to localStorage
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    // Refresh table on screen
    refreshTables();
  });

  // =========================================
  // Delete all recipes from localStorage
  // =========================================

  $('#cart-remove-all').on('click', function(e) {
    localStorage.removeItem('recipes');
    refreshTables();
  })

  // Test Button
  $('#test-button').on('click', function() {
    refreshTables();
  });
});

// =========================================
// Refresh Tables - run after changing data
// =========================================
function refreshTables() {
  // Empty tables
  $('#recipes-tbody').empty();
  $('#ingredients-tbody').empty();

  let currentRecipes = [];
  let currentIngredients = [];
  let allIngredients = [];

  // Check if localStorage already has recipes in it. If so, update currentRecipes
  if (localStorage.getItem("recipes") !== null) {
    currentRecipes = JSON.parse(localStorage.getItem('recipes'));
  }

  // Repopulate Recipes table with currentRecipes data
  currentRecipes.forEach((recipe) => {
    $('#recipes-tbody').append(`
      <tr class='recipe-tr clickable-row' data-href='/mealapp/recipes/${recipe._id}'>
        <td class='delete-recipe-td'><i class='fas fa-times delete-recipe-from-toggle'></i> </td>
        <td class='recipe-td'>${recipe.recipeName}</td>
      </tr>
    `);
  });

  // Loop through currentRecipes, getting names of ingredients
  currentRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      allIngredients.push(ingredient.ingredientName)
    })
  });

  // Remove duplicates from allIngredients
  allIngredients = uniq(allIngredients);

  // Push each unique ingredient into currentIngredients (as an object, with quantity of 0).
  // This will create an array of all unique ingredient names and quantities of 0
  allIngredients.forEach((ingredient) => {
    currentIngredients.push({
      ingredientName: ingredient,
      ingredientQuantity: 0
    });
  });

  // Loop through currentRecipes again
  currentRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((recipeIngredient) => {
      // Find the currentRecipe.ingredient in the allIngredients array and increment its quantity
      currentIngredients.forEach((currentIngredient) => {
        if (recipeIngredient.ingredientName == currentIngredient.ingredientName)
          currentIngredient.ingredientQuantity += recipeIngredient.ingredientQuantity
      });
    });
  });

  // Loop through currentIngredients, creating table row for each ingredient
  currentIngredients.forEach((ingredient) => {
    $('#ingredients-tbody').append(`
      <tr class='ingredient-tr'>
        <td class='ingredient-td'>${ingredient.ingredientName}</td>
        <td class='ingredient-td'>${ingredient.ingredientQuantity}</td>
      </tr>
    `);
  });
}

// ===============================================
// Function for eliminating duplicates from array
//================================================
function uniq(a) {
  return Array.from(new Set(a));
}
