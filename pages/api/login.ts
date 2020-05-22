import nextConnect from 'next-connect'
import middleware from '../../server/middlewares/middleware'
import { professionals } from '../../server/middlewares/collections'
import passport from 'server/passport'
import onError from '../../server/middlewares/onError'
import { NextApiResponse } from 'next'
import { ResponseBody } from '../../common/APITypes'
import { UserResponseData } from './users'
import { ProfessionalsResponseData } from './professionals'
import professionalsDAO from '../../server/storage/professionalsDAO'
import { NotFoundError } from '../../common/errors'
import { roleSelectionValidationSchema } from '../../common/validation'
import { extractAuthData } from '../../server/APIUtils'

const handler = nextConnect({ onError })

handler.use(middleware)
handler.use(professionals)

type LoginResponse = NextApiResponse<ResponseBody<UserResponseData & ProfessionalsResponseData>>

// To avoid roleSelection in passport, call the endpoint with query param avoidRoleSelection=1
handler
  .post(passport.authenticate('local'), (req, res: LoginResponse) => {
    res.json({ status: 'success' , data: extractAuthData(req) })
  })
  .put(async (req, res: LoginResponse, next) => {
    const { center_id, centerName } = await roleSelectionValidationSchema.validate(req.body)

    const professional = await professionalsDAO
      .getProfessionalByCenterIdAndEmail(center_id, req.user.user.email)

    if (!professional) return next(new NotFoundError('No se ha encontrado el profesional seleccionado.'))

    req.logIn({ ...req.user, professional, center: { name: centerName } }, err => err && next(err))

    res.status(200).json({ status: 'success', data: extractAuthData(req) })
  })
  .delete((req, res) => {
    req.logOut()
    req.session.destroy()

    res.status(204).end()
  })

export default handler