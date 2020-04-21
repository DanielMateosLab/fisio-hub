import { Db, Collection } from 'mongodb'
import { ProffesionalInfo } from '../utils/types'

let proffesionals: Collection

export default class ProffesionalsDAO {
  static injectDB(db: Db): void {
    if (proffesionals) {
      return
    }
    proffesionals = db.collection('proffesionals')
  }

  static async addProffesional(proffesionalInfo: ProffesionalInfo) {
    try {
      await proffesionals.insertOne({})
    } catch (error) {
      
    }
  }
}
