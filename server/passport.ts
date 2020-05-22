import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import { NextApiRequest } from 'next'
import { LoginError, NotFoundError } from '../common/errors'
import UsersDAO from './storage/usersDAO'
import { Center, Professional, Role, User } from '../common/entityTypes'
import ProfessionalsDAO from './storage/professionalsDAO'
import CentersDAO from './storage/centersDAO'

export interface AuthData {
  user: User
  professional?: Professional
  center?: Pick<Center, 'name'>
}
interface SessionData {
  email: string
  center_id?: string
}

// This is called with the user passed in logIn or in the auth method callback
passport.serializeUser<AuthData, SessionData>((authData, done) => {
  done(null, { email: authData.user.email, center_id: authData.professional?.center_id })
})

passport.deserializeUser<AuthData, SessionData, NextApiRequest>
(async (req, sessionData, done) => {
  try {
    const user = await UsersDAO.getUserByEmail(sessionData.email)

    const professional = sessionData.center_id && await ProfessionalsDAO
      .getProfessionalByCenterIdAndEmail(sessionData.center_id, sessionData.email)

    const center = professional && await CentersDAO.getCenterByIdAndFilterClientData(professional.center_id)

    if (user) return done(null, {
      user,
      professional: professional || undefined,
      center: center || undefined
    })
  } catch (e) {
    return done(new NotFoundError('Borra las cookies del navegador y vuelve a intentarlo'))
  }
})

passport.use(new LocalStrategy(
  { usernameField: 'email', passReqToCallback: true },
  async (req, email, password, done: (error: any, authData?: AuthData) => void) => {
    try {
      const user = await UsersDAO.getUserByEmail(email)
      const isValidPassword = user && user.password && await bcrypt.compare(password, user.password)

      if (!user || !isValidPassword) return done(new LoginError())

      if (req.query.avoidRoleSelection) return done(null, { user })

      // Return selected professional
      if (req.body.center_id) {
        const professional = await ProfessionalsDAO.getProfessionalByCenterIdAndEmail(req.body.center_id, user.email)
        const center = professional && await CentersDAO.getCenterByIdAndFilterClientData(professional.center_id)

        return professional && center
          ? done(null, { user, professional, center })
          : done(new NotFoundError('El profesional seleccionado no existe.'))
      }

      // Professional is auto-selected when possible
      const center_id = getCenterIdIfSingleProfessional(user.roles)
      const professional = center_id && await ProfessionalsDAO.getProfessionalByCenterIdAndEmail(center_id, user.email)
      const center = center_id && await CentersDAO.getCenterByIdAndFilterClientData(center_id)

      return done(null, {
        user,
        professional: professional || undefined,
        center: center || undefined
      })
    } catch (e) {
      return done(new LoginError())
    }
  }
))

function filterProfessionalRoles(roles?: Role[]) {
  if (!roles) return null

  return roles.filter(role => role.role === 'professional')
}

function getCenterIdIfSingleProfessional(roles?: Role[]) {
  if (!roles) return null

  const professionalRoles = filterProfessionalRoles(roles)

  return professionalRoles && professionalRoles.length === 1
    ? professionalRoles[0].center_id
    : null
}

export default passport