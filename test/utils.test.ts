import { useUser } from '../utils/hooks'
import { mockProfessional } from './testUtils'
import extractUser from '../utils/extractUser'

jest.mock('swr',() => function useSWR() {
  return {
    data: {
      professional: mockProfessional
    },
    mutate: jest.fn()
  }
})

describe('useUser', () => {
  it('should return SWRs mutate', () => {
    const { mutate } = useUser()

    expect(mutate).toBeDefined()
  })
  it('should return the mockProfessional', () => {
    const { user } = useUser()

    expect(user).toMatchObject(mockProfessional)
  })
})

describe('extractUser', () => {
  it('should return the mockUser properties but the password', () => {
    const req = {
      user: mockProfessional
    }
    const user = extractUser(req as any)

    expect(user.password).toBeUndefined()
  })
  it('should return null if req.user does not exist', () => {
    const user = extractUser({} as any)
    expect(user).toBeNull()
  })
})