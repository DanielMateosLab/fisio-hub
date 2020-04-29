import { NextApiRequest } from 'next'

export default (req: NextApiRequest) => {
  if (!req.user) return null
  const { password, ...user } = req.user
  return user
}