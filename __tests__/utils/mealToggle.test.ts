import { toggleMeal } from '@/utils/mealToggle'
import { PlannerState } from '@/types/planner'

describe('toggleMeal', () => {
  const initialState: PlannerState = {
    selections: {}
  }

  describe('dropdown behavior', () => {
    it('selects meal when none selected', () => {
      const result = toggleMeal(initialState, 'breakfast', 'meal1')
      expect(result.selections.breakfast).toEqual(['meal1'])
    })

    it('replaces selection when different meal selected', () => {
      const state: PlannerState = {
        selections: { breakfast: ['meal1'] }
      }
      const result = toggleMeal(state, 'breakfast', 'meal2')
      expect(result.selections.breakfast).toEqual(['meal2'])
    })

    it('clears selection when null passed', () => {
      const state: PlannerState = {
        selections: { breakfast: ['meal1'] }
      }
      const result = toggleMeal(state, 'breakfast', null)
      expect(result.selections.breakfast).toEqual([])
    })
  })

  describe('radio behavior', () => {
    it('selects meal when none selected', () => {
      const result = toggleMeal(initialState, 'coffee', 'coffee1')
      expect(result.selections.coffee).toEqual(['coffee1'])
    })

    it('replaces selection when different meal selected', () => {
      const state: PlannerState = {
        selections: { coffee: ['coffee1'] }
      }
      const result = toggleMeal(state, 'coffee', 'coffee2')
      expect(result.selections.coffee).toEqual(['coffee2'])
    })

    it('deselects meal when same meal selected', () => {
      const state: PlannerState = {
        selections: { coffee: ['coffee1'] }
      }
      const result = toggleMeal(state, 'coffee', 'coffee1')
      expect(result.selections.coffee).toEqual([])
    })

    it('clears selection when empty string passed', () => {
      const state: PlannerState = {
        selections: { coffee: ['coffee1'] }
      }
      const result = toggleMeal(state, 'coffee', '')
      expect(result.selections.coffee).toEqual([])
    })
  })

  describe('checkbox behavior', () => {
    it('adds meal when not selected', () => {
      const result = toggleMeal(initialState, 'fruit', 'apple')
      expect(result.selections.fruit).toEqual(['apple'])
    })

    it('removes meal when already selected', () => {
      const state: PlannerState = {
        selections: { fruit: ['apple'] }
      }
      const result = toggleMeal(state, 'fruit', 'apple')
      expect(result.selections.fruit).toEqual([])
    })

    it('adds multiple meals', () => {
      let state = toggleMeal(initialState, 'fruit', 'apple')
      state = toggleMeal(state, 'fruit', 'banana')
      expect(state.selections.fruit).toEqual(['apple', 'banana'])
    })

    it('removes specific meal from multiple selections', () => {
      const state: PlannerState = {
        selections: { fruit: ['apple', 'banana', 'orange'] }
      }
      const result = toggleMeal(state, 'fruit', 'banana')
      expect(result.selections.fruit).toEqual(['apple', 'orange'])
    })
  })

  it('returns unchanged state for invalid category', () => {
    const result = toggleMeal(initialState, 'invalid' as any, 'meal1')
    expect(result).toBe(initialState)
  })

  it('preserves other category selections', () => {
    const state: PlannerState = {
      selections: { 
        breakfast: ['meal1'],
        fruit: ['apple'] 
      }
    }
    const result = toggleMeal(state, 'dinner', 'dinner1')
    expect(result.selections.breakfast).toEqual(['meal1'])
    expect(result.selections.fruit).toEqual(['apple'])
    expect(result.selections.dinner).toEqual(['dinner1'])
  })
})