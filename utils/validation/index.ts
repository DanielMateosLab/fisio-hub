import * as Yup from 'yup'
import { FieldValidationErrorJSONObject } from './types'
import { FormikHelpers } from 'formik'

export const registerValidationSchema = Yup.object({
  firstName: Yup.string()
    .max(30, 'El nombre debe tener 30 o menos caracteres')
    .required('Campo obligatorio'),
  lastName: Yup.string()
    .max(30, 'Los apellidos deben tener 30 o menos caracteres')
    .required('Campo obligatorio'),
  email: Yup.string()
    .email('La dirección de correo electrónico no es válida')
    .required('Campo obligatorio'),
  password: Yup.string()
    .min(5, 'La contraseña debe tener 5 o más caracteres')
    .max(100, 'La contraseña debe tener 100 o menos caracteres')
    .required('Campo obligatorio'),
  repeatPassword: Yup.string()
    .required('Campo obligatorio')
    .test(
      'match-passwords',
      'Las contraseñas deben coincidir',
      function(value) { return value == this.parent.password })
})

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('La dirección de correo electrónico no es válida')
    .required('Campo obligatorio'),
  password: Yup.string()
    .max(100, 'La contraseña debe tener 100 o menos caracteres')
    .required('Campo obligatorio'),
})

export class ValidationErrorBody {
  message = "Validation Error"
  errors: FieldValidationErrorJSONObject[] = []

  constructor(error: Yup.ValidationError) {
    for (const fieldError of error.inner) {
      this.errors.push({
        field: fieldError.path,
        message: fieldError.message
      })
    }
  }
}
