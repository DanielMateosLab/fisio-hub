import { Professional } from '../storage/professionalsDAO'
import Router from 'next/router'

type ProtectionStrategy = 'ensureAuthenticated' | 'ensureNotAuthenticated'
interface Protect {
  (user: Professional | undefined, strategy?: ProtectionStrategy): void
}

const protect: Protect = (user) => {
  // Reached when swr is fetching, it is strict equality
  if (user === undefined) {
    return
  }
  // Reached once a response is received with no user and useUser returns null
  if (user === null) {
    Router.push('/login')
  }
}

export default protect