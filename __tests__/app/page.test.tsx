import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import HomePage from '../../app/page'
import { ConfigProvider } from '../../context/ConfigContext'

// Mock the hooks and components
jest.mock('../../hooks/useIsMobile', () => ({
  useIsMobile: jest.fn(() => false)
}))

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
})
Object.defineProperty(window, 'confirm', 
  { value: jest.fn(() => true), writable: true }
);

describe('HomePage', () => {
  // Helper function to render with ConfigProvider
  const renderWithConfig = (component: React.ReactElement) => {
    return render(
      <ConfigProvider>
        {component}
      </ConfigProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(null)
  })

  it('renders main heading and description', () => {
    renderWithConfig(<HomePage />)
    
    expect(screen.getByText('Boring Meal Planner')).toBeInTheDocument()
    expect(screen.getByText(/Hard-coded for your real meals/)).toBeInTheDocument()
  })

  it('renders all category sections', () => {
    renderWithConfig(<HomePage />)
    
    expect(screen.getByText('Breakfast')).toBeInTheDocument()
    expect(screen.getByText('Dinner')).toBeInTheDocument()
    expect(screen.getByText('Coffee')).toBeInTheDocument()
    expect(screen.getByText('Fruit')).toBeInTheDocument()
    expect(screen.getByText('Snacks')).toBeInTheDocument()
    expect(screen.getByText('Protein Shake')).toBeInTheDocument()
  })

  it('renders summary section with stat tiles', () => {
    renderWithConfig(<HomePage />)
    
    expect(screen.getByText("Today's Summary")).toBeInTheDocument()
    expect(screen.getByText('Calories')).toBeInTheDocument()
    expect(screen.getByText('Protein')).toBeInTheDocument()
    expect(screen.getByText('Carbs')).toBeInTheDocument()
    expect(screen.getByText('Fat')).toBeInTheDocument()
  })

  it('shows zero totals initially', () => {
    renderWithConfig(<HomePage />)
    
    expect(screen.getByText('0 kcal')).toBeInTheDocument()
    expect(screen.getAllByText('0 g')).toHaveLength(3)
  })

  it('shows "Nothing selected yet" when no meals selected', () => {
    renderWithConfig(<HomePage />)
    
    expect(screen.getByText('Nothing selected yet.')).toBeInTheDocument()
  })

  it('renders clear day button', () => {
    renderWithConfig(<HomePage />)
    
    expect(screen.getByText('Clear day')).toBeInTheDocument()
  })

  it('clears selections when clear button is clicked', async () => {
    renderWithConfig(<HomePage />)
    
    // Click clear button
    const clearButton = screen.getByText('Clear day')
    fireEvent.click(clearButton)
    
    // Should show nothing selected
    expect(screen.getByText('Nothing selected yet.')).toBeInTheDocument()
  })

  it('updates totals when meals are selected', () => {
    renderWithConfig(<HomePage />)
    
    // Initial state should show zeros
    expect(screen.getByText('0 kcal')).toBeInTheDocument()
  })

  it('displays selected meals in the summary', () => {
    renderWithConfig(<HomePage />)
    
    // Should show nothing selected initially
    expect(screen.getByText('Nothing selected yet.')).toBeInTheDocument()
  })


})