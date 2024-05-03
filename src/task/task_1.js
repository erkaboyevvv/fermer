function cakes(recipe, available) {
    // Initialize a variable to keep track of the maximum number of cakes
    let maxCakes = Infinity;
    
    // Loop through each ingredient in the recipe
    for (let ingredient in recipe) {
        // Check if the ingredient is available
        if (available.hasOwnProperty(ingredient)) {
            // Calculate the maximum number of cakes based on the available amount of this ingredient
            const maxCakesForIngredient = Math.floor(available[ingredient] / recipe[ingredient]);
            // Update the maximum number of cakes if this ingredient allows fewer cakes to be made
            if (maxCakesForIngredient < maxCakes) {
                maxCakes = maxCakesForIngredient;
            }
        } else {
            // If an ingredient is missing, set the maximum number of cakes to 0 and break the loop
            maxCakes = 0;
            break;
        }
    }
    
    // Return the maximum number of cakes Pete can bake
    return maxCakes;
}

// Test cases
console.log(cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200})); // Output: 2
console.log(cakes({apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100}, {sugar: 500, flour: 2000, milk: 2000})); // Output: 0


// ---------------------------------

// Pete likes to bake some cakes. He has some recipes and ingredients. Unfortunately he is not good in maths. Can you help him to find out, how many cakes he could bake considering his recipes?

// Write a function cakes(), which takes the recipe (object) and the available ingredients (also an object) and returns the maximum number of cakes Pete can bake (integer). For simplicity there are no units for the amounts (e.g. 1 lb of flour or 200 g of sugar are simply 1 or 200). Ingredients that are not present in the objects, can be considered as 0.

// Examples:

// // must return 2
// cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200}); 
// // must return 0
// cakes({apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100}, {sugar: 500, flour: 2000, milk: 2000}); 
// write js