import React from "react"
import { Formik, Form } from 'formik'
import CustomTextInput from './CustomTextInput'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { loginValidationSchema } from '../utils/validation'


const Login = () => {
  let submitError: string

  return(
    <div>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, {setSubmitting}) => {
          try {
            const res = await fetch('/api/login', {
              method: 'post',
              body: JSON.stringify(values)
            })

            const {error} = await res.json()
            if (error) {
              submitError = error
            }
          } catch (e) {
            submitError = e.message
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <Grid container justify="center">
              <CustomTextInput name="email" label="Correo electrónico"/>
              <CustomTextInput name="password" type="password" label="Contraseña"/>
              {submitError && (
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
                > Iniciar sesión </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  )
}
export default Login