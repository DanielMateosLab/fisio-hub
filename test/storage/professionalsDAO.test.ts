import { mockCenter, mockProfessional } from '../testUtils'
import ProfessionalsDAO from '../../storage/professionalsDAO'
import professionalsDAO from '../../storage/professionalsDAO'
import { Collection, MongoClient } from 'mongodb'
import usersDAO from '../../storage/usersDAO'
import UsersDAO from '../../storage/usersDAO'
import { Professional } from '../../storage/types'

require('dotenv').config()
process.env.DB_NAME = 'test'

describe('professionalsDAO', () => {
  let client: MongoClient
  let professionals: Collection
  let centers: Collection
  let users: Collection
  let mkProfessional: Professional

  beforeAll(async () => {
    const dbName = 'test'
    client = await MongoClient.connect(process.env.DB_URI!, {
      useNewUrlParser: true, useUnifiedTopology: true, w: 'majority' })
    const db = client.db(dbName)
    professionals = db.collection('professionals')
    centers = db.collection('centers')
    users = db.collection('users')
    ProfessionalsDAO.injectDB(client)
    UsersDAO.injectDB(db)
  })

  beforeEach(async () => {
    mkProfessional = mockProfessional
    await centers.insertOne(mockCenter)
  })

  afterEach(async () => {
    await professionals.deleteMany({})
    await users.deleteMany({})
    await centers.deleteMany({})
  })

  afterAll(async () => {
    await client.close()
  })

  describe('addProfessional', () => {
    it('should create the user with the new role if the email is not registered', async () => {
      try {
        const { success } = await ProfessionalsDAO.addProfessional(mkProfessional)
        const user = await UsersDAO.getUserByEmail(mkProfessional.email)

        expect(success).toEqual(true)
        expect(user!.roles![0]).toBeDefined()
      } catch (error) {
        expect(error).toBeNull()
      }
    })
    it('should throw an error if there is a professional with the same id in the center', async () => {
      try {
        await ProfessionalsDAO.addProfessional(mkProfessional)
        const result = await ProfessionalsDAO.addProfessional(mkProfessional)

        expect(result).toBeNull()
      } catch (error) {
        expect(error.errors[0].message).toEqual('Ya hay un profesional con este correo electrónico')
      }
    })
    it('should add the role to the user if the email is already registered', async () => {
      try {
        await usersDAO.addUser({ email: mkProfessional.email })
        const { success } = await ProfessionalsDAO.addProfessional(mkProfessional)
        const user = await usersDAO.getUserByEmail(mkProfessional.email)

        expect(success).toBeDefined()
        expect(user!.roles![0]).toBeDefined()
      } catch (error) {
        expect(error).toBeNull()
      }
    })
  })
})