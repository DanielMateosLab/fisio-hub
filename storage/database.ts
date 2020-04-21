import { MongoClient } from 'mongodb'
import nextConnect from 'next-connect'

const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function database(req, res, next) {
  /** TODO: 
   * Instead of passing the db to the request, just inject it to the DAOs
   * Check the env vars using static generation in one of the pages or
   * use a singleton-style and check them only once. Maybe the latter is the better.
   *  */
  try {
   if (!client.isConnected()) await client.connect()
   req.dbClient = client
   req.db = client.db(process.env.DB_NAME)

   return next() 
  } catch (err) {
    res.status(503)
  }
}

const middleware = nextConnect()

middleware.use(database)

export default middleware
