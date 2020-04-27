import * as Yup from 'yup'
import { FieldValidationError } from './errors'

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
    .max(55, 'La contraseña debe tener 55 o menos caracteres')
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
    .required('Campo obligatorio'),
})

/** - Takes a Yup ValidationError and returns a FieldValidationError instance
 * ready to be sent to the client.
 * - If the error is not a Yup.ValidationError instance it is returned with no changes  */
export function parseYupValidationErrors(error: Yup.ValidationError) {
  // Yup validation errors have an inner property used here to distinguish them from other errors.
  if (!error.inner) {
    return error
  }
  // Note how property path is renamed to field
  const errors = error.inner.map(({path, message}) => ({field: path, message}))
  return new FieldValidationError(errors)
}