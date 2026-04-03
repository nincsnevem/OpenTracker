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

let consumed = {
  kcal: 0,
  carbs: 0,
  fats: 0,
  protein: 0
}

let mealsArray = []

function collectStats(){
  const stats = getStats();
  if(stats === null){
    alert("Fill out the stats!!!");
    return
  }
  mealsArray.push(stats);
}

function displayCalories(){
  mealsList.innerHTML = "";
  consumed = {kcal: 0,carbs: 0,fats: 0,protein: 0}
  for( let i = 0; i < mealsArray.length; i++){
    const type = mealsArray[i].type;
    const name = mealsArray[i].name;
    const kcal = mealsArray[i].kcal;
    addToConsumed(mealsArray[i]);

    mealsList.insertAdjacentHTML('beforeend', `<li>${type} : ${name} [${kcal} kcal] <button class="delete-meal" data-row="${i}">✖</button></li>`);  
  }
  calorieCounter.innerHTML = `
  <span class="badge">Energy:&nbsp${consumed.kcal}kcal</span>  
  <span class="badge">Protein:&nbsp${consumed.protein}g</span>
  <span class="badge">Carbs:&nbsp${consumed.carbs}g</span>
  <span class="badge">Fat:&nbsp${consumed.fats}g</span>`;
}
function deleteItem(row){
  loadData();
  if(mealsArray[row]){
    mealsArray.splice(row, 1);
  }
  displayCalories();
  saveData();
}

function addItem(){
  loadData();
  collectStats();
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

function addToConsumed(dict){
  Object.entries(dict).forEach(([key, value]) =>{
    if (typeof value === "number" && key in consumed){
      consumed[key] += dict[key];
    }
  })
}

loadData();
displayCalories();









