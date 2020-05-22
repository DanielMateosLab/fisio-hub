import ProfessionalsDAO from '../storage/professionalsDAO'
import usersDAO from '../storage/usersDAO'
import centersDAO from '../storage/centersDAO'
import { RequestHandler } from '../../common/APITypes'

export const professionals: RequestHandler = (req, res, next) => {
  ProfessionalsDAO.injectDB(req.dbClient)
  next()
}

export const users: RequestHandler = (req, res, next) => {
  usersDAO.injectDB(req.db)
  next()
}

export const centers: RequestHandler = (req, res, next) => {
  centersDAO.injectDB(req.dbClient)
  next()
}