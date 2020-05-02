import connectMongo from 'connect-mongo'
import session from 'express-session'
import nextConnect from 'next-connect'
import onError from './onError'

const MongoStore = connectMongo(session)

const store = new MongoStore({
  url: process.env.DB_URI!
})
const secret = process.env.SESS_SECRET!
const maxAge = process.env.SESS_MAX_AGE ? +process.env.SESS_MAX_AGE : (1000 * 60 * 60 * 24)

const handler = nextConnect({ onError })
handler.use(session({
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