import { Collection, MongoClient } from 'mongodb'
import { Center } from '../../storage/types'
import usersDAO from '../../storage/usersDAO'
import centersDAO from '../../storage/centersDAO'

require('dotenv').config()

describe('usersDAO', () => {
  let client: MongoClient
  let centers: Collection<Center>
  let mockCenter: Center

  beforeAll(async () => {
    client = await MongoClient.connect(process.env.DB_URI!, {
      useNewUrlParser: true, useUnifiedTopology: true })
    const db = client.db('test')
    centers = db.collection('centers')
    centersDAO.injectDB(db)
  })
  beforeEach(async () => {
    mockCenter = require('../testUtils').mockCenter
  })
  afterEach(async () => {
    await centers.deleteMany({})
  })
  afterAll(async () => {
    await client.close()
  })

  describe('createCenter', () => {
    it('should return the created center', async () => {
      const center = await centersDAO.createCenter(mockCenter)

      expect(center).toEqual(mockCenter)
    })
  })

  describe('getCenter', () => {
    it('should return a center', async () => {
      await centers.insertOne(mockCenter as any)
      const result = await centersDAO.getCenterById(mockCenter._id!)

      expect(result).toEqual(mockCenter)
    })
  })
})