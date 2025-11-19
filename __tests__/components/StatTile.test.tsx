import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { StatTile } from '../../components/StatTile'

// Mock the useIsMobile hook
jest.mock('../../hooks/useIsMobile', () => ({
  useIsMobile: jest.fn(() => false)
}))

describe('StatTile', () => {
  it('renders label and value correctly', () => {
    render(<StatTile label="Calories" value={500} />)
    
    expect(screen.getByText('Calories')).toBeInTheDocument()
    expect(screen.getByText('500')).toBeInTheDocument()
  })

  it('renders with suffix when provided', () => {
    render(<StatTile label="Protein" value={25} suffix="g" />)
    
    expect(screen.getByText('Protein')).toBeInTheDocument()
    expect(screen.getByText('25 g')).toBeInTheDocument()
  })

  it('renders without suffix when not provided', () => {
    render(<StatTile label="Count" value={10} />)
    
    expect(screen.getByText('Count')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('handles zero values', () => {
    render(<StatTile label="Empty" value={0} suffix="kcal" />)
    
    expect(screen.getByText('Empty')).toBeInTheDocument()
    expect(screen.getByText('0 kcal')).toBeInTheDocument()
  })

  it('handles large values', () => {
    render(<StatTile label="Large" value={9999} suffix="mg" />)
    
    expect(screen.getByText('Large')).toBeInTheDocument()
    expect(screen.getByText('9999 mg')).toBeInTheDocument()
  })
})