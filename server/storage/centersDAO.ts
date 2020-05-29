import { Collection, MongoClient } from 'mongodb'
import { Center, Professional, WithoutId } from '../../common/entityTypes'
import professionalsDAO from './professionalsDAO'

let centers: Collection<Center>
let client: MongoClient

export default class CentersDAO {
  static injectDB(mongoClient: MongoClient): void {
    if (centers && client) {
      return
    }
    client = mongoClient
    centers = mongoClient.db(process.env.DB_NAME).collection('centers')
  }

  static async getCenterById(_id: string) {
    return await centers.findOne({ _id })
  }

  static async getCenterByIdAndFilterClientData(_id: string) {
    return await centers.findOne({ _id })
      .then(center => center ? { name: center.name } : null)
  }

  static async createCenter(center: WithoutId<Center>, professional: Omit<Professional, 'center_id' | '_id'>) {
    const _id = center.name + await centers.find({ name: center.name }).count() as any
    const insertedCenter = await centers.insertOne({ ...center, _id }).then(writeOpResult => writeOpResult.ops[0])

    professionalsDAO.injectDB(client)
    const insertedProfessional = await professionalsDAO
      .addProfessional({ ...professional, center_id: insertedCenter._id as any }, true)

    return { center: insertedCenter, professional: insertedProfessional }
  }
}