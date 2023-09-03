// document.addEventListener("DOMContentLoaded", function () {
//     var ingredients = ["Avocado", "Whole wheat bread", "Arugula", "Peanut butter", "Cauliflower", "Egg", "Carrot", "Onion", "Bell pepper", "Spinach", "Chicken", "Corn"];

//     var ingredientList = document.getElementById("ingredientList");

//     ingredients.forEach(function (ingredient) {
//         var checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.id = ingredient;

//         var label = document.createElement("label");
//         label.setAttribute("for", ingredient);
//         label.textContent = ingredient;

//         ingredientList.appendChild(checkbox);
//         ingredientList.appendChild(label);
//         ingredientList.appendChild(document.createElement("br"));
//     });

//     var submitButton = document.createElement("button");
//     submitButton.textContent = "Submit";
//     ingredientList.appendChild(submitButton);

//     submitButton.addEventListener("click", function () {
//         var checkedIngredients = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(function (checkbox) {
//             return checkbox.id;
//         });

//         localStorage.setItem("checkedIngredients", JSON.stringify(checkedIngredients));
//         window.location.href = "/recipes/recipes.html";
//     });
// }); 

document.addEventListener("DOMContentLoaded", function () {
    function fetchIngredientsFromFile(file, columnId) {
      fetch(file)
        .then(response => response.text())
        .then(data => {
          var ingredients = data.split("\n").filter(line => line.trim() !== "");
          var column = document.getElementById(columnId);
          ingredients.forEach(function (ingredient) {
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = ingredient;

            var label = document.createElement("label");
            label.setAttribute("for", ingredient);
            label.textContent = ingredient;

            column.appendChild(checkbox);
            column.appendChild(label);
            column.appendChild(document.createElement("br"));
          });
        })
        .catch(error => {
          console.error("Error fetching ingredients:", error);
        });
    }

    fetchIngredientsFromFile("pantry.txt", "pantryList");
    fetchIngredientsFromFile("freezer.txt", "freezerList");
    fetchIngredientsFromFile("fridge.txt", "fridgeList");

    function addCheckAllButton(buttonId, columnId) {
      var checkAllButton = document.createElement("button");
      checkAllButton.textContent = "Check all";
      checkAllButton.addEventListener("click", function () {
        var checkboxes = document.querySelectorAll(`#${columnId} input[type="checkbox"]`);
        checkboxes.forEach(function (checkbox) {
          checkbox.checked = true;
        });
      });
      document.getElementById(buttonId).appendChild(checkAllButton);
    }

    addCheckAllButton("checkAllPantry", "pantryList");
    addCheckAllButton("checkAllFreezer", "freezerList");
    addCheckAllButton("checkAllFridge", "fridgeList");

    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    document.querySelector(".center").appendChild(submitButton);

    submitButton.addEventListener("click", function () {
      var checkedIngredients = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(function (checkbox) {
        return checkbox.id;
      });

      localStorage.setItem("checkedIngredients", JSON.stringify(checkedIngredients));
      window.location.href = "/recipes/recipes.html";
    });
  });