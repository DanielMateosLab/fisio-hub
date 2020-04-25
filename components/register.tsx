import React from 'react'
import { Formik, Form } from 'formik'
import Grid from '@material-ui/core/Grid'
import CustomTextInput from './CustomTextInput'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { registerValidationSchema, ValidationErrorBody } from '../utils/validation'


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
      validationSchema={registerValidationSchema}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        try {
          const res = await fetch('/api/register', {
            method: 'post',
            body: JSON.stringify(values)
          })
          if (res.status == 400) {
            const { errors }: ValidationErrorBody = await res.json()
            for (const fieldError of errors) {
              const { field, message } = fieldError
              setFieldError(field, message)
            }
            return
          }
          if (!res.ok) {
            const { message } = await res.json()
            submitError = message
          }
        } catch (e) {
          submitError = e.message
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting }) => (
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