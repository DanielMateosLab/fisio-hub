import { Collection, MongoClient, ObjectId } from 'mongodb'
import { FieldValidationError } from '../utils/errors'
import { Professional, Role, User } from './types'

let client: MongoClient
let professionals: Collection<Professional>
let users: Collection<User>

export default class ProfessionalsDAO {
  static injectDB(mongoClient: MongoClient): void {
    if (client && professionals && users) {
      return
    }
    const db = mongoClient.db(process.env.DB_NAME)
    client = mongoClient
    professionals = db.collection('professionals')
    users = db.collection('users')
  }

  /** Finds by center_id and email. Index-supported query. */
  static async getProfessionalByCenterIdAndEmail(center_id: string, email: string) {
    return await professionals.findOne({ center_id, email })
  }
  static async getProfessionalByCenterId(center_id: string) {
    return await professionals.findOne({ center_id })
  }
  static async getProfessionalById(_id: ObjectId) {
    return await professionals.findOne({ _id })
  }

  static getUserProfessionals(user: User) {
    if (!user.roles) return []

    return user.roles.map(async (profile) => {
      const { role, role_id, center_id } = profile
      if (role !== 'professional') return

      const { email } = await this.getProfessionalById(role_id) as any
      if (!email) return

      return {
        center_id,
        email
      }
    })
  }

  static async addProfessional(professional: Professional): Promise<{ success: true }> {
    const { center_id, email } = professional
    professional._id = new ObjectId()

    const alreadyExists = await this.getProfessionalByCenterIdAndEmail(center_id, email)
    if (alreadyExists) {
      throw new FieldValidationError(null,'email', 'Ya hay un profesional con este correo electrónico')
    }

    const role: Role = {
      role: 'professional',
      role_id: professional._id,
      center_id
    }

    const user = await users.findOne({ email })
    if (!user) {
      await users.insertOne({ email })
      // TODO: send password-creation email
    }

    const session = client.startSession()
    const transactionResult = await session.withTransaction(async () => {
      await professionals.insertOne(professional, { session }).then(r => r.ops[0])

      await users.updateOne(
        { email },
        { $addToSet: { roles: role }},
        { session })
    }) as any
    session.endSession()

    return transactionResult && { success: true }
  }
}