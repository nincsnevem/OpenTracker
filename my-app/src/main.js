import './style.css'
import {getStats} from './js/get-stats.js'



const calorieCounter = document.getElementById("calorie-counter");
const mealsList = document.getElementById("meals-list");
const addButton = document.getElementById("add-meal");
const resetButton = document.getElementById("reset-button");

addButton.addEventListener("click", (event) => addItem(event));

mealsList.addEventListener("click", (event) => getButton(event));

resetButton.addEventListener("click", () => resetItems());

const storedData = JSON.parse(localStorage.getItem('mySavedMeals'));

let caloriesVar = 0;

let mealsArray = []

function sumCalories(){
  const stats = getStats();
  
  if(stats == null){
    alert("Fill out the stats!!!");
    return
  }
  

  mealsArray.push(stats);
  
}

function displayCalories(){
  
  
  mealsList.innerHTML = "";
  caloriesVar = 0;
  for( let i = 0; i < mealsArray.length; i++){
    const type = mealsArray[i][1].charAt(0).toUpperCase() + mealsArray[i][1].slice(1);
    const name = mealsArray[i][2];
    const kcal = mealsArray[i][3];
    caloriesVar += mealsArray[i][3];
    mealsList.insertAdjacentHTML('beforeend', `<li>${type} : ${name} [${kcal} kcal] <button class="delete-meal" data-row="${i}">✖</button></li>`);  
  }
  calorieCounter.textContent = `Calories consumed today: ${caloriesVar} kcal`;

}
function deleteItem(row){
  loadData();

  console.log("delete");
  if(mealsArray[row]){
    mealsArray.splice(row, 1);
  }
  displayCalories();

  saveData();
}

function addItem(){
  loadData();
  sumCalories();
  displayCalories();
  saveData();
}

function getButton(event){
  if(event.target.classList.contains("delete-meal")){
    deleteItem(event.target.dataset.row);
  }
}

function loadData(){
  if(storedData){
  mealsArray = storedData;
  return
  }
  console.log("no data to load");
  
}

function saveData(){
  if(mealsArray){
    localStorage.setItem('mySavedMeals', JSON.stringify(mealsArray));
  }
}

function resetItems(){
  mealsArray.length = 0;
  localStorage.setItem('mySavedMeals', JSON.stringify(mealsArray));   
  displayCalories();

}

loadData();
displayCalories();









