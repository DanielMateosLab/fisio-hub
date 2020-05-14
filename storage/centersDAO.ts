import { Collection, Db, ObjectId } from 'mongodb'
import { Center } from './types'

let centers: Collection<Center>

export default class CentersDAO {
  static injectDB(db: Db): void {
    if (centers) {
      return
    }
    centers = db.collection('centers')
  }

  static async getCenterById(_id: ObjectId) {
    return await centers.findOne({ _id })
  }

  static async createCenter(center: Center) {
    return await centers.insertOne(center).then(writeOpResult => writeOpResult.ops[0])
  }
}