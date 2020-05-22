import { MongoClient } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { DbUnavailableError } from '../../common/errors'

const client = new MongoClient(process.env.DB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  w: 'majority'
})

export default async function database(
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) {
  try {
    if (!client.isConnected()) {
      await client.connect()
    }

    req.dbClient = client
    req.db = client.db(process.env.DB_NAME)

    return next()
  } catch (err) {
    throw new DbUnavailableError(err.message)
  }
}