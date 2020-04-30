import database from '../middlewares/database'
import { MongoClient } from 'mongodb'

jest.mock('mongodb')

describe('database', function () {
  it('should add the client to the req', () => {
    MongoClient.constructor.mockImplementationOnce(() => ({
      connect: () => true
      db: () => 'mockDb'
    }))
    const req = {}
    database(req, {}, () => true)

    expect(req.db).toEqual('mockDb')
  }
})
