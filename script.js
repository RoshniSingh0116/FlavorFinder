// function searchRecipes(){
//   const searchInput = document.getElementById("searchInput").value
//   const recipesDiv = document.getElementById("recipes")
//   const notFoundDiv = document.getElementById("notFound")

//   recipesDiv.innerHTML =" ";
//   notFoundDiv.style.display = "none";

//   if(searchInput.trim()===""){
//     notFoundDiv.innerHTML = "Please Enter a recipe name"
//     notFoundDiv.style.display = "block"
//   return  }
//  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
//     .then(response=>response.json())
//     .then(data=>{
//       if(!data.meals){
//         notFoundDiv.innerHTML = "Recipe Not Found"
//         notFoundDiv.style.display = "block"
//       }
//       else{
//         data.meals.forEach(meal=>{
//           const card = document.createElement("div")
//           card.classList.add("recipe-card")
//           card.innerHTML = `
//           <img src = "${meal.strMealThumb}" alt = "${meal.strMeal}">
//           <h3>${meal.strMeal}</h3>
//           <button onclick="viewRecipe('${meal.idMeal}')">View Recipe</button>
//           `;
//           recipesDiv.appendChild(card)
//         })
//       }
//     })

// }

function searchRecipes(){
  const searchInput = document.getElementById("searchInput").value
  const recipesDiv = document.getElementById("recipes")
  const notFoundDiv = document.getElementById("notFound")

  recipesDiv.innerHTML = "";
  notFoundDiv.style.display = "none";

  if(searchInput.trim() === ""){
    notFoundDiv.innerHTML = "Please Enter a recipe name"
    notFoundDiv.style.display = "block"
    return
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(response => response.json())
    .then(data=>{
      if(!data.meals){
        notFoundDiv.innerHTML = "Recipe Not Found"
        notFoundDiv.style.display = "block"
      }
      else{
        data.meals.forEach(meal=>{
          const card = document.createElement("div")
          card.classList.add("recipe-card")

          card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
          <div class="card-btns">
          <button onclick="viewRecipe('${meal.idMeal}')">View</button>
          <button onclick="toggleFav('${meal.idMeal}',this)">🤍</button>
          </div>
          `;

          recipesDiv.appendChild(card)
        })
      }
    })
}

function viewRecipe(mealId){
  const popupCard = document.getElementById("popupCard")
  const recipeTitle = document.getElementById("recipeTitle")
  const recipeDetails = document.getElementById("recipeDetails")

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data=>{
      const meal = data.meals[0]
      recipeTitle.innerText = meal.strMeal
      recipeDetails.innerText = meal.strInstructions
      popupCard.style.display = "block"
    })
}

function closeRecipe(){
  document.getElementById("popupCard").style.display = "none"
}

function toggleTheme(){
  document.body.classList.toggle("dark")

  const btn = document.getElementById("themeToggle")

  if(document.body.classList.contains("dark")){
    btn.innerText = "☀️ Light"
  }else{
    btn.innerText = "🌙 Dark"
  }
}

function searchCategory(category){
  document.getElementById("searchInput").value = category
  searchRecipes()
}
function toggleFav(id){

let favs = JSON.parse(localStorage.getItem("favs")) || []

if(favs.includes(id)){
favs = favs.filter(f => f !== id)
}else{
favs.push(id)
}

localStorage.setItem("favs", JSON.stringify(favs))

}
function toggleFav(id,btn){

let favs = JSON.parse(localStorage.getItem("favs")) || []

if(favs.includes(id)){
favs = favs.filter(f => f !== id)
btn.innerHTML="🤍"
}else{
favs.push(id)
btn.innerHTML="❤️"
}

localStorage.setItem("favs", JSON.stringify(favs))
}