import nextConnect from 'next-connect'
import database from './database'
import session from './session'
import passport from '../utils/passport'
import morgan from 'morgan'
import onError from './onError'

const middleware = nextConnect({ onError })

if(process.env.NODE_ENV !== 'production') {
  middleware.use(morgan('tiny'))
}

middleware
  .use(database)
  .use(session)
// @ts-ignore
  .use(passport.initialize())
  .use(passport.session())


export default middleware