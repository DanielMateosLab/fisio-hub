import UsersDAO from '../../storage/usersDAO'
import usersDAO from '../../storage/usersDAO'
import { Collection, MongoClient } from 'mongodb'
import { User } from '../../storage/types'
import { mockRole } from '../testUtils'

require('dotenv').config()

describe('usersDAO', () => {
  let client: MongoClient
  let users: Collection<User>
  let mockUser: User

  beforeAll(async () => {
    const dbName = 'test'
    client = await MongoClient.connect(process.env.DB_URI!, {
      useNewUrlParser: true, useUnifiedTopology: true })
    const db = client.db(dbName)
    users = db.collection('users')
    UsersDAO.injectDB(db)
  })
  beforeEach(async () => {
    mockUser = {
      email: 'a@a.com',
      password: 'mockPassword'
    }
  })
  afterEach(async () => {
    await users.deleteMany({})
  })
  afterAll(async () => {
    await client.close()
  })

  describe('addUser', () => {
    it('should return the mock professional with a hashed password', async () => {
      try {
        const result = await UsersDAO.addUser(mockUser)

        const { password, ...matchObject } = mockUser
        expect(result).toMatchObject(matchObject)
        expect(result.password).not.toEqual('mockPassword')
      } catch (error) {
        expect(error).toBeNull()
      }
    })
    it('should return the mock professional', async () => {
      try {
        const email = 'mockEmail'
        const result = await UsersDAO.addUser({ email })

        expect(result.email).toEqual(email)
      } catch (error) {
        expect(error).toBeNull()
      }
    })
    it('should fail with a wrong role shape', async () => {
      try {
        mockUser.roles = [{ mockProperty: 'mock' } as any]
        const result = await UsersDAO.addUser(mockUser)

        expect(result).toBeNull()
      } catch (error) {
        expect(error.errmsg).toEqual('Document failed validation')
      }
    })
    it('should fail with a mock user property', async () => {
      try {
        // @ts-ignore
        mockUser.mock = 'mock'
        const result = await UsersDAO.addUser(mockUser)

        expect(result).toBeNull()
      } catch (error) {
        expect(error.errmsg).toEqual('Document failed validation')
      }
    })
  })

  describe('addRole', () => {
    it('should add a role to the user', async () => {
      try {
        await usersDAO.addUser(mockUser)

        const role = await usersDAO.addRole(mockUser.email, mockRole)

        expect(role).toEqual(role)
      } catch (e) {
        expect(e).toBeNull()
      }
    })
    it('should throw a 404 error with a non-existing email', async () => {
      try {
        const role = await usersDAO.addRole(mockUser.email, mockRole)

        expect(role).toBeNull()
      } catch(e) {
        expect(e.message).toMatch('No se ha encontrado ningún usuario')
      }
    })
  })
})