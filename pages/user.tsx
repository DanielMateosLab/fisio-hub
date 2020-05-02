import React, { useEffect } from 'react'
import { useUser } from '../utils/hooks'
import Typography from '@material-ui/core/Typography'
import protect from '../utils/protect'

const User = () => {
  const { user } = useUser()

  useEffect(() => {
    protect(user)
  })

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