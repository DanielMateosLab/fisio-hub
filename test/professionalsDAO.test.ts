require('dotenv').config()
import ProfessionalsDAO from '../storage/professionalsDAO'
import { Collection, MongoClient } from 'mongodb'

describe('professionalsDAO', () => {
  let client: MongoClient
  let professionals: Collection
  const mockProfessional = {
    email: 'a@a.com',
    firstName: 'aaaa',
    lastName: 'bbbb cccc',
    password: 'aaaaa'
  }

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