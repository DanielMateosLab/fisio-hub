// @ts-nocheck
import database from '../middlewares/database'
import { MongoClient } from 'mongodb'
import { professionals } from '../middlewares/collections'
import ProfessionalsDAO from '../storage/professionalsDAO'

jest.mock('mongodb')
jest.mock('../storage/professionalsDAO')

describe('database', function () {
  it('should add the client and db to the req and call next', async () => {
    const next = jest.fn()
    const connect = jest.fn()

    MongoClient.prototype.connect.mockImplementationOnce(connect)
    MongoClient.prototype.db.mockImplementationOnce(() => 'mockDb')

    const req = {}
    await database(req, {}, next)

    expect(connect).toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
    expect(req).toHaveProperty('dbClient')
    expect(req).toHaveProperty('db')
  })
  it('should throw a Service Unavailable error when and error happends', async () => {
    const errorMessage = 'mock error'
    try {
      MongoClient.prototype.connect.mockImplementationOnce(() => {
        throw new Error(errorMessage)
      })

      const result = await database({}, {}, () => true)

      expect(result).toBeUndefined()
    } catch (e) {
      expect(e.message).toContain(errorMessage)
    }
  })
})

describe('collections', () => {
  test('Professionals: should call ProfessionalsDAO.injectDB() and next()', () => {
    const req = {
      db: 'mock'
    }
    const next = jest.fn()
    const mockInjectDB = jest.fn()

    ProfessionalsDAO.injectDB.mockImplementationOnce(mockInjectDB)
    professionals(req, {}, next)

    expect(next).toHaveBeenCalled()
    expect(mockInjectDB).toHaveBeenCalled()
  })
})