import useForm from '../utils/useForm'
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import Head from "next/head";
import React from "react";

const Login = () => {
  const { inputs, form } = useForm(
    {
      email: {
        type: "email",
        label: "Email"
      },
      password: {
        type: "password",
        label: "Password"
      },
    },
    async () => {
      return console.log(JSON.stringify(inputs))
    }
  )

  return (
    <Container maxWidth="xs">
      <Head>
        <title>Iniciar sesión</title>
      </Head>
      <Typography variant="h4" align="center" gutterBottom>
        Iniciar sesión
      </Typography>
      { form }
    </Container>
  )
}

export default Login