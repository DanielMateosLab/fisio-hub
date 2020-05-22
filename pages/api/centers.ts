import nextConnect from "next-connect"
import onError from 'server/middlewares/onError'
import { NextApiResponse } from 'next'
import { ResponseBody } from 'common/APITypes'
import { UnauthorizedError } from 'common/errors'
import { centerValidationSchema } from 'common/validation'
import centersDAO from 'server/storage/centersDAO'
import middleware from 'server/middlewares/middleware'
import { extractAuthData } from 'server/APIUtils'

const handler = nextConnect({ onError })

handler.use(middleware)

handler.post(async (req, res: NextApiResponse<ResponseBody>, next) => {
  try {
    if (!req.user.user) next(new UnauthorizedError())

    const { centerName, ...professional } = await centerValidationSchema
      .validate(req.body, { abortEarly: false })

    const result = await centersDAO.createCenter(
      { name: centerName },
      { ...professional, email: req.user.user.email, isAdmin: true }
      )

    req.logIn({ ...req.user, ...result }, err => err && next(err))

    res.json({ status: 'success', data: extractAuthData(req) })
  } catch (e) {
    next(e)
  }
})

export default handler