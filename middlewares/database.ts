import { MongoClient } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { ServiceUnavailableError } from '../utils/errors'

const client = new MongoClient(process.env.DB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
    const additionalInfo = err.message ? err.message : ''
    const message = 'No se ha podido acceder a la base de datos. ' + additionalInfo
    throw new ServiceUnavailableError(message)
  }
}