//fetch
let searchMeal = document.getElementById("searchMeal");
let btnSearch = document.getElementById("btnSearch");
let modelData = document.getElementById("modelData");
let loading = document.getElementById("loading");

btnSearch.addEventListener("click", function () {
  getReceipes(searchMeal.value);
});

async function getReceipes(meal) {
  loading.classList.remove("d-none");
  let response = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${meal}`
  );
  console.log(response);
  if (response.ok) {
    let data = await response.json();

    console.log(data.recipes);
    displayData(data.recipes);
    loading.classList.add("d-none");
  }
}

getReceipes("pasta");

function displayData(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="col-md-3">
            <img src=${arr[i].image_url} class="w-100 h-75" alt=${
      arr[i].title
    } />
            <div class="cap text-center">
              <h3>${arr[i].title.split(" ", 3).join(" ")}</h3>
              <button onclick="showClick('${
                arr[i].recipe_id
              }')" class="btn btn-danger w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" >Details</button>
            </div>
          </div>
    `;
  }
  document.getElementById("rowData").innerHTML = cartona;
}

async function showClick(id) {
  loading.classList.remove("d-none");
  let response = await fetch(
    `https://forkify-api.herokuapp.com/api/get?rId=${id}`
  );
  if (response.ok) {
    let data = await response.json();
    console.log(data.recipe);
    let ingredients = data.recipe.ingredients;
    let list = "";
    for (let i = 0; i < ingredients.length; i++) {
      list += `<li>${ingredients[i]}</li>`;
    }

    modelData.innerHTML = `
    <img src=${data.recipe.image_url} class="w-100" alt="" />
            <h3>${data.recipe.title}</h3>
            <h5 class="mt-3">Ingredients:</h5>
      <ul class="list-group">
        ${list}
      </ul>
    `;
    document.getElementById("exampleModalLabel").innerHTML = `
    ${data.recipe.title.split(" ", 3).join(" ")}
    `;
    loading.classList.add("d-none");
  }
}

try {
  console.log(w);
} catch (error) {
  console.log(error);
}
