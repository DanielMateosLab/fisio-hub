import { mockProfessional } from './testUtils'
import ProfessionalsDAO from '../storage/professionalsDAO'
import { Collection, MongoClient } from 'mongodb'
require('dotenv').config()

describe('professionalsDAO', () => {
  let client: MongoClient
  let professionals: Collection

  beforeAll(async () => {
    const dbName = 'test'
    client = await MongoClient.connect(process.env.DB_URI!, {
      useNewUrlParser: true, useUnifiedTopology: true })
    const db = client.db(dbName)
    professionals = db.collection('professionals')
    ProfessionalsDAO.injectDB(db)
  })
  beforeEach(async () => {
    await professionals.deleteMany({})
  })
  afterAll(async () => {
    await client.close()
  })

  it('should return the mock professional with an _id from mongodb and a hashed password', async () => {
    try {
      const result = await ProfessionalsDAO.addProfessional(mockProfessional)

      const { password, ...matchObject } = mockProfessional
      expect(result).toMatchObject(matchObject)
      expect(result).toHaveProperty('_id')
      expect(result.password).not.toEqual(password)
    } catch (error) {
      expect(error).toBeNull()
    }
  })
})