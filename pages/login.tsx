import React, { useEffect } from "react"
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import LoginForm from '../client/session/login/LoginForm'
import { useSelector } from 'react-redux'
import { RootState } from '../client/redux/rootReducer'
import { useRouter } from 'next/router'
import RoleSelectionModal from '../client/session/login/RoleSelectionModal'
import Link from '@material-ui/core/Link'

export default () => {
  const { professional, user } = useSelector((state: RootState) => state.session)
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

      <LoginForm />
      <Typography style={{ marginTop: "24px" }} variant="subtitle1" align="center" gutterBottom>
        ¿No tienes cuenta?
        <Link href={'/register'}> Regístrate </Link>
      </Typography>

      <RoleSelectionModal open={!!user} />
    </Container>
  )
}