import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { CategorySection } from '../../components/CategorySection'
import { Meal } from '../../types/Meal'
import { CategoryConfig } from '../../types/plugin'

// Mock the useIsMobile hook
jest.mock('../../hooks/useIsMobile', () => ({
  useIsMobile: jest.fn(() => false)
}))

describe('CategorySection', () => {
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
      category: 'breakfast'
    }
  ]

  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  describe('dropdown input type', () => {
    const dropdownConfig: CategoryConfig = {
      label: 'Breakfast',
      inputType: 'dropdown',
      maxSelections: 1
    }

    it('renders dropdown with meals and none option', () => {
      render(
        <CategorySection
          category="breakfast"
          config={dropdownConfig}
          meals={mockMeals}
          selections={[]}
          onChange={mockOnChange}
        />
      )

      expect(screen.getByText('Breakfast')).toBeInTheDocument()
      expect(screen.getByRole('combobox')).toBeInTheDocument()
      expect(screen.getByText('— None —')).toBeInTheDocument()
      expect(screen.getByText('Test Meal 1 (300 kcal, 20g P)')).toBeInTheDocument()
    })

    it('calls onChange when selection changes', () => {
      render(
        <CategorySection
          category="breakfast"
          config={dropdownConfig}
          meals={mockMeals}
          selections={[]}
          onChange={mockOnChange}
        />
      )

      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'meal1' } })
      expect(mockOnChange).toHaveBeenCalledWith('meal1')
    })

    it('shows selected meal', () => {
      render(
        <CategorySection
          category="breakfast"
          config={dropdownConfig}
          meals={mockMeals}
          selections={['meal1']}
          onChange={mockOnChange}
        />
      )

      expect(screen.getByRole('combobox')).toHaveValue('meal1')
    })
  })

  describe('radio input type', () => {
    const radioConfig: CategoryConfig = {
      label: 'Coffee',
      inputType: 'radio',
      maxSelections: 1
    }

    it('renders radio buttons with meals and none option', () => {
      render(
        <CategorySection
          category="coffee"
          config={radioConfig}
          meals={mockMeals}
          selections={[]}
          onChange={mockOnChange}
        />
      )

      expect(screen.getByText('Coffee')).toBeInTheDocument()
      expect(screen.getAllByRole('radio')).toHaveLength(3) // 2 meals + none
      expect(screen.getByText('— None —')).toBeInTheDocument()
    })

    it('calls onChange when radio selection changes', () => {
      render(
        <CategorySection
          category="coffee"
          config={radioConfig}
          meals={mockMeals}
          selections={[]}
          onChange={mockOnChange}
        />
      )

      const radioButtons = screen.getAllByRole('radio')
      fireEvent.click(radioButtons[1]) // Click first meal
      expect(mockOnChange).toHaveBeenCalledWith('meal1')
    })

    it('shows selected radio button', () => {
      render(
        <CategorySection
          category="coffee"
          config={radioConfig}
          meals={mockMeals}
          selections={['meal1']}
          onChange={mockOnChange}
        />
      )

      const radioButtons = screen.getAllByRole('radio')
      expect(radioButtons[1]).toBeChecked() // First meal should be checked
    })

    it('shows none selected when no meals selected', () => {
      render(
        <CategorySection
          category="coffee"
          config={radioConfig}
          meals={mockMeals}
          selections={[]}
          onChange={mockOnChange}
        />
      )

      const radioButtons = screen.getAllByRole('radio')
      expect(radioButtons[0]).toBeChecked() // None option should be checked
    })
  })

  describe('checkbox input type', () => {
    const checkboxConfig: CategoryConfig = {
      label: 'Fruit',
      inputType: 'checkbox',
      maxSelections: Infinity
    }

    it('renders checkboxes for meals', () => {
      render(
        <CategorySection
          category="fruit"
          config={checkboxConfig}
          meals={mockMeals}
          selections={[]}
          onChange={mockOnChange}
        />
      )

      expect(screen.getByText('Fruit')).toBeInTheDocument()
      expect(screen.getAllByRole('checkbox')).toHaveLength(2)
    })

    it('calls onChange when checkbox is clicked', () => {
      render(
        <CategorySection
          category="fruit"
          config={checkboxConfig}
          meals={mockMeals}
          selections={[]}
          onChange={mockOnChange}
        />
      )

      const checkboxes = screen.getAllByRole('checkbox')
      fireEvent.click(checkboxes[0])
      expect(mockOnChange).toHaveBeenCalledWith('meal1')
    })

    it('shows selected checkboxes', () => {
      render(
        <CategorySection
          category="fruit"
          config={checkboxConfig}
          meals={mockMeals}
          selections={['meal1', 'meal2']}
          onChange={mockOnChange}
        />
      )

      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes[0]).toBeChecked()
      expect(checkboxes[1]).toBeChecked()
    })

    it('shows partially selected checkboxes', () => {
      render(
        <CategorySection
          category="fruit"
          config={checkboxConfig}
          meals={mockMeals}
          selections={['meal1']}
          onChange={mockOnChange}
        />
      )

      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes[0]).toBeChecked()
      expect(checkboxes[1]).not.toBeChecked()
    })
  })

  it('handles empty meals array', () => {
    const config: CategoryConfig = {
      label: 'Empty Category',
      inputType: 'dropdown',
      maxSelections: 1
    }

    render(
      <CategorySection
        category="breakfast"
        config={config}
        meals={[]}
        selections={[]}
        onChange={mockOnChange}
      />
    )

    expect(screen.getByText('Empty Category')).toBeInTheDocument()
    expect(screen.getByText('— None —')).toBeInTheDocument()
  })
})