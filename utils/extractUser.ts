import { NextApiRequest } from 'next'

export default (req: NextApiRequest) => {
  if (!req.user) return false
  const { password, ...user } = req.user
  return user
}