import nextConnect from 'next-connect'
import middleware from '../../middlewares/middleware'
import extractUser from '../../utils/extractUser'
import onError from '../../middlewares/onError'
import { users } from '../../middlewares/collections'
import UsersDAO from '../../storage/usersDAO'
import { userValidationSchema } from '../../utils/validation'
import { RequestHandler, WithoutPassword } from '../../utils/types'
import { Professional, User } from '../../storage/types'
import * as Yup from 'yup'

export type RequestUser = User & { professional?: Professional }
export type UserResponseData = { user: (WithoutPassword<RequestUser> | null) }

export const getHandler: RequestHandler = async (req, res, next) => {
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
      return res.json({ status: 'success', data: { user: extractUser(req) } })
    }
  } catch (e) {
    next(e)
  }
}

export const postHandler: RequestHandler = async (req, res, next) => {
  try {
    const validUser = await userValidationSchema.validate(req.body, { abortEarly: false })
    delete validUser.repeatPassword

    const user = await UsersDAO.addUser(validUser)

    req.logIn(user, err => err && next(err))

    res.status(201).json({ status: 'success', data: { user: extractUser(req) }})
  } catch (e) {
    next(e)
  }
}

const handler = nextConnect({ onError })

handler
  .use(middleware, users)
  .get(getHandler)
  .post(postHandler)


export default handler