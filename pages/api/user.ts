import nextConnect from 'next-connect'
import middleware from '../../middlewares/middleware'
import extractUser from '../../utils/extractUser'
import onError from '../../middlewares/onError'

const handler = nextConnect({ onError })

handler.use(middleware)

handler.get(async (req,res) => {
  res.json({ professional: extractUser(req) })
})

export default handler