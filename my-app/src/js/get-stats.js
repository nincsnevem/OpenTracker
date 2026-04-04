
const mealType = document.querySelector("#meal-type");
const mealName = document.getElementById("meal-name");
const mealCalories = document.getElementById("meal-calories");
const mealProtein = document.getElementById("meal-protein");
const mealCarbs = document.getElementById("meal-carbs");
const mealFats = document.getElementById("meal-fats");

const cardioName = document.getElementById("activity-name");
const cardioCalories = document.getElementById("activity-calories");






export function getStats(){
    const now = new Date();
    const stats = {
        time: now,
        type: mealType.value.charAt(0).toUpperCase() +  mealType.value.slice(1),
        name: mealName.value,
        kcal: parseInt(mealCalories.value),
        protein: parseInt(mealProtein.value),
        carbs : parseInt(mealCarbs.value),
        fats : parseInt(mealFats.value)
    }
    let isNull = false;
    Object.values(stats).forEach((val) => {
        if(val === "" || Number.isNaN(val)){
            isNull = true;
        }
    });
    if(isNull){
        return null;
    }
    
    return stats;
}

export function getCardio(){
    const now = new Date();
    const stats = {
        time: now,
        name: cardioName.value,
        kcal: parseInt(cardioCalories.value),
    }
    let isNull = false;
    Object.values(stats).forEach((val) => {
        if(val === "" || Number.isNaN(val)){
            isNull = true;
        }
    });
    if(isNull){
        return null;
    }
    
    
    return stats;
}



