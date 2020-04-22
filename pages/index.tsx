import React, {ChangeEvent, FormEvent, useState} from 'react'
import Head from 'next/head'
import {ProffesionalInfo} from "../utils/types";
import { Typography, TextField, Button, Container, Grid } from '@material-ui/core'

const Register = () => {
  const [ email, setEmail ] = useState('')
  const [ name, setName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget

    // TODO: implement validation
    switch (name) {
      case 'email': {
        setEmail(value)
        break
      }
      case 'name': {
        setName(value)
        break
      }
      case 'password': {
        setPassword(value)
        break
      }
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const results: ProffesionalInfo = {
      name,
      password,
      email
    }

    // TODO: use SWR Hook
    const res = await fetch('/api/register', {
      method: 'post',
      body: JSON.stringify(results)
    })

    const { error } = await res.json()
    if (error) {
      setError(error)
    }
  }

  return (
    <Container maxWidth="xs">
      <Head>
        <title>Registro</title>
      </Head>
        <Typography variant="h4" align="center" gutterBottom>
          Registro
        </Typography>
        <form onSubmit={handleSubmit} >
          <Grid container>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth={true}
                name="email"
                type="email"
                label="Email"
                margin="normal"
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth={true}
                name="name"
                label="Nombre"
                margin="normal"
                value={name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth={true}
                name="password"
                type="password"
                label="Contraseña"
                margin="normal"
                value={password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              { error &&
              <Typography variant="body1" color="error"> error </Typography>
              }
            </Grid>
            <Grid item xs={12} container justify="center">
              <Button style={{marginTop: 16}} variant="contained" type="submit" color="primary">Registrarme</Button>
            </Grid>
          </Grid>
        </form>
    </Container>
  )
}

export default Register