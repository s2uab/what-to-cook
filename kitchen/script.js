function showPantryItems() {
    fetch('pantry-items.txt')
        .then(response => response.text())
        .then(data => {
            var pantryItems = data.split("\n");
            var message = "Pantry Food Items:\n" + pantryItems.join("\n");
            alert(message);
        })
        .catch(error => console.log(error));
}

function showFridgeItems() {
    fetch('fridge-items.txt')
        .then(response => response.text())
        .then(data => {
            var fridgeItems = data.split("\n");
            var message = "Fridge Food Items:\n" + fridgeItems.join("\n");
            alert(message);
        })
        .catch(error => console.log(error));
}

function showFreezerItems() {
    fetch('freezer-items.txt')
        .then(response => response.text())
        .then(data => {
            var freezerItems = data.split("\n");
            var message = "Freezer Food Items:\n" + freezerItems.join("\n");
            alert(message);
        })
        .catch(error => console.log(error));
}

