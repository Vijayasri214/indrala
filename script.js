const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');

// Function to fetch recipes from the API based on the search query
const fetchRecipesFromAPI = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";

    try {
        // Fetch recipes from TheMealDB API
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        recipeContainer.innerHTML = ""; // Clear the "Fetching" message

        // Check if any meals are found and display them
        if (data.meals) {
            data.meals.forEach(meal => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');
                recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <p><span>${meal.strArea || 'N/A'}</span> Dish</p>
                    <p><span>${meal.strCategory || 'N/A'}</span> Category</p>
                `;
                recipeContainer.appendChild(recipeDiv);
            });
        } else {
            recipeContainer.innerHTML = "<p>No recipes found. Try searching for something else.</p>";
        }

    } catch (error) {
        recipeContainer.innerHTML = "<p>Error fetching recipes from API. Please try again later.</p>";
        console.error("Error fetching recipes from API:", error);
    }
}

// Function to fetch recipes from local recipe.txt file
const fetchRecipesFromFile = async () => {
    recipeContainer.innerHTML = "<h2>Loading Local Recipes...</h2>";

    try {
        // Fetch local JSON data from recipe.txt
        const response = await fetch('C:/Users/vijay/OneDrive/Documents/JavaScript/recipe.txt');
        const text = await response.text();
        const data = JSON.parse(text);

        recipeContainer.innerHTML = ""; // Clear the "Loading" message

        // Display the local recipes if available
        data.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <h3>${meal.name}</h3>
                <p>Calories: ${meal.calories}</p>
            `;
            recipeContainer.appendChild(recipeDiv);
        });

    } catch (error) {
        recipeContainer.innerHTML = "<p>Error loading recipes from file. Please check the file path and format.</p>";
        console.error("Error fetching recipes from file:", error);
    }
}

// Event listener for the search button
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const query = searchBox.value.trim(); // Get the user's search input
    
    // If query is empty, show a message, otherwise fetch recipes from the API
    if (query) {
        fetchRecipesFromAPI(query);
    } else {
        fetchRecipesFromFile(); // Load local recipes if no search term is provided
    }
});
