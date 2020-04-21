import { Db, Collection } from 'mongodb'

let proffesionals: Collection

export default class ProffesionalsDAO {
  static injectDB(db: Db): void {
    if (proffesionals) {
      return
    }
    proffesionals = db.collection('proffesionals')
  }
}
