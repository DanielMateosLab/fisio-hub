import React from 'react'
import { useUser } from '../utils/hooks'
import Typography from '@material-ui/core/Typography'
import useEnsureAuthenticated from '../utils/useEnsureAuthenticated'

const User = () => {
  const { user } = useUser()
  useEnsureAuthenticated()

  if (!user) return null

  return (
    <>
      <Typography variant="h4" gutterBottom>{ user.firstName } { user.lastName }</Typography>
      <Typography variant="body1">
        Dirección de correo electrónico: { user.email }
      </Typography>
    </>
  )
}

export default User