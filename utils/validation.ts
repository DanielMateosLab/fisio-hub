import * as Yup from 'yup'

export const registerValidationSchema = Yup.object({
  firstName: Yup.string().max(30, 'Debe tener 30 o menos caracteres').required('Obligatorio'),
  lastName: Yup.string().max(30, 'Debe tener 30 o menos caracteres').required('Obligatorio'),
  email: Yup.string().email('La dirección de correo electrónico no es válida').required('Obligatorio'),
  password: Yup
    .string()
    .min(5, 'Debe tener 5 o más caracteres')
    .max(100, 'Debe tener 100 o menos caracteres')
    .required('Obligatorio'),
  repeatPassword: Yup
    .string()
    .required('Obligatorio')
    .test(
      'match-passwords',
      'Las contraseñas deben coincidir',
      function(value) { return value == this.parent.password })
})

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('La dirección de correo electrónico no es válida').required('Obligatorio'),
  password: Yup.string()
    .min(5, 'Debe tener 5 o más caracteres')
    .required('Obligatorio')
    .max(100, 'Debe tener 100 o menos caracteres')
})
