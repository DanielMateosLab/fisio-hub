import { FormikHelpers } from 'formik'
import { HandleResult, RequestEndpoint, ResponseBody } from './types'

export default async <T>(
  values: T,
  { setSubmitting, setFieldError }: FormikHelpers<T>,
  requestEndpoint: RequestEndpoint,
  handleResult: HandleResult
) => {
  try {
    const res = await fetch(requestEndpoint.path, {
      method: requestEndpoint.method || 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(values)
    }).catch(() => setFieldError(
      'submit',
      'Error conectando al servidor. Comprueba tu conexión y vuelve a intentarlo.')
    )

    if (!res) return setSubmitting(false)

    const unknownErrorMessage = `
      Ha ocurrido un error desconocido, vuelve a intentarlo más tarde.
      Si el error persiste contacta con los administradores y facilítales esta información: 
      ${res.status} ${res.statusText}
    `

    const body = await res.json()
      .catch(() => setFieldError('submit', unknownErrorMessage)) as ResponseBody

    if (!body) return

    if (body.status === 'fail') {
      const errors = Object.keys(body.data)
      if (!errors.length) return setFieldError('submit', unknownErrorMessage)

      return errors.forEach(field => setFieldError(field, body.data[field]))
    }

    if (body.status === 'error') return setFieldError('submit', body.message)

    handleResult(body.data)
  } catch (e) {
    setFieldError('submit', `Ha ocurrido un error desconocido, vuelve a intentarlo más tarde.
     Si el error persiste contacta con los administradores`)
  } finally {
    setSubmitting(false)
  }
}