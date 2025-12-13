import { toggleMeal } from '@/utils/mealToggle'
import { PlannerState } from '@/types/planner'
import { CategoryConfig } from '@/types/plugin'
import { MealCategory } from '@/types/Meal'

describe('toggleMeal', () => {
  const initialState: PlannerState = {
    selections: {}
  }

  const mockCategoryConfig: Partial<Record<MealCategory, CategoryConfig>> = {
    breakfast: {
      label: "Breakfast",
      inputType: "dropdown",
      maxSelections: 1,
    },
    dinner: {
      label: "Dinner",
      inputType: "dropdown",
      maxSelections: 1,
    },
    coffee: {
      label: "Coffee",
      inputType: "radio",
      maxSelections: 1,
    },
    fruit: {
      label: "Fruit",
      inputType: "checkbox",
      maxSelections: Infinity,
    },
    snack: {
      label: "Snacks",
      inputType: "checkbox",
      maxSelections: Infinity,
    },
    shake: {
      label: "Protein Shake",
      inputType: "radio",
      maxSelections: 1,
    },
  }

  describe('dropdown behavior', () => {
    it('selects meal when none selected', () => {
      const result = toggleMeal(initialState, 'breakfast', 'meal1', mockCategoryConfig)
      expect(result.selections.breakfast).toEqual(['meal1'])
    })

    it('replaces selection when different meal selected', () => {
      const state: PlannerState = {
        selections: { breakfast: ['meal1'] }
      }
      const result = toggleMeal(state, 'breakfast', 'meal2', mockCategoryConfig)
      expect(result.selections.breakfast).toEqual(['meal2'])
    })

    it('clears selection when null passed', () => {
      const state: PlannerState = {
        selections: { breakfast: ['meal1'] }
      }
      const result = toggleMeal(state, 'breakfast', null, mockCategoryConfig)
      expect(result.selections.breakfast).toEqual([])
    })
  })

  describe('radio behavior', () => {
    it('selects meal when none selected', () => {
      const result = toggleMeal(initialState, 'coffee', 'coffee1', mockCategoryConfig)
      expect(result.selections.coffee).toEqual(['coffee1'])
    })

    it('replaces selection when different meal selected', () => {
      const state: PlannerState = {
        selections: { coffee: ['coffee1'] }
      }
      const result = toggleMeal(state, 'coffee', 'coffee2', mockCategoryConfig)
      expect(result.selections.coffee).toEqual(['coffee2'])
    })

    it('deselects meal when same meal selected', () => {
      const state: PlannerState = {
        selections: { coffee: ['coffee1'] }
      }
      const result = toggleMeal(state, 'coffee', 'coffee1', mockCategoryConfig)
      expect(result.selections.coffee).toEqual([])
    })

    it('clears selection when empty string passed', () => {
      const state: PlannerState = {
        selections: { coffee: ['coffee1'] }
      }
      const result = toggleMeal(state, 'coffee', '', mockCategoryConfig)
      expect(result.selections.coffee).toEqual([])
    })
  })

  describe('checkbox behavior', () => {
    it('adds meal when not selected', () => {
      const result = toggleMeal(initialState, 'fruit', 'apple', mockCategoryConfig)
      expect(result.selections.fruit).toEqual(['apple'])
    })

    it('removes meal when already selected', () => {
      const state: PlannerState = {
        selections: { fruit: ['apple'] }
      }
      const result = toggleMeal(state, 'fruit', 'apple', mockCategoryConfig)
      expect(result.selections.fruit).toEqual([])
    })

    it('adds multiple meals', () => {
      let state = toggleMeal(initialState, 'fruit', 'apple', mockCategoryConfig)
      state = toggleMeal(state, 'fruit', 'banana', mockCategoryConfig)
      expect(state.selections.fruit).toEqual(['apple', 'banana'])
    })

    it('removes specific meal from multiple selections', () => {
      const state: PlannerState = {
        selections: { fruit: ['apple', 'banana', 'orange'] }
      }
      const result = toggleMeal(state, 'fruit', 'banana', mockCategoryConfig)
      expect(result.selections.fruit).toEqual(['apple', 'orange'])
    })
  })

  it('returns unchanged state for invalid category', () => {
    const result = toggleMeal(initialState, 'invalid' as any, 'meal1', mockCategoryConfig)
    expect(result).toBe(initialState)
  })

  it('preserves other category selections', () => {
    const state: PlannerState = {
      selections: { 
        breakfast: ['meal1'],
        fruit: ['apple'] 
      }
    }
    const result = toggleMeal(state, 'dinner', 'dinner1', mockCategoryConfig)
    expect(result.selections.breakfast).toEqual(['meal1'])
    expect(result.selections.fruit).toEqual(['apple'])
    expect(result.selections.dinner).toEqual(['dinner1'])
  })
})