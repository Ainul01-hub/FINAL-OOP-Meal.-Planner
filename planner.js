function loadMeals() {
    let meals = JSON.parse(localStorage.getItem("meals")) || [];
    let output = "";

    meals.forEach((meal, index) => {
        output += `
    <div style="margin-bottom:20px;">
        <p><b>${meal.name}</b> (${meal.category})</p>
        <p><b>Calories:</b> ${meal.calories} kcal</p>

        ${meal.note ? `<p><b>Note:</b> ${meal.note}</p>` : ""}

        <div id="editSection${index}">
            <button onclick="showEdit(${index})">Edit</button>
            <button class="btn-delete" onclick="deleteMeal(${index})">Delete</button>
        </div>

        <div id="inputSection${index}" style="display:none; margin-top:10px;">
            <input type="text"
                   id="noteInput${index}"
                   placeholder="Enter note"
                   value="${meal.note ? meal.note : ""}">
            <button onclick="saveNote(${index})">Save</button>
        </div>
    </div>
`;
    });

    document.getElementById("savedMeals").innerHTML = output;

    document.getElementById("totalMeals").innerText = meals.length;

    let vegetarianCount = meals.filter(meal => meal.category === "Vegetarian").length;
    document.getElementById("vegCount").innerText = vegetarianCount;

    let estimatedCalories = meals.reduce((total, meal) => total + meal.calories, 0);
    document.getElementById("calories").innerText = estimatedCalories;
    }
function showEdit(index) {
    document.getElementById("editSection" + index).style.display = "none";
    document.getElementById("inputSection" + index).style.display = "block";
}
function saveNote(index) {
    let meals = JSON.parse(localStorage.getItem("meals")) || [];
    let noteValue = document.getElementById("noteInput" + index).value;
    meals[index].note = noteValue;
    localStorage.setItem("meals", JSON.stringify(meals));

    loadMeals();
}
function deleteMeal(index) {
    let meals = JSON.parse(localStorage.getItem("meals")) || [];
    meals.splice(index, 1);
    localStorage.setItem("meals", JSON.stringify(meals));
    loadMeals();
}
loadMeals();
