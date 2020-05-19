import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import { NextApiRequest } from 'next'
import { LoginError, NotFoundError } from './errors'
import UsersDAO from '../storage/usersDAO'
import { Professional, Role, User } from '../storage/types'
import ProfessionalsDAO from '../storage/professionalsDAO'

export interface AuthData {
  user: User
  professional?: Professional
}
interface SessionData {
  email: string
  center_id?: string
}

passport.serializeUser<AuthData, SessionData>((authData, done) => {
  done(null, { email: authData.user.email, center_id: authData.professional?.center_id })
})

passport.deserializeUser<AuthData, SessionData, NextApiRequest>
(async (req, sessionData, done) => {
  const user = await UsersDAO.getUserByEmail(sessionData.email)
  const professional = sessionData.center_id && await ProfessionalsDAO
    .getProfessionalByCenterIdAndEmail(sessionData.center_id, sessionData.email)

  user
    ? done(null, { user, professional: professional || undefined })
    : done(new LoginError())
})

passport.use(new LocalStrategy(
  { usernameField: 'email', passReqToCallback: true },
  async (req, email, password, done: (error: any, authData?: AuthData) => void) => {
    try {
      const user = await UsersDAO.getUserByEmail(email)
      const isValidPassword = user && user.password && await bcrypt.compare(password, user.password)

      if (!user || !isValidPassword) return done(new LoginError())

      if (req.query.avoidRoleSelection) return done(null, { user })

      if (req.body.center_id) {
        const professional = await ProfessionalsDAO.getProfessionalByCenterIdAndEmail(req.body.center_id, user.email)

        return professional
          ? done(null, { user, professional })
          : done(new NotFoundError('El profesional seleccionado no existe.'))
      }

      // Professional is auto-selected when possible
      const center_id = getCenterIdIfSingleProfessional(user.roles)
      const professional = center_id && await ProfessionalsDAO.getProfessionalByCenterIdAndEmail(center_id, user.email)

      return done(null, {
        user,
        professional: professional || undefined
      })
    } catch (e) {
      return done(new LoginError())
    }
  }
))

function getCenterIdIfSingleProfessional(roles?: Role[]) {
  if (!roles) return null

  const professionalRoles = roles.filter(role => role.role === 'professional')

  return professionalRoles.length === 1
    ? professionalRoles[0].center_id
    : null
}

export default passport