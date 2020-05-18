import ProfessionalsDAO from "../../storage/professionalsDAO";
import { centerValidationSchema } from '../../utils/validation'
import nextConnect from 'next-connect'
import middleware from '../../middlewares/middleware'
import { centers, professionals, users } from '../../middlewares/collections'
import extractUser from '../../utils/extractUser'
import onError from '../../middlewares/onError'

const handler = nextConnect({ onError })

handler.use(middleware, professionals, users, centers)

handler.post(async (req, res, next) => {
  try {
    const validProfessional = await centerValidationSchema.validate(req.body, { abortEarly: false })
    delete validProfessional.repeatPassword

    const professional = await ProfessionalsDAO.addProfessional(validProfessional)
    req.logIn(professional, err => {
      if (err) throw err
    })

    res.status(201).json({ professional: extractUser(req) })
  } catch (e) {
    next(e)
  }
})

export default handler