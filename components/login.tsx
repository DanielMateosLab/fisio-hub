import React from "react"
import { Formik, Form } from 'formik'
import CustomTextInput from './CustomTextInput'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup.string().email('La dirección de correo electrónico no es válida').required('Obligatorio'),
  password: Yup.string().min(5, 'Debe tener 5 o más caracteres').required('Obligatorio')
})

const Login = () => (
  <div>
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false)
        console.log(JSON.stringify(values, null, 2))
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid container justify="center">
            <CustomTextInput name="email" label="Correo electrónico" />
            <CustomTextInput name="password" label="Contraseña" />
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
            > Iniciar sesión </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  </div>
)

export default Login