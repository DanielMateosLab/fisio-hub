import nextConnect from 'next-connect'
import middleware from '../../middlewares/middleware'
import { professionals } from '../../middlewares/collections'
import passport from 'utils/passport'
import onError from '../../middlewares/onError'
import { NextApiResponse } from 'next'
import { ResponseBody } from '../../utils/types'
import { UserResponseData } from './users'
import { ProfessionalsResponseData } from './professionals'
import extractAuthData from '../../utils/extractAuthData'
import professionalsDAO from '../../storage/professionalsDAO'
import { NotFoundError } from '../../utils/errors'
import { roleSelectionValidationSchema } from '../../utils/validation'

const handler = nextConnect({ onError })

handler.use(middleware)
handler.use(professionals)

type LoginResponse = NextApiResponse<ResponseBody<UserResponseData & ProfessionalsResponseData>>

// To avoid roleSelection in passport, call the endpoint with query param avoidRoleSelection=1
handler
  .post(passport.authenticate('local'), (req, res: LoginResponse, next) => {
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
  .delete((req, res: LoginResponse, next) => {
    req.logOut()
    req.session.destroy()

    res.status(204).json({ status: 'success', data: { user: null } })
  })

export default handler