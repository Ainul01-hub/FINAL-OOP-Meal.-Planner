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

    const meal = data.meals[0];

    document.getElementById("mealResult").innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" width="200">
        <p><b>Category:</b> ${meal.strCategory}</p>
        <p><b>Area:</b> ${meal.strArea}</p>
        <p><b>Instructions:</b> ${meal.strInstructions}</p>
        <button onclick="addToPlanner('${meal.strMeal}', '${meal.strCategory}')">
            Add to Planner
        </button>
    `;
}

function addToPlanner(name, category) {
    let meals = JSON.parse(localStorage.getItem("meals")) || [];

    meals.push({
        name: name,
        category: category,
        note: ""
    });

    localStorage.setItem("meals", JSON.stringify(meals));

    alert("Meal Added Successfully!");
}
