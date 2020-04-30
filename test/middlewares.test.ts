// @ts-nocheck
import database from '../middlewares/database'
import { MongoClient } from 'mongodb'

jest.mock('mongodb')

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