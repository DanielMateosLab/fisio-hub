import React, { useState } from 'react'
import Login from '../components/login'
import Register from '../components/register'
import Container from '@material-ui/core/Container'
import Head from 'next/head'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

export default () => {
  const [ index, setIndex ] = useState(0)
  const titles = ['Inicia sesión', 'Regístrate']

  const switchPage = () => {
    const newIndex = index == 0 ? 1 : 0
    setIndex(newIndex)
  }

  return (
    <Container maxWidth="xs">
      <Head>
        <title>{ titles[index] }</title>
      </Head>

      <Typography style={{ marginTop: "18px" }} variant="h4" align="center" gutterBottom>
        { titles[index] }
      </Typography>

      { index == 0 ? <Login /> : <Register />}

      <Typography style={{ marginTop: "24px" }} variant="subtitle1" align="center" gutterBottom>
        { index == 0
          ? '¿No tienes cuenta? '
          : '¿Ya estás registrado? '
        }
        <Link href="#" onClick={switchPage}>
          { index ==  0 ? titles[1] : titles[0] }
        </Link>
      </Typography>
    </Container>
  )
}