import { MemoryStore, promisifyStore, session, Store } from 'next-session'
import connectMongo from 'connect-mongo'
import { RequestHandler } from '../../common/APITypes'

const MongoStore = connectMongo({ Store, MemoryStore } as any)
const maxAge = process.env.SESS_MAX_AGE ? +process.env.SESS_MAX_AGE : (60 * 60 * 24) // One day

const sessionMiddleware: RequestHandler = (req, res, next) => {
  try {
    const mongoStore = new MongoStore({
      client: req.dbClient,
      stringify: false,
    })

    return session({
      store: promisifyStore(mongoStore),
      cookie: {
        maxAge
      }
    })(req, res, next)
  } catch (e) {
    next(e)
  }
}

export default sessionMiddleware