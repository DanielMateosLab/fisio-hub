export class LoginError extends Error {
  status = 400
  constructor(message = 'Contraseña o dirección de correo electrónico incorrecta') {
    super(message)

    this.message = message
  }
}


interface FieldError {
  field: string
  message: string
}
/** An error instance ready to be sent to the client as body response
 * @param{errors} - Array of errors. Can be null to pass a single error
 * with field and message params.
 * */
export class FieldValidationError {
  status = 400
  message = 'Validation Error'
  errors: FieldError[] = []

  constructor(errors: FieldError[] | null, field?: string, message?: string) {
    if (errors) {
      this.errors.push(...errors)
    }
    if (field && message) {
      this.errors.push({field, message})
    }
  }
}