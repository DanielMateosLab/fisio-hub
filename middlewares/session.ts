import connectMongo from 'connect-mongo'
import session from 'express-session'
import nextConnect from 'next-connect'
import onError from './onError'
 import { DbUnavailableError } from '../utils/errors'

const MongoStore = connectMongo(session)
let store: connectMongo.MongoStore
const secret = process.env.SESS_SECRET!
const maxAge = process.env.SESS_MAX_AGE ? +process.env.SESS_MAX_AGE : (1000 * 60 * 60 * 24) // One day

const handler = nextConnect({ onError })

handler.use((req, res, next) => {
  store = new MongoStore({ client: req.dbClient })
    .on('error', (error: Error) => {
      throw new DbUnavailableError(error.message)
    })

  next()
})

handler.use(session({
// @ts-ignore
  store,
  secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: true,
    maxAge
  }
}) as any)

export default handler