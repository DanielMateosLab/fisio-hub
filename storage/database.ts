import { MongoClient } from 'mongodb'
import { CustomApiHandler, CustomApiRequest } from '../utils/types'
import { NextApiResponse } from 'next'

const client = new MongoClient(process.env.DB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const database = (handler: CustomApiHandler) => async (
  req: CustomApiRequest,
  res: NextApiResponse
) => {
  try {
    if (!client.isConnected()) {
      await client.connect()
    }

    req.db = client.db(process.env.DB_NAME)
    
    return handler(req, res)
  } catch (err) {
    res.status(503).send({
      message: 'Unable to connect to the database. ' + err.message
    })
  }
}

export default database
