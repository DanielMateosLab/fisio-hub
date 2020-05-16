import nextConnect from 'next-connect'
import middleware from '../../middlewares/middleware'
import extractUser from '../../utils/extractUser'
import onError from '../../middlewares/onError'
import { users } from '../../middlewares/collections'
import UsersDAO from '../../storage/usersDAO'
import { userValidationSchema } from '../../utils/validation'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = nextConnect({ onError })

handler.use(middleware, users)

handler.get((req,res) => {
  res.json({ professional: extractUser(req) })
})

export const postHandler = async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  try {
    const validUser = await userValidationSchema.validate(req.body, { abortEarly: false })
    delete validUser.repeatPassword

    const user = await UsersDAO.addUser(validUser)

    req.logIn(user, err => err && next(err))

    res.status(201).json({ user: extractUser(req) })
  } catch (e) {
    next(e)
  }
}
handler.post(postHandler)

export default handler