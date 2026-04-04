import './style.css'
import {getCardio, getStats} from './js/get-stats.js'



const calorieCounter = document.getElementById("calorie-counter");
const mealsList = document.getElementById("meals-list");
const activityList = document.getElementById("activity-list")
const addButton = document.getElementById("add-meal");
const addActivityButton = document.getElementById("add-activity");
const resetButton = document.getElementById("reset-button");

const totalCalsText = document.getElementById("total-cals");
const eatenCalsText = document.getElementById("eaten-cals");
const burnedCalsText = document.getElementById("burned-cals");

addButton.addEventListener("click", (event) => addItem(event));
addActivityButton.addEventListener("click", (event) => addActivity(event));

mealsList.addEventListener("click", (event) => getButton(event));
activityList.addEventListener("click", (event) => getButton(event));

resetButton.addEventListener("click", () => resetItems());

const storedData = JSON.parse(localStorage.getItem('mySavedMeals'));
const storedActivity = JSON.parse(localStorage.getItem('mySavedActivity'));

let consumed = {
  kcal: 0,
  carbs: 0,
  fats: 0,
  protein: 0
}

let burned = {
  kcal: 0
}

let mealsArray = [];
let activityArray = [];

function collectStats(){
  const stats = getStats();
  if(stats === null){
    alert("Fill out the stats!!!");
    return
  }
  mealsArray.push(stats);

}

function collectCardioStats(){
    const activity = getCardio();
  if(activity === null){
    alert("Fill out the stats!!!");
    return
  }
  activityArray.push(activity);
}

function displayCalories(){
  mealsList.innerHTML = "";
  activityList.innerHTML = "";
  consumed = {kcal: 0,carbs: 0,fats: 0,protein: 0}
  burned = {kcal: 0}
  
  for( let i = 0; i < mealsArray.length; i++){
    const type = mealsArray[i].type;
    const name = mealsArray[i].name;
    const kcal = mealsArray[i].kcal;
    addToConsumed(mealsArray[i]);
    

    mealsList.insertAdjacentHTML('beforeend', `<li>${type} : ${name} [${kcal} kcal] <button class="delete-meal X" data-row="${i}">✖</button></li>`);
    
  }

  for( let i = 0; i < activityArray.length; i++){
    const name = activityArray[i].name;
    const kcal = activityArray[i].kcal;
    addToBurned(activityArray[i]);
    activityList.insertAdjacentHTML('beforeend',`<li>${name} [${kcal} kcal] <button class="delete-activity X" data-row="${i}">✖</button></li>`) ;
  }

  eatenCalsText.innerText = consumed.kcal;
  burnedCalsText.innerText = burned.kcal;
  totalCalsText.innerText = consumed.kcal - burned.kcal;
  calorieCounter.innerHTML = `
  <span class="badge">Protein:&nbsp${consumed.protein}g</span>
  <span class="badge">Carbs:&nbsp${consumed.carbs}g</span>
  <span class="badge">Fat:&nbsp${consumed.fats}g</span>`;
}


function deleteItem(row, array){
  loadData();
  if(array[row]){
    array.splice(row, 1);
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

function addActivity(){
  loadData();
  collectCardioStats();
  displayCalories();
  saveData();
}

function getButton(event){
  if(event.target.classList.contains("delete-meal")){
    deleteItem(event.target.dataset.row, mealsArray);
  }
  if(event.target.classList.contains("delete-activity")){
    deleteItem(event.target.dataset.row, activityArray);
  }
}

function loadData(){
  if(storedData){
  mealsArray = storedData;
  
  }
  if(storedActivity){
    activityArray = storedActivity;
  }
  console.log("no data to load");
  
}

function saveData(){
  if(mealsArray){
    localStorage.setItem('mySavedMeals', JSON.stringify(mealsArray));
  }
  if(activityArray){
    localStorage.setItem('mySavedActivity', JSON.stringify(activityArray));
  }
}

function resetItems(){
  mealsArray.length = 0;
  activityArray.length = 0;
  saveData();  
  displayCalories();

}

function addToConsumed(dict){
  Object.entries(dict).forEach(([key, value]) =>{
    if (typeof value === "number" && key in consumed){
      consumed[key] += dict[key];
    }
  })
}

function addToBurned(dict){
  burned.kcal += dict.kcal;
}

loadData();
displayCalories();









