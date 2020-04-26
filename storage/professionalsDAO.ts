import { Db, Collection } from 'mongodb'
import bcrypt from 'bcryptjs'
import { FieldValidationError } from '../utils/validation'

interface Professional {
  firstName: string
  lastName: string
  email: string
  password: string
}

let professionals: Collection

export default class ProfessionalsDAO {
  static injectDB(db: Db): void {
    if (professionals) {
      return
    }
    professionals = db.collection('professionals')
  }

  static async addProfessional(professional: Professional) {
    const { email } = professional
    const alreadyExists = await professionals.findOne({ email })
    if (alreadyExists) {
      const error = 'Ya hay un profesional con este correo electrónico'
      throw new FieldValidationError(null,'email', error)
    }

    const hashedPassword = await bcrypt.hash(professional.password, 12)

    const { insertedId } = await professionals
      .insertOne({ ...professional, password: hashedPassword })
    return insertedId
  }
}