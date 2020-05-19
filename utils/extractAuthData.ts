import { NextApiRequest } from 'next'
import { WithoutPassword } from './types'
import { Professional, User } from '../storage/types'

export default (req: NextApiRequest): { user?: WithoutPassword<User>, professional?: Professional } => {
  const data = req.user
  delete data.user.password

  return data
}