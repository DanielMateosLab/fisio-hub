// @ts-nocheck
import database from '../middlewares/database'
import { MongoClient } from 'mongodb'
import { professionals } from '../middlewares/collections'
import ProfessionalsDAO from '../storage/professionalsDAO'
import onError, { defaultErrorMessage } from '../middlewares/onError'

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

describe('onError', () => {
  const res = {
    json: jest.fn(),
    status: jest.fn(function() { return this })
  }
  let error: Error

  beforeEach(() => {
    error = new Error('mock Error')
  })

  it('should call res.status(500) when error has no status property', () => {
    onError(error, {}, res)

    expect(res.status).toHaveBeenCalledWith(500)
  })
  it('should call res.json with the default message if no message is provided in the error', () => {
    delete error.message

    onError(error, {}, res)

    expect(res.json).toHaveBeenCalledWith({ message: defaultErrorMessage })
  })
  it('should call res.json with the error status and message', () => {
    error.status = 400

    onError(error, {}, res)

    expect(res.status).toHaveBeenCalledWith(error.status)
    expect(res.json).toHaveBeenCalledWith({
      message: error.message
    })
  })
})