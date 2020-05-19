import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import { useRouter } from 'next/router'

const User = () => {
  const { professional } = useSelector((state: RootState) => state.user)
  const router = useRouter()

  useEffect(() => {
    !professional && router.push('/login')
  }, [professional])

  if (!professional) return null

  return (
    <>
      <Typography variant="h4" gutterBottom>{ professional.firstName } { professional.lastName }</Typography>
      <Typography variant="body1">
        Dirección de correo electrónico: { professional.email }
      </Typography>
    </>
  )
}

export default User