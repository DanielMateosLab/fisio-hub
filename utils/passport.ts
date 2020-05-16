import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import { Professional, User } from '../storage/types'
import { NextApiRequest } from 'next'
import { LoginError } from './errors'
import UsersDAO from '../storage/usersDAO'
import ProfessionalsDAO from '../storage/professionalsDAO'

interface UserSessionInfo {
  email: string
  center_id?: string
}

export type RequestUser = User & { professional?: Professional }

passport.serializeUser<RequestUser, UserSessionInfo>((user, done) => {
  done(null, {
    email: user.email,
    center_id: user.professional?.center_id
    })
})

passport.deserializeUser<RequestUser, UserSessionInfo, NextApiRequest>(async (
  req,
  { email, center_id },
  done
) => {
  UsersDAO.injectDB(req.db)
  ProfessionalsDAO.injectDB(req.dbClient)

  const user = await UsersDAO.getUserByEmail(email)
  const professional = user && center_id &&
    await ProfessionalsDAO.getProfessionalByCenterIdAndEmail(center_id, email)

  user && done(null, {
    ...user,
    professional: professional || undefined
  })
})

passport.use(new LocalStrategy(
  { usernameField: 'email', passReqToCallback: true },
  async (req, email, password, done: (error: any, user?: RequestUser) => void) => {
    try {
      UsersDAO.injectDB(req.db)
      const user = await UsersDAO.getUserByEmail(email)
      const isValidPassword = user && user.password && await bcrypt.compare(password, user.password)

      if (isValidPassword) {
        const professionalRoles = user?.roles?.filter(({ role }) => role == 'professional')
        const uniqueProfessionalRole = professionalRoles && professionalRoles.length == 1 && professionalRoles[0]
        const professional = uniqueProfessionalRole && await ProfessionalsDAO
          .getProfessionalByCenterIdAndEmail(uniqueProfessionalRole.center_id, user!.email)

        user && done(null, {
          ...user,
          professional: !req.query.avoidRoleSelection && professional || undefined
        })
      } else {
        done(new LoginError())
      }
    } catch (e) {
      done(new LoginError())
    }
  }
))

export default passport