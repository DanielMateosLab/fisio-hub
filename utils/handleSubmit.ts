import { FormikHelpers } from 'formik'
import { FieldValidationError } from './errors'
import { HandleResult } from './types'


export default async <T>(
  values: T,
  { setSubmitting, setFieldError }: FormikHelpers<T>,
  setSubmitError: Function,
  path: string,
  handleResult: HandleResult
) => {
  setSubmitError('')
  try {
    const res = await fetch(path, {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(values)
    })

    res.json()
      .then(body => {
        if (!res.ok) {
          const { errors, message } = body as FieldValidationError
          if (message == 'Validation Error' && errors && errors.length) {
            return errors.forEach(({ field, message }) => setFieldError(field, message))
          }
          return setSubmitError(message)
        }
        handleResult(body)
      })
      .catch(() => {
        return setSubmitError(`
            Ha ocurrido un error. 
            Vuelve a intentarlo más tarde.
            Si el error persiste contacta con los administradores y facilítales esta información: 
            ${res.status} ${res.statusText}`)
      })
  } catch (e) {
    setSubmitError('Error conectando al servidor. Comprueba tu conexión y vuelve a intentarlo.')
  } finally {
    setSubmitting(false)
  }
}