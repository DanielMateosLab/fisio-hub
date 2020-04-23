import Head from 'next/head'
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useForm from "../utils/useForm";
import React from 'react'

const Register = () => {
  const form = useForm(
    {
      email: {
        type: "email",
        label: "Email"
      },
      name: {
        type: "text",
        label: "Nombre"
      },
      password: {
        type: "password",
        label: "Contraseña"
      },
      repeatPassword: {
        type: "password",
        label: "Repite la contraseña",
        validationFunction: (repeatPassword, { password }) => {
          if (repeatPassword !== password) {
            return 'Las contraseñas deben coincidir'
          }
        }
      }
    },
    async (results) => {
      delete results.repeatPassword

      const res = await fetch('/api/register', {
        method: 'post',
        body: JSON.stringify(results)
      })

      const { error } = await res.json()
      if (error) throw new Error(error)
    }
  )

  return <>{form}</>
}

export default Register