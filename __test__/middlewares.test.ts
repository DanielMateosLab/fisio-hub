// @ts-nocheck
import database from '../server/middlewares/database'
import { MongoClient } from 'mongodb'
import { professionals } from '../server/middlewares/collections'
import ProfessionalsDAO from '../server/storage/professionalsDAO'
import onError, { defaultErrorMessage } from '../server/middlewares/onError'
import { parseYupValidationErrors } from '../common/validation'

jest.mock('mongodb')
jest.mock('../storage/professionalsDAO')
jest.mock('../utils/validation')

describe('database', function () {
  const next = jest.fn()

  it('should add the client and db to the req and call next', async () => {
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
  it('should not call client.connect if it is already connected', () => {
    const connectSpy = jest.spyOn(MongoClient, 'connect')
    MongoClient.prototype.isConnected.mockImplementationOnce(() => true)

    database({}, {}, next)

    expect(connectSpy).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })
  it('should throw a Service Unavailable error when and error happends', async () => {
    const errorMessage = 'mock error'
    try {
      MongoClient.prototype.connect.mockImplementationOnce(() => {
        throw new Error(errorMessage)
      })

      const result = await database({}, {}, next)

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
  it('should parse yup validation errors', () => {
    // Yup validation errors have ValidationError as name
    error.name = 'ValidationError'
    const mockParseFn = jest.fn((e) => e)
    parseYupValidationErrors.mockImplementationOnce(mockParseFn)

    onError(error, {}, res)

    expect(mockParseFn).toHaveBeenCalled()
  })
})