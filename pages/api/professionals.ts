import ProfessionalsDAO from "../../server/storage/professionalsDAO";
import { centerValidationSchema } from '../../common/validation'
import nextConnect from 'next-connect'
import middleware from '../../server/middlewares/middleware'
import { centers, professionals, users } from '../../server/middlewares/collections'
import onError from '../../server/middlewares/onError'
import { Professional } from '../../common/entityTypes'
import { NextApiResponse } from 'next'

export type ProfessionalsResponseData = { professional: Professional } & { professionals: Professional[] }

const handler = nextConnect({ onError })

handler.use(middleware, professionals, users, centers)

handler.post(async (req, res: NextApiResponse<ProfessionalsResponseData>, next) => {
  try {
    const validProfessional = await centerValidationSchema.validate(req.body, { abortEarly: false })
    delete validProfessional.repeatPassword

    const professional = await ProfessionalsDAO.addProfessional(validProfessional)
    req.logIn(professional, err => {
      if (err) throw err
    })

    res.status(201).json({ status: 'success', professional: '' })
  } catch (e) {
    next(e)
  }
})

export default handler