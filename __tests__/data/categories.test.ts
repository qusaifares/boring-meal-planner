import { CATEGORY_CONFIG } from '@/data/categories'
import { MealCategory } from '@/types/Meal'

describe('Category Configuration', () => {
  const expectedCategories: MealCategory[] = [
    'breakfast', 'dinner', 'coffee', 'fruit', 'snack', 'shake'
  ]

  it('contains all expected categories', () => {
    expectedCategories.forEach(category => {
      expect(CATEGORY_CONFIG).toHaveProperty(category)
    })
  })

  it('all categories have required properties', () => {
    Object.values(CATEGORY_CONFIG).forEach(config => {
      expect(config).toHaveProperty('label')
      expect(config).toHaveProperty('inputType')
      expect(config).toHaveProperty('maxSelections')
      
      expect(typeof config.label).toBe('string')
      expect(['dropdown', 'checkbox', 'radio']).toContain(config.inputType)
      expect(typeof config.maxSelections).toBe('number')
      expect(config.maxSelections).toBeGreaterThan(0)
    })
  })

  describe('Specific Category Configurations', () => {
    it('breakfast is configured as dropdown with single selection', () => {
      expect(CATEGORY_CONFIG.breakfast.inputType).toBe('dropdown')
      expect(CATEGORY_CONFIG.breakfast.maxSelections).toBe(1)
      expect(CATEGORY_CONFIG.breakfast.label).toBe('Breakfast')
    })

    it('dinner is configured as dropdown with single selection', () => {
      expect(CATEGORY_CONFIG.dinner.inputType).toBe('dropdown')
      expect(CATEGORY_CONFIG.dinner.maxSelections).toBe(1)
      expect(CATEGORY_CONFIG.dinner.label).toBe('Dinner')
    })

    it('coffee is configured as radio with single selection', () => {
      expect(CATEGORY_CONFIG.coffee.inputType).toBe('radio')
      expect(CATEGORY_CONFIG.coffee.maxSelections).toBe(1)
      expect(CATEGORY_CONFIG.coffee.label).toBe('Coffee')
    })

    it('fruit is configured as checkbox with unlimited selections', () => {
      expect(CATEGORY_CONFIG.fruit.inputType).toBe('checkbox')
      expect(CATEGORY_CONFIG.fruit.maxSelections).toBe(Infinity)
      expect(CATEGORY_CONFIG.fruit.label).toBe('Fruit')
    })

    it('snack is configured as checkbox with unlimited selections', () => {
      expect(CATEGORY_CONFIG.snack.inputType).toBe('checkbox')
      expect(CATEGORY_CONFIG.snack.maxSelections).toBe(Infinity)
      expect(CATEGORY_CONFIG.snack.label).toBe('Snacks')
    })

    it('shake is configured as radio with single selection', () => {
      expect(CATEGORY_CONFIG.shake.inputType).toBe('radio')
      expect(CATEGORY_CONFIG.shake.maxSelections).toBe(1)
      expect(CATEGORY_CONFIG.shake.label).toBe('Protein Shake')
    })
  })

  it('single selection categories use dropdown or radio', () => {
    Object.entries(CATEGORY_CONFIG).forEach(([category, config]) => {
      if (config.maxSelections === 1) {
        expect(['dropdown', 'radio']).toContain(config.inputType)
      }
    })
  })

  it('unlimited selection categories use checkbox', () => {
    Object.entries(CATEGORY_CONFIG).forEach(([category, config]) => {
      if (config.maxSelections === Infinity) {
        expect(config.inputType).toBe('checkbox')
      }
    })
  })
})