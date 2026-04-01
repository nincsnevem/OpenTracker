
const mealType = document.querySelector("#meal-type");
const mealName = document.getElementById("meal-name");
const mealCalories = document.getElementById("meal-calories");
const calorieCounter = document.getElementById("calorie-counter");






export function getStats(){
    const type = mealType.value;
    const name = mealName.value;
    const calories = parseInt(mealCalories.value);
    const now = new Date();

    if(type && name && calories){
        return [now,type, name, calories];
    }
    return null;
}



