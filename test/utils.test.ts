import { mockProfessional } from './testUtils'
import extractAuthData from '../utils/extractAuthData'


describe('extractUser', () => {
  it('should return the mockUser properties but the password', () => {
    const req = {
      user: mockProfessional
    }
    const user = extractAuthData(req as any)

    // @ts-ignore
    expect(user.password).toBeUndefined()
  })
  it('should return null if req.user does not exist', () => {
    const user = extractAuthData({} as any)
    expect(user).toBeNull()
  })
})