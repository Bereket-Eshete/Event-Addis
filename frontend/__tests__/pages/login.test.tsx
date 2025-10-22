import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '@/app/(auth)/login/page'
import { authAPI } from '@/lib/api'

jest.mock('@/lib/api')
jest.mock('@/lib/auth', () => ({
  useAuth: () => ({
    setAuth: jest.fn(),
    isAuthenticated: false,
    user: null
  })
}))

const mockAuthAPI = authAPI as jest.Mocked<typeof authAPI>

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders login form', () => {
    render(<LoginPage />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('handles form submission', async () => {
    mockAuthAPI.login.mockResolvedValue({
      data: { access_token: 'token123', user: { id: '1', role: 'attendee' } }
    } as any)

    render(<LoginPage />)
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@test.com' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
    
    await waitFor(() => {
      expect(mockAuthAPI.login).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'password123'
      })
    })
  })

  it('displays error on failed login', async () => {
    mockAuthAPI.login.mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } }
    })

    render(<LoginPage />)
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@test.com' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
    
    await waitFor(() => {
      expect(mockAuthAPI.login).toHaveBeenCalled()
    })
  })
})