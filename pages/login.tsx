import React, { useEffect } from "react"
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import SwitchAuthFooter from 'components/switchAuthFooter'
import Login from '../components/login'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import { useRouter } from 'next/router'

export default () => {
  const { professional } = useSelector((state: RootState) => state.user)
  const router = useRouter()

  useEffect(() => {
    professional && router.push('/user')
  }, [professional])

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Inicia sesión
      </Typography>
      <Login />
      <SwitchAuthFooter auxiliaryText="¿No tienes cuenta? " linkText="Regístrate" href="/register" />
    </Container>
  )
}