import nextConnect from 'next-connect'
import middleware from '../../middlewares/middleware'
import { professionals } from '../../middlewares/collections'
import passport from 'utils/passport'
import extractUser from '../../utils/extractUser'
import onError from '../../middlewares/onError'
import { NextApiResponse } from 'next'
import { ResponseBody } from '../../utils/types'

const handler = nextConnect({ onError })

handler.use(middleware)
handler.use(professionals)

// To avoid roleSelection in passport, call the endpoint with query param avoidRoleSelection=1
handler
  .post(passport.authenticate('local'), (req, res: NextApiResponse<ResponseBody>) => {
    res.json({ status: 'success' , data: { user: extractUser(req) } })
  })
  .delete((req, res: NextApiResponse<ResponseBody>) => {
    req.logOut()
    res.status(204).json({ status: 'success', data: { user: null } })
  })

export default handler