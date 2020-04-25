import React, { useState } from "react"
import { Formik, Form } from 'formik'
import CustomTextInput from './CustomTextInput'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { loginValidationSchema } from '../utils/validation'
import handleSubmit from '../utils/handleSubmit'


const Login = () => {
  let [submitError, setSubmitError] = useState('')

  return(
    <div>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, formikHelpers) => {
          await handleSubmit(values, formikHelpers, '/api/login', setSubmitError)
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