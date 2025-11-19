import { PlannerState } from '@/types/planner'
import { MealCategory } from '@/types/Meal'

describe('Planner Types', () => {
  describe('PlannerState', () => {
    it('accepts empty selections', () => {
      const state: PlannerState = {
        selections: {}
      }
      expect(state.selections).toEqual({})
    })

    it('accepts single category selection', () => {
      const state: PlannerState = {
        selections: {
          breakfast: ['breakfast_bagel_turkey']
        }
      }
      expect(state.selections.breakfast).toEqual(['breakfast_bagel_turkey'])
    })

    it('accepts multiple category selections', () => {
      const state: PlannerState = {
        selections: {
          breakfast: ['breakfast_bagel_turkey'],
          fruit: ['fruit_apple', 'fruit_banana'],
          coffee: ['coffee_mocha_halfsweet']
        }
      }
      expect(state.selections.breakfast).toEqual(['breakfast_bagel_turkey'])
      expect(state.selections.fruit).toEqual(['fruit_apple', 'fruit_banana'])
      expect(state.selections.coffee).toEqual(['coffee_mocha_halfsweet'])
    })

    it('accepts empty arrays for categories', () => {
      const state: PlannerState = {
        selections: {
          breakfast: [],
          dinner: [],
          fruit: []
        }
      }
      expect(state.selections.breakfast).toEqual([])
      expect(state.selections.dinner).toEqual([])
      expect(state.selections.fruit).toEqual([])
    })

    it('accepts partial category coverage', () => {
      const state: PlannerState = {
        selections: {
          breakfast: ['breakfast_bagel_turkey']
          // Other categories omitted
        }
      }
      expect(state.selections.breakfast).toEqual(['breakfast_bagel_turkey'])
      expect(state.selections.dinner).toBeUndefined()
    })

    it('accepts all valid meal categories', () => {
      const categories: MealCategory[] = [
        'breakfast', 'dinner', 'fruit', 'coffee', 'shake', 'snack'
      ]

      const state: PlannerState = {
        selections: categories.reduce((acc, category) => {
          acc[category] = [`${category}_test_meal`]
          return acc
        }, {} as PlannerState['selections'])
      }

      categories.forEach(category => {
        expect(state.selections[category]).toEqual([`${category}_test_meal`])
      })
    })

    it('meal IDs are strings', () => {
      const state: PlannerState = {
        selections: {
          breakfast: ['meal1', 'meal2'],
          fruit: ['apple', 'banana']
        }
      }

      state.selections.breakfast?.forEach(id => {
        expect(typeof id).toBe('string')
      })
      state.selections.fruit?.forEach(id => {
        expect(typeof id).toBe('string')
      })
    })
  })
})