import Router from 'next/router'
import { useUser } from './hooks'


const useEnsureAuthenticated = () => {
  const { user } = useUser()
  // Reached when swr is fetching, it is strict equality
  if (user === undefined) {
    return
  }
  // Reached once a response is received with no user and useUser returns null
  if (user === null) {
    Router.push('/login')
  }
}

export default useEnsureAuthenticated