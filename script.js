const container = document.getElementById("mealsContainer");
const loading = document.getElementById("loading");

loading.style.display = "none";

async function searchMeal() {
  const query = document.getElementById("searchInput").value;

  if (!query) {
    alert("Please enter something!");
    return;
  }

  loading.style.display = "block";
  container.innerHTML = "";

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );

    const data = await response.json();

    loading.style.display = "none";

    if (!data.meals) {
      container.innerHTML = "<p>No meals found 😢</p>";
      return;
    }

    data.meals.forEach(meal => {
      const mealDiv = document.createElement("div");
      mealDiv.classList.add("meal");

      mealDiv.innerHTML = `
        <img src="${meal.strMealThumb}" class="meal-img" />
        <h3>${meal.strMeal}</h3>
        <p>🌍 ${meal.strArea}</p>
      `;


      const img = mealDiv.querySelector(".meal-img");

      img.addEventListener("click", () => {
        showRecipe(meal);
      });

      container.appendChild(mealDiv);
    });

  } catch (error) {
    loading.style.display = "none";
    container.innerHTML = "<p>Something went wrong 😵</p>";
  }
}


function showRecipe(meal) {
  let ingredients = "";

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}\n`;
    }
  }

  alert(
    `🍔 ${meal.strMeal}

🌍 ${meal.strArea}

🧂 Ingredients:
${ingredients}

📖 Recipe:
${meal.strInstructions}`
  );
}