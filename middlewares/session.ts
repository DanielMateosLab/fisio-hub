import connectMongo from 'connect-mongo'
import { session, promisifyStore, Store, MemoryStore } from 'next-session'
import { NextApiRequest, NextApiResponse } from 'next'


// @ts-ignore
const MongoStore = connectMongo({ Store, MemoryStore })

export default function(req: NextApiRequest, res: NextApiResponse, next: Function) {
  const mongoStore = new MongoStore({
    client: req.dbClient,
    stringify: false
  })
  // TODO: use code and decode functions with a secret for security.
  return session({
    store: promisifyStore(mongoStore)
  })(req, res, next)
}