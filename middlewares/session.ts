import connectMongo from 'connect-mongo'
import { session, promisifyStore, Store, MemoryStore } from 'next-session'
import { NextApiRequest, NextApiResponse } from 'next'
import signature from 'cookie-signature'

// @ts-ignore
const MongoStore = connectMongo({ Store, MemoryStore })
const secret = process.env.SESS_SECRET!

export default function(req: NextApiRequest, res: NextApiResponse, next: Function) {
  const mongoStore = new MongoStore({
    client: req.dbClient,
    dbName: process.env.DB_NAME,
    stringify: false
  })
  return session({
    store: promisifyStore(mongoStore),
    encode: (raw: string) => signature.unsign(raw.slice(2), secret),
    decode: (sid: string) => (sid ? 's:' + signature.sign(sid, secret) : null),
  })(req, res, next)
}