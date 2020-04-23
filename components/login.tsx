import useForm from '../utils/useForm'
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Head from "next/head"
import React from "react"

const Login = () => {
  const form = useForm(
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
    results => {
      return console.log(JSON.stringify(results))
    }
  )

  return <>{form}</>
}

export default Login