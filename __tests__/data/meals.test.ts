import { 
  MEAL_LIBRARY, 
  breakfasts, 
  dinners, 
  fruits, 
  coffees, 
  proteinShakes, 
  snacks 
} from '@/data/meals'

describe('Meal Data', () => {
  describe('MEAL_LIBRARY', () => {
    it('contains all meal categories', () => {
      const categories = new Set(MEAL_LIBRARY.map(meal => meal.category))
      expect(categories).toContain('breakfast')
      expect(categories).toContain('dinner')
      expect(categories).toContain('fruit')
      expect(categories).toContain('coffee')
      expect(categories).toContain('shake')
      expect(categories).toContain('snack')
    })

    it('has unique meal IDs', () => {
      const ids = MEAL_LIBRARY.map(meal => meal.id)
      const uniqueIds = new Set(ids)
      expect(ids.length).toBe(uniqueIds.size)
    })

    it('contains expected number of meals', () => {
      const expectedTotal = breakfasts.length + dinners.length + fruits.length + 
                           coffees.length + proteinShakes.length + snacks.length
      expect(MEAL_LIBRARY.length).toBe(expectedTotal)
    })

    it('all meals have required properties', () => {
      MEAL_LIBRARY.forEach(meal => {
        expect(meal).toHaveProperty('id')
        expect(meal).toHaveProperty('name')
        expect(meal).toHaveProperty('calories')
        expect(meal).toHaveProperty('protein')
        expect(meal).toHaveProperty('carbs')
        expect(meal).toHaveProperty('fat')
        expect(meal).toHaveProperty('category')
        
        expect(typeof meal.id).toBe('string')
        expect(typeof meal.name).toBe('string')
        expect(typeof meal.calories).toBe('number')
        expect(typeof meal.protein).toBe('number')
        expect(typeof meal.carbs).toBe('number')
        expect(typeof meal.fat).toBe('number')
        expect(typeof meal.category).toBe('string')
      })
    })

    it('all meals have non-negative nutritional values', () => {
      MEAL_LIBRARY.forEach(meal => {
        expect(meal.calories).toBeGreaterThanOrEqual(0)
        expect(meal.protein).toBeGreaterThanOrEqual(0)
        expect(meal.carbs).toBeGreaterThanOrEqual(0)
        expect(meal.fat).toBeGreaterThanOrEqual(0)
      })
    })
  })

  describe('Category Arrays', () => {
    it('breakfasts all have breakfast category', () => {
      breakfasts.forEach(meal => {
        expect(meal.category).toBe('breakfast')
      })
    })

    it('dinners all have dinner category', () => {
      dinners.forEach(meal => {
        expect(meal.category).toBe('dinner')
      })
    })

    it('fruits all have fruit category', () => {
      fruits.forEach(meal => {
        expect(meal.category).toBe('fruit')
      })
    })

    it('coffees all have coffee category', () => {
      coffees.forEach(meal => {
        expect(meal.category).toBe('coffee')
      })
    })

    it('protein shakes all have shake category', () => {
      proteinShakes.forEach(meal => {
        expect(meal.category).toBe('shake')
      })
    })

    it('snacks all have snack category', () => {
      snacks.forEach(meal => {
        expect(meal.category).toBe('snack')
      })
    })
  })

  describe('Specific Meal Validation', () => {
    it('contains expected breakfast meals', () => {
      expect(breakfasts.length).toBeGreaterThan(0)
      expect(breakfasts.some(meal => meal.name.includes('Bagel'))).toBe(true)
    })

    it('contains expected dinner meals', () => {
      expect(dinners.length).toBeGreaterThan(0)
      expect(dinners.some(meal => meal.name.includes('Chipotle'))).toBe(true)
    })

    it('contains basic fruits', () => {
      expect(fruits.some(meal => meal.name === 'Apple')).toBe(true)
      expect(fruits.some(meal => meal.name === 'Banana')).toBe(true)
    })

    it('contains coffee options', () => {
      expect(coffees.some(meal => meal.name.includes('Mocha'))).toBe(true)
      expect(coffees.some(meal => meal.name === 'Black Coffee')).toBe(true)
    })
  })
})