import { Db, MongoClient } from 'mongodb'
import { CustomApiRequest } from '../utils/types'
import { NextApiResponse } from 'next'

const client = new MongoClient(process.env.DB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

interface DAO {
  injectDB: (db: Db) => void
}

const database = async (
  req: CustomApiRequest,
  res: NextApiResponse,
  ...DAOs: DAO[]
) => {
  try {
    if (!client.isConnected()) {
      await client.connect()
    }

    const db = client.db(process.env.DB_NAME)
    DAOs.forEach(DAO => { DAO.injectDB(db) })
  } catch (err) {
    res.status(503).send({
      message: 'Unable to connect to the database. ' + err.message
    })
  }
}

export default database
