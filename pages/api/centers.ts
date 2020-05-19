import nextConnect from "next-connect"
import onError from 'middlewares/onError'
import { centers } from '../../middlewares/collections'
import { NextApiResponse } from 'next'
import { ResponseBody } from '../../utils/types'
import { UnauthorizedError } from '../../utils/errors'
import { centerValidationSchema } from '../../utils/validation'
import centersDAO from '../../storage/centersDAO'
import middleware from '../../middlewares/middleware'

const handler = nextConnect({ onError })

handler.use(middleware, centers)

handler.post(async (req, res: NextApiResponse<ResponseBody>, next) => {
  try {
    if (!req.user.user) next(new UnauthorizedError())

    const { centerName, ...professional } = await centerValidationSchema
      .validate(req.body, { abortEarly: false })

    const result = await centersDAO.createCenter(
      { name: centerName },
      { ...professional, email: req.user.user.email, isAdmin: true }
      )

    res.json({ status: 'success', data: result })
  } catch (e) {
    next(e)
  }
})

export default handler