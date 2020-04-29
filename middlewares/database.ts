import { MongoClient } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'


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
    res.status(503).send({
      message: 'Unable to connect to the database. ' + err.message
    })
  }
}