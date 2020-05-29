import nextConnect from 'next-connect'
import middleware from '../../server/middlewares/middleware'
import onError from '../../server/middlewares/onError'
import UsersDAO from '../../server/storage/usersDAO'
import { userServerValidationSchema } from '../../common/validation'
import { RequestHandler, ResponseBody } from '../../common/APITypes'
import { User, WithoutPassword } from '../../common/entityTypes'
import * as Yup from 'yup'
import { NextApiResponse } from 'next'
import { ForbiddenError } from '../../common/errors'
import { extractAuthData } from 'server/APIUtils'

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
      if (user) delete user.password

      return user
        ? res.json({ status: 'success', data: { user } })
        : res.status(404).end()
    }

    if (authenticated) {
      return req.isAuthenticated()
        ? res.json({ status: 'success', data: extractAuthData(req) })
        : res.status(401).json({ status: 'fail', data: { session: "No hay una sesión activa" } })
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

    const user = await UsersDAO.addUser({ ...validUser, roles: [] })

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