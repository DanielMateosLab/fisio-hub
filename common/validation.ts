import * as Yup from 'yup'

const standardString = Yup.string()
  .min(3, 'Debe tener 3 o más carácteres')
  .max(30, 'Debe tener 30 o menos caracteres')
  .required('Campo obligatorio')
const email = Yup.string()
  .email('La dirección de correo electrónico no es válida')
  .required('Campo obligatorio')
const registrationPasswords = {
  password: Yup.string()
    .min(5, 'La contraseña debe tener 5 o más caracteres')
    .max(55, 'La contraseña debe tener 55 o menos caracteres')
    .required('Campo obligatorio'),
  repeatPassword: Yup.string()
    .required('Campo obligatorio')
    .test(
      'matchPasswords',
      'Las contraseñas deben coincidir',
      function(value) {
        return value === this.parent.password
      }
    )
}


export const userClientValidationSchema = Yup.object({
  email: email
    .test('usedEmail', 'Ya hay un usuario con este correo electrónico', async function(value) {
      const isEmail = await Yup.string()
        .email('La dirección de correo electrónico no es válida')
        .validate(value)
        .catch(() => false)

      if (this.parent.password || !isEmail) return true

      const emailExists = await fetch(`/api/users?email=${value}`)
        .then(res => res.ok)
        .catch(() => false)
      return !emailExists
    }),
  ...registrationPasswords
})

export const userServerValidationSchema = Yup.object({ email, ...registrationPasswords })


export const loginValidationSchema = Yup.object({
  email,
  password: Yup.string().required('Campo obligatorio'),
})

export const centerValidationSchema = Yup.object({
  firstName: standardString,
  lastName: standardString,
  centerName: standardString
})

export const roleSelectionValidationSchema = Yup.object({
  center_id: Yup.string().required('Es necesario un center_id'),
  centerName: Yup.string().required('Es necesario el nombre del centro'),
})