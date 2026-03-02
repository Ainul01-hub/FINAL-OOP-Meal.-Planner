async function searchMeal() {
    const mealName = document.getElementById("searchInput").value;

    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    const data = await response.json();

    if (!data.meals) {
        document.getElementById("mealResult").innerHTML = "Meal not found!";
        return;
    }
    let output = "";

    data.meals.forEach(meal => {
    output += `
        <div class="meal-card">
            <h3>${meal.strMeal}</h3>

            <img src="${meal.strMealThumb}" 
                 style="cursor:pointer;">

            <p><b>Category:</b> ${meal.strCategory}</p>
            <p><b>Area:</b> ${meal.strArea}</p>

            <div class="instructions-box">
                <p><b>Instructions:</b></p>
                <p>${meal.strInstructions}</p>
            </div>

            <button class="btn-add"
                onclick="addToPlanner('${meal.strMeal}','${meal.strCategory}')">
                Add to Planner
            </button>
        </div>
    `;
});

document.getElementById("mealResult").innerHTML = output;
}
function addToPlanner(name, category) {

    let meals = JSON.parse(localStorage.getItem("meals")) || [];

    let calories = 400; 

    if (category === "Chicken") calories = 450;
    else if (category === "Beef") calories = 500;
    else if (category === "Vegetarian") calories = 350;
    else if (category === "Seafood") calories = 420;

    meals.push({
        name: name,
        category: category,
        calories: calories,
        note: ""
    });

    localStorage.setItem("meals", JSON.stringify(meals));

    alert("Meal successfully added to planner!");
}
