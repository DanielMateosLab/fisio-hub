import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Grid from '@material-ui/core/Grid'
import CustomTextInput from './CustomTextInput'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


const validationSchema = Yup.object({
  firstName: Yup.string().max(30, 'Debe tener 30 o menos caracteres').required('Obligatorio'),
  lastName: Yup.string().max(30, 'Debe tener 30 o menos caracteres').required('Obligatorio'),
  email: Yup.string().email('La dirección de correo electrónico no es válida').required('Obligatorio'),
  password: Yup.string().min(5, 'Debe tener 5 o más caracteres').required('Obligatorio'),
  repeatPassword: Yup.string().required('Obligatorio')
})

const Register = () => {
  let submitError: string

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await fetch('/api/register', {
            method: 'post',
            body: JSON.stringify(values)
          })

          const { error } = await res.json()
          if (error) {
            submitError = error
          }
        } catch (e) {
          submitError = e.message
        }
        finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Grid container justify="center">
            <CustomTextInput name="firstName" label="Nombre" />
            <CustomTextInput name="lastName" label="Apellidos" />
            <CustomTextInput name="email" label="Correo electrónico" />
            <CustomTextInput name="password" type="password" label="Contraseña" />
            <CustomTextInput
              name="repeatPassword"
              label="Repite la contraseña"
              type="password"
              validate={() => {
                if (values.password !== values.repeatPassword) {
                  return 'Las contraseñas deben coincidir'
                }
              }}
            />
            { submitError && (
              <Grid item style={{ marginTop: 18 }} container justify="center" xs={12}>
                <Typography color="error" variant="h6">{submitError}</Typography>
              </Grid>
            )}
            <Grid item style={{ marginTop: 18 }} container justify="center" xs={12}>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                color="primary"
              > Registrarme </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default Register