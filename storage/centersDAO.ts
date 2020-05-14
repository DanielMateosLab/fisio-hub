import { Collection, Db } from 'mongodb'
import { Center } from './types'

let centers: Collection<Center>

export default class CentersDAO {
  static injectDB(db: Db): void {
    if (centers) {
      return
    }
    centers = db.collection('centers')
  }

  static async getCenterById(_id: string) {
    return await centers.findOne({ _id })
  }

  static async createCenter(center: Center) {
    const _id = center.name + await centers.find({ name: center.name }).count() as any
    return await centers.insertOne({ ...center, _id }).then(writeOpResult => writeOpResult.ops[0])
  }
}