document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the checked ingredients from local storage
    var checkedIngredientsString = localStorage.getItem("checkedIngredients");
    if (checkedIngredientsString) {
        // Parse the checked ingredients into an array
        var checkedIngredients = JSON.parse(checkedIngredientsString);

        // Get the recipe list element
        var recipeList = document.getElementById("recipeList");

        // Create a paragraph to display the checked ingredients
        var ingredientsParagraph = document.createElement("p");
        ingredientsParagraph.textContent = "Checked Ingredients: " + checkedIngredients.join(", ");
        recipeList.appendChild(ingredientsParagraph);

        // Fetch the content of the recipes file
        fetch('recipes.txt')
            .then(response => response.text())
            .then(data => {
                // Split the data into an array of recipe lines
                var recipesData = data.split(/\r?\n/);

                // Filter recipes based on checked ingredients
                var matchingRecipes = recipesData.filter(function (recipe) {
                    var recipeParts = recipe.split(":").map(item => item.trim());
                
                    var recipeName = recipeParts[0];
                    var recipeIngredients = recipeParts[1];
                
                    var recipeIngredientsArray = recipeIngredients.split(",").map(function (ingredient) {
                        return ingredient.trim();
                    });
                
                    return recipeIngredientsArray.every(function (ingredient) {
                        return checkedIngredients.includes(ingredient);
                    });
                });

                // Display matching recipes or "No Recipes Available" message
                if (matchingRecipes.length > 0) {
                    matchingRecipes.forEach(function (recipe) {
                        // Split the recipe into name and ingredients
                        var recipeParts = recipe.split(":").map(item => item.trim());

                        var recipeName = recipeParts[0];
                        // Create a paragraph for each matching recipe
                        var recipeItem = document.createElement("p");
                        recipeItem.textContent = recipeName;
                        recipeList.appendChild(recipeItem);
                    });
                } else {
                    // Create a paragraph for the "No Recipes Available" message
                    var noRecipesMessage = document.createElement("p");
                    noRecipesMessage.textContent = "No Recipes Available";
                    recipeList.appendChild(noRecipesMessage);
                }
            })
            .catch(error => console.log(error));

        // Remove the checked ingredients from local storage
        localStorage.removeItem("checkedIngredients");
    } else {
        // Create a paragraph for the "No Recipes Available" message
        var noRecipesMessage = document.createElement("p");
        noRecipesMessage.textContent = "No Recipes Available";
        recipeList.appendChild(noRecipesMessage);
    }
});



//
// document.addEventListener("DOMContentLoaded", function () {
//     var checkedIngredientsString = localStorage.getItem("checkedIngredients");
//     if (checkedIngredientsString) {
//         var checkedIngredients = JSON.parse(checkedIngredientsString);

//         Papa.parse('recipes.html', {
//             download: true,
//             header: true,
//             complete: function (results) {
//                 var recipesData = results.data;

//                 var recipeList = document.getElementById("recipeList");

//                 recipesData.forEach(function (recipe) {
//                     var recipeName = recipe["Recipe Name"]; // Updated column name
//                     var recipeIngredients = recipe["Ingredients"]; // Updated column name

//                     var recipeIngredientsArray = recipeIngredients.split(",").map(function (ingredient) {
//                         return ingredient.trim();
//                     });

//                     var canMakeRecipe = checkedIngredients.every(function (ingredient) {
//                         return recipeIngredientsArray.includes(ingredient);
//                     });

//                     if (canMakeRecipe) {
//                         var recipeItem = document.createElement("p");
//                         recipeItem.textContent = recipeName;
//                         recipeList.appendChild(recipeItem);
//                     }
//                 });
//             }
//         });

//         localStorage.removeItem("checkedIngredients");
//     }  
// });
