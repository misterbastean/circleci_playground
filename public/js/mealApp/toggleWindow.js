$(document).ready(function() {
  // Load the correct recipes
  refreshTables();

  // ========================================
  // Toggle window when clicking on the window itself
  // ========================================

  $('#toggle-window').on('click', function() {
    $('#toggle-window').animate({
      width: 'toggle',
      height: 'toggle'
    });
  });

  // ========================================
  // Toggle window when clicking on the stub
  // ========================================

  $('#toggle-window-background').on('click', function() {
    $('#toggle-window').animate({
      width: 'toggle',
      height: 'toggle'
    });
  });

  // ========================================
  // Add recipe to localStorage from show page
  // ========================================

  $('#addRecipe').on('click', function() {
    let currentRecipes = [];
    // Check if there are already recipes in localStorage. If so, parse the string into JSON and set as currentRecipes
    if (localStorage.getItem("recipes") !== null) {
      currentRecipes = JSON.parse(localStorage.getItem('recipes'));
    }
    // Check if recipe is in currentRecipes array.
    alreadyPresent = false;
    for (let i = 0; i < currentRecipes.length; i++) {
      if (currentRecipes[i]._id == thisRecipe._id) {
        alreadyPresent = true;
        break;
      }
    }
    // If recipe is not alreadyPresent, add recipe to currentRecipes array
    if (!alreadyPresent) {
      currentRecipes.push(thisRecipe);

      // Show hiddenFlash div for feedback, then fade out
      $('#hiddenSuccess').fadeIn('fast').delay(2000).fadeOut('slow');
    } else {
      // Show hiddenFlash div
      $('#hiddenFailure').fadeIn('fast').delay(2000).fadeOut('slow');
    };

    // Save currentRecipes array to localStorage, stringifying the JSON
    localStorage.setItem('recipes', JSON.stringify(currentRecipes));



    // Update the toggleWindow tables
    refreshTables();
  });

  // ========================================
  // Add recipe to localStorage from index page
  // ========================================
  // // JSON not parsing, due to keys not having quotes. Need to figure it out.
  //
  //
  // $('.addCardRecipe').on('click', function() {
  //   let currentRecipes = [];
  //   const thisRecipeStr = $(this).attr('data-recipe').toString();
  //   console.log(thisRecipeStr);
  //   const thisRecipe = JSON.parse(thisRecipeStr);
  //   console.log(thisRecipe);
    // // Check if there are already recipes in localStorage. If so, parse the string into JSON and set as currentRecipes
    // if (localStorage.getItem("recipes") !== null) {
    //   currentRecipes = JSON.parse(localStorage.getItem('recipes'));
    // }
    // // Check if recipe is in currentRecipes array.
    // alreadyPresent = false;
    // for (let i = 0; i < currentRecipes.length; i++) {
    //   if (currentRecipes[i]._id == thisRecipe._id) {
    //     alreadyPresent = true;
    //     break;
    //   }
    // }
    // // If recipe is not alreadyPresent, add recipe to currentRecipes array
    // if (!alreadyPresent) {
    //   currentRecipes.push(thisRecipe);
    // };
    //
    // // Save currentRecipes array to localStorage, stringifying the JSON
    // localStorage.setItem('recipes', JSON.stringify(currentRecipes));
    //
    // // Update the toggleWindow tables
    // refreshTables();
  // });

  // ========================================
  // Remove a recipe from the list
  // ========================================

  $('#recipes-list').on('click', '.delete-recipe-from-toggle', function(e) {
    e.stopPropagation();
    const rawHtml = $(this).parent().html();
    const recipeToDelete = rawHtml.replace('<i class="fas fa-times delete-recipe-from-toggle"></i> ', '');


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

  // ========================================
  // Remove all recipes from the list
  // ========================================

  $('#remove-all').on('click', function(e) {
    e.stopPropagation();
    localStorage.clear();
    refreshTables();
  })

  // =============================================================
  // Function to refresh the tables, to be run after any updates
  // =============================================================

  function refreshTables() {
    // Delete all rows from the displayed Recipes and Ingredients tables
    $("#recipes-body").empty();
    $("#ingredients-body").empty();

    let currentRecipes = [];
    // let allIngredients = [];
    // let currentIngredients = [];
    // Check if there are already recipes in localStorage. If so, parse the string into JSON and set as currentRecipes
    if (localStorage.getItem("recipes") !== null) {
      currentRecipes = JSON.parse(localStorage.getItem('recipes'));
    }

    // Repopulate currentRecipes table with updated values
    currentRecipes.forEach((recipe) => {
      $('#recipes-body').append(`
        <tr class='recipe-tr'>
          <td class='recipe-td'><i class='fas fa-times delete-recipe-from-toggle'></i> ${recipe.recipeName}</td>
        </tr>
      `);
    });
  }
});

// Function for eliminating duplicates from array
function uniq(a) {
  return Array.from(new Set(a));
}
