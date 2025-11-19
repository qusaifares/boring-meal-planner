import { renderHook, act } from '@testing-library/react'
import { useIsMobile } from '@/hooks/useIsMobile'

describe('useIsMobile', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  it('returns false for desktop width', () => {
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('returns true for mobile width', () => {
    Object.defineProperty(window, 'innerWidth', { value: 500 })
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('uses custom breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { value: 900 })
    const { result } = renderHook(() => useIsMobile(1000))
    expect(result.current).toBe(true)
  })

  it('updates on window resize', () => {
    const { result } = renderHook(() => useIsMobile())
    
    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 500 })
      window.dispatchEvent(new Event('resize'))
    })
    
    expect(result.current).toBe(true)
  })
})