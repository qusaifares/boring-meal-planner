import { calculateTotals } from '@/lib/totals'
import { Meal } from '@/types/Meal'

describe('calculateTotals', () => {
  const mockMeals: Meal[] = [
    {
      id: 'meal1',
      name: 'Test Meal 1',
      calories: 300,
      protein: 20,
      carbs: 30,
      fat: 10,
      category: 'breakfast'
    },
    {
      id: 'meal2',
      name: 'Test Meal 2',
      calories: 200,
      protein: 15,
      carbs: 25,
      fat: 5,
      category: 'dinner'
    }
  ]

  it('calculates totals correctly for multiple meals', () => {
    const result = calculateTotals(mockMeals)
    
    expect(result).toEqual({
      calories: 500,
      protein: 35,
      carbs: 55,
      fat: 15
    })
  })

  it('returns zero totals for empty array', () => {
    const result = calculateTotals([])
    
    expect(result).toEqual({
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    })
  })

  it('calculates totals correctly for single meal', () => {
    const result = calculateTotals([mockMeals[0]])
    
    expect(result).toEqual({
      calories: 300,
      protein: 20,
      carbs: 30,
      fat: 10
    })
  })
})