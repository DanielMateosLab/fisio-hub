import { Middleware } from '../utils/types'
import ProfessionalsDAO from '../storage/professionalsDAO'

export const professionals: Middleware = (req, res, next) => {
  ProfessionalsDAO.injectDB(req.db)
  next()
}
