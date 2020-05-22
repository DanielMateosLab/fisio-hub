import { Collection, Db, ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'
import { FieldValidationError, NotFoundError } from '../../common/errors'
import { Role, User } from '../../common/entityTypes'

let users: Collection<User>

export default class UsersDAO {
  static injectDB(db: Db): void {
    if (users) {
      return
    }
    users = db.collection('users')
  }

  static async getUserByEmail(email: string) {
    return await users.findOne({ email })
  }

  static async getUserById(_id: ObjectId) {
    return await users.findOne({ _id })
  }

  static async addUser(user: User): Promise<User> {
    const { email, roles } = user

    const alreadyExists = await this.getUserByEmail(email)
    if (alreadyExists) {
      const error = 'Ya hay un usuario con este correo electrónico'
      throw new FieldValidationError('email', error)
    }

    if (user.password) {
      user.password = await bcrypt.hash(user.password, 12)
    }

    const result = await users.insertOne({
      ...user,
      roles: roles ? roles : []
    })

    return result.ops[0]
  }

  static async addRole(email: string, role: Role) {
    const user = await this.getUserByEmail(email)
    if (!user) {
      throw new NotFoundError('No se ha encontrado ningún usuario con el email ' + email)
    }

    await users.updateOne({ email }, { $addToSet: { roles: role }})

    return { success: true }
  }
}