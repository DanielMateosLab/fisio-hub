import useForm from '../utils/useForm'
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
        label: "Contraseña"
      },
    },
    async results => {
      return console.log(JSON.stringify(results))
    },
    'Iniciar sesión'
  )

  return <>{form}</>
}

export default Login