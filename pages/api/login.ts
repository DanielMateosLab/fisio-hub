import nextConnect from 'next-connect'
import middleware from '../../middlewares/middleware'
import { professionals } from '../../middlewares/collections'
import passport from 'utils/passport'
import extractUser from '../../utils/extractUser'
import onError from '../../middlewares/onError'

const handler = nextConnect({ onError })

handler.use(middleware)
handler.use(professionals)

handler
  .post(passport.authenticate('local'), (req, res) => {
    res.json({ professional: extractUser(req) })
  })
  .delete((req, res) => {
    req.logOut()
    res.status(204).end()
  })

export default handler