import { render, screen } from '@testing-library/react';
import { TenantSelector } from '@/components/TenantSelector';

// Mock the useIsMobile hook
jest.mock('../../hooks/useIsMobile', () => ({
  useIsMobile: () => false,
}));

// Mock window.location
const mockLocation = {
  pathname: '/',
  href: 'http://localhost:3000/',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('TenantSelector', () => {
  beforeEach(() => {
    // Reset location mock
    mockLocation.href = 'http://localhost:3000/';
  });

  it('renders all available tenants', () => {
    render(<TenantSelector />);
    
    expect(screen.getByText('Switch Configuration')).toBeInTheDocument();
    expect(screen.getByText('Default User')).toBeInTheDocument();
    expect(screen.getByText('Qusai - Costco Kitchen')).toBeInTheDocument();
  });

  it('shows default tenant as active when no tenant parameter', () => {
    render(<TenantSelector />);
    
    const defaultLink = screen.getByText('Default User');
    expect(defaultLink).toHaveStyle('border: 2px solid #3b82f6');
  });

  it('shows correct tenant as active when tenant parameter is present', () => {
    mockLocation.href = 'http://localhost:3000/?tenant=costco-kitchen';
    
    render(<TenantSelector />);
    
    expect(screen.getByText('Currently using: Qusai - Costco Kitchen')).toBeInTheDocument();
  });

  it('generates correct URLs for tenant switching', () => {
    render(<TenantSelector />);
    
    const costcoLink = screen.getByText('Qusai - Costco Kitchen');
    expect(costcoLink).toHaveAttribute('href', '/?tenant=costco-kitchen');
    
    const defaultLink = screen.getByText('Default User');
    expect(defaultLink).toHaveAttribute('href', '/');
  });
});