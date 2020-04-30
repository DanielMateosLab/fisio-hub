import { useUser } from '../utils/hooks'
import Typography from '@material-ui/core/Typography'
import { useEffect } from 'react'
import Router from 'next/router'

export default () => {
  const { user } = useUser()

  useEffect(() => {
    if (!user) {
      Router.push('/')
    }
  }, [user])

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