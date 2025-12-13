// Quick test to verify costco-kitchen plugin works with lunch category
const { costcoKitchenPlugin } = require('./config/plugins/costco-kitchen.plugin.ts');

console.log('Testing costco-kitchen plugin...');
console.log('Plugin tenant ID:', costcoKitchenPlugin.tenantId);
console.log('Available categories:', Object.keys(costcoKitchenPlugin.categoryConfig));

// Check if lunch category exists
const lunchConfig = costcoKitchenPlugin.categoryConfig.lunch;
console.log('Lunch category config:', lunchConfig);

// Check if lunch meals exist
const lunchMeals = costcoKitchenPlugin.mealLibrary.filter(meal => meal.category === 'lunch');
console.log('Number of lunch meals:', lunchMeals.length);
console.log('Lunch meals:', lunchMeals.map(meal => meal.name));

// Check if side category exists
const sideConfig = costcoKitchenPlugin.categoryConfig.side;
console.log('Side category config:', sideConfig);

// Check if side meals exist
const sideMeals = costcoKitchenPlugin.mealLibrary.filter(meal => meal.category === 'side');
console.log('Number of side meals:', sideMeals.length);