import { Collection, MongoClient, ObjectId } from 'mongodb'
import { FieldValidationError } from '../../common/errors'
import { Center, Professional, Role, User } from '../../common/entityTypes'

let client: MongoClient
let professionals: Collection<Professional>

export default class ProfessionalsDAO {
  static injectDB(mongoClient: MongoClient): void {
    if (client && professionals) {
      return
    }
    client = mongoClient
    professionals = mongoClient.db(process.env.DB_NAME).collection('professionals')
  }

  /** Finds by center_id and email. Index-supported query. */
  static async getProfessionalByCenterIdAndEmail(center_id: string, email: string) {
    return await professionals.findOne({ center_id, email })
  }

  static async getProfessionalsByCenterId(center_id: string) {
    return professionals.find({ center_id })
  }

  /**
   * Creates a professional.
   * - Looks for a user with the given email, if it does not exist, it creates it.
   * - Adds the created professional to the user roles.
   */
  static async addProfessional(professional: Professional, newCenter = false) {
    const centers = client.db(process.env.DB_NAME).collection<Center>('centers')
    const users = client.db(process.env.DB_NAME).collection<User>('users')

    const { center_id, email } = professional
    professional._id = new ObjectId()

    const alreadyExists = !newCenter && await this.getProfessionalByCenterIdAndEmail(center_id, email)
    if (alreadyExists) {
      throw new FieldValidationError('email', 'Ya hay un profesional con este correo electrónico')
    }

    const role: Role = {
      role: 'professional',
      role_id: professional._id,
      firstName: professional.firstName,
      lastName: professional.lastName,
      center_id,
      centerName: await centers.aggregate([
        { $match: { _id: center_id } },
        { $project: { _id: 0, name: 1 } }
      ]).toArray().then(result => result[0].name)
    }

    const user = await users.findOne({ email })
    if (!user) {
      await users.insertOne({ email, roles: [] })
      // TODO: send password-creation email
    }

    let insertedProfessional: Professional

    const session = client.startSession()
    const transactionResult = await session.withTransaction(async () => {
      insertedProfessional = await professionals.insertOne(professional, { session }).then(r => r.ops[0])

      await users.updateOne(
        { email },
        { $addToSet: { roles: role }},
        { session })
    }) as any
    session.endSession()

    // The transaction result is not correctly typed.
    // Also TS is not asserting that insertedProfessional would be initialized at this point.
    // @ts-ignore
    return insertedProfessional as Professional
  }
}