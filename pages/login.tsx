import React, { useEffect } from "react"
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import SwitchAuthFooter from 'components/switchAuthFooter'
import Login from '../components/login'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import { useRouter } from 'next/router'
import RoleSelection from '../components/roleSelection'

const UserAuthentication = () => (
  <>
    <Login />
    <SwitchAuthFooter auxiliaryText="¿No tienes cuenta? " linkText="Regístrate" href="/register" />
  </>
)

export default () => {
  const { professional, user } = useSelector((state: RootState) => state.user)
  const router = useRouter()

  useEffect(() => {
    professional && router.push('/user')
  }, [professional])

  // Avoids component load when an authenticated professional is fetched on page load
  if (professional) return null

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Inicia sesión
      </Typography>

      { user ? <RoleSelection /> : <UserAuthentication /> }
    </Container>
  )
}