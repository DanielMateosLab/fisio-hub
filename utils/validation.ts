import * as Yup from 'yup'

export const centerValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, 'El nombre debe tener 3 o más carácteres')
    .max(30, 'El nombre debe tener 30 o menos caracteres')
    .required('Campo obligatorio'),
  lastName: Yup.string()
    .min(3, 'Los apellidos deben tener 3 o más carácteres')
    .max(30, 'Los apellidos deben tener 30 o menos caracteres')
    .required('Campo obligatorio'),
  centerName: Yup.string()
    .min(3, 'Debe tener 3 o más carácteres')
    .max(30, 'Debe tener 30 o menos caracteres')
    .required('Campo obligatorio')
})

export const userValidationSchema = Yup.object({
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
      function(value) {
        if (value === this.parent.password) return value
        throw Error()
      }
    )
})

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('La dirección de correo electrónico no es válida')
    .required('Campo obligatorio'),
  password: Yup.string()
    .required('Campo obligatorio'),
})