import nextConnect from 'next-connect'
import middleware from '../../middlewares/middleware'
import { professionals } from '../../middlewares/collections'
import passport from 'utils/passport'
import onError from '../../middlewares/onError'
import { NextApiResponse } from 'next'
import { ResponseBody } from '../../utils/types'
import { UserResponseData } from './users'
import { ProfessionalsResponseData } from './professionals'
import extractAuthData from '../../utils/extractAuthData'

const handler = nextConnect({ onError })

handler.use(middleware)
handler.use(professionals)

type LoginResponse = NextApiResponse<ResponseBody<UserResponseData & ProfessionalsResponseData>>

// To avoid roleSelection in passport, call the endpoint with query param avoidRoleSelection=1
handler
  .post(passport.authenticate('local'), (req, res: LoginResponse) => {
    res.json({ status: 'success' , data: extractAuthData(req) })
  })
  .delete((req, res: LoginResponse) => {
    req.logOut()
    req.session.destroy()
    res.status(204).json({ status: 'success', data: { user: null } })
  })

export default handler