import nextConnect from 'next-connect'
import middleware from '../../middlewares/middleware'
import onError from '../../middlewares/onError'
import UsersDAO from '../../storage/usersDAO'
import { userServerValidationSchema } from '../../utils/validation'
import { RequestHandler, ResponseBody, WithoutPassword } from '../../utils/types'
import { User } from '../../storage/types'
import * as Yup from 'yup'
import { NextApiResponse } from 'next'
import extractAuthData from '../../utils/extractAuthData'
import { ForbiddenError } from '../../utils/errors'

export type UserResponseData = { user: (WithoutPassword<User> | null) }
type UserResponse = NextApiResponse<ResponseBody<UserResponseData>>

export const getHandler: RequestHandler = async (req, res: UserResponse, next) => {
  try {
    const { email, authenticated } = req.query

    if (email) {
      const validEmail = await Yup.string()
        .email('La dirección de correo electrónico no es válida')
        .validate(email)
        .catch(e => res.status(400).json({ status: 'fail', data: { email: e.message } }))

      const user = validEmail && await UsersDAO.getUserByEmail(validEmail)
      return res.json({ status: 'success', data: { user: user ? { email: user.email } : null } })
    }

    if (authenticated) {
      return res.json({ status: 'success', data: extractAuthData(req) })
    }
  } catch (e) {
    next(e)
  }
}

export const postHandler: RequestHandler = async (req, res: UserResponse, next) => {
  try {
    if (req.isAuthenticated()) next(new ForbiddenError('Acción denegada. Cierra sesión o borra las cookies'))

    const validUser = await userServerValidationSchema.validate(req.body, { abortEarly: false })
    delete validUser.repeatPassword

    const user = await UsersDAO.addUser(validUser)

    req.logIn({ user }, err => err && next(err))

    res.status(201).json({ status: 'success', data: extractAuthData(req)})
  } catch (e) {
    next(e)
  }
}

const handler = nextConnect({ onError })

handler
  .use(middleware)
  .get(getHandler)
  .post(postHandler)


export default handler