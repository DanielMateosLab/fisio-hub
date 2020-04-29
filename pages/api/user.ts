import nextConnect from 'next-connect'
import middleware from '../../middlewares/middleware'
import extractUser from '../../utils/extractUser'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req,res) => {
  res.json({ professional: extractUser(req) })
})

export default handler