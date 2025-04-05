/**
 * Simple rule-based classifier for expenses
 * Classifies expenses as either "need" or "want" based on category
 */
const classifyExpense = (category) => {
  // Define categories that are considered needs
  const needCategories = [
    'groceries', 'rent', 'utilities', 'healthcare', 'insurance', 
    'transportation', 'education', 'debt'
  ];
  
  // Convert to lowercase for case-insensitive comparison
  const normalizedCategory = category.toLowerCase();
  
  // Check if the category is in the needs list
  if (needCategories.includes(normalizedCategory)) {
    return 'need';
  }
  
  // Default to want if not in needs list
  return 'want';
};

module.exports = { classifyExpense };