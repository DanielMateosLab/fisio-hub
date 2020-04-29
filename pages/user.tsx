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
    <Typography variant="button">{ user.firstName }</Typography>
  )
}