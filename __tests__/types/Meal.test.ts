import { MealCategory, Meal } from '@/types/Meal'

describe('Meal Types', () => {
  describe('MealCategory', () => {
    const validCategories: MealCategory[] = [
      'breakfast',
      'dinner', 
      'fruit',
      'coffee',
      'shake',
      'snack'
    ]

    it('includes all expected categories', () => {
      // This test ensures our type definition matches expected categories
      validCategories.forEach(category => {
        const testCategory: MealCategory = category
        expect(typeof testCategory).toBe('string')
      })
    })
  })

  describe('Meal interface', () => {
    const validMeal: Meal = {
      id: 'test_meal',
      name: 'Test Meal',
      calories: 300,
      protein: 20,
      carbs: 30,
      fat: 10,
      category: 'breakfast'
    }

    it('accepts valid meal object', () => {
      expect(validMeal.id).toBe('test_meal')
      expect(validMeal.name).toBe('Test Meal')
      expect(validMeal.calories).toBe(300)
      expect(validMeal.protein).toBe(20)
      expect(validMeal.carbs).toBe(30)
      expect(validMeal.fat).toBe(10)
      expect(validMeal.category).toBe('breakfast')
    })

    it('has correct property types', () => {
      expect(typeof validMeal.id).toBe('string')
      expect(typeof validMeal.name).toBe('string')
      expect(typeof validMeal.calories).toBe('number')
      expect(typeof validMeal.protein).toBe('number')
      expect(typeof validMeal.carbs).toBe('number')
      expect(typeof validMeal.fat).toBe('number')
      expect(typeof validMeal.category).toBe('string')
    })

    it('accepts all valid categories', () => {
      const categories: MealCategory[] = [
        'breakfast', 'dinner', 'fruit', 'coffee', 'shake', 'snack'
      ]

      categories.forEach(category => {
        const meal: Meal = {
          ...validMeal,
          category
        }
        expect(meal.category).toBe(category)
      })
    })
  })
})