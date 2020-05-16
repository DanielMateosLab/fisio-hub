// @ts-noCheck
import { postHandler } from '../../pages/api/user'
import { userValidationSchema } from '../../utils/validation'
import UsersDAO from '../../storage/usersDAO'
import { mockUser } from '../testUtils'

jest.mock('../../utils/validation')
jest.mock('../../storage/usersDAO')

describe('/api/user', () => {
  describe('POST', () => {
    userValidationSchema.validate.mockImplementation(user => user)
    UsersDAO.addUser.mockImplementation(user => user)

    it('should call req.logIn() and res.status().json()', async() => {
      const req = {
        body: { ...mockUser, repeatPassword: mockUser.password },
        logIn: jest.fn(function(user) { req.user = user })
      }
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      }
      const next = jest.fn()

      await postHandler(req, res, next)

      const { password, ...expectedUserResult } = mockUser
      expect(next).not.toHaveBeenCalled()
      expect(req.logIn).toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({ user: expectedUserResult })
    })
  })
})