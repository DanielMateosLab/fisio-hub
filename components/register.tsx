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
    async (results): Promise<void | string> => {
      try {
        delete results.repeatPassword

        const res = await fetch('/api/register', {
          method: 'post',
          body: JSON.stringify(results)
        })

        const {error} = await res.json()
        if (error) return error
        return
      } catch (e) {
        return e.message
      }
    },
    'Registrarme'
  )

  return <>{form}</>
}

export default Register