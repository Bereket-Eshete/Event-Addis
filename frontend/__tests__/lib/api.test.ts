import axios from 'axios'
import { authAPI, eventsAPI } from '@/lib/api'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('authAPI', () => {
    it('should register user successfully', async () => {
      const mockResponse = { data: { user: { id: '1', email: 'test@test.com' } } }
      mockedAxios.create.mockReturnValue({
        post: jest.fn().mockResolvedValue(mockResponse),
        interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } }
      } as any)

      const userData = {
        fullName: 'Test User',
        email: 'test@test.com',
        password: 'password123',
        role: 'attendee' as const,
        termsAccepted: true
      }

      const result = await authAPI.register(userData)
      expect(result.data.user.email).toBe('test@test.com')
    })

    it('should login user successfully', async () => {
      const mockResponse = { data: { access_token: 'token123', user: { id: '1' } } }
      mockedAxios.create.mockReturnValue({
        post: jest.fn().mockResolvedValue(mockResponse),
        interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } }
      } as any)

      const result = await authAPI.login({ email: 'test@test.com', password: 'password123' })
      expect(result.data.access_token).toBe('token123')
    })
  })

  describe('eventsAPI', () => {
    it('should fetch events successfully', async () => {
      const mockEvents = { data: { events: [{ id: '1', title: 'Test Event' }] } }
      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockEvents),
        interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } }
      } as any)

      const result = await eventsAPI.getAllEvents()
      expect(result.data.events).toHaveLength(1)
    })
  })
})