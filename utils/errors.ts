
export class LoginError {
  status = 401
  message = 'Contraseña o dirección de correo electrónico incorrecta'

  constructor() {}
}

export class ServiceUnavailableError {
  status = 503
  message = 'El servidor no puede resolver la solicitud en este momento'

  constructor(message?: string) {
    if (message) {
      this.message = message
    }
  }
}

export class DbUnavailableError extends ServiceUnavailableError {
  constructor(message?: string) {
    super(message)

    this.message = 'No se ha podido acceder a la base de datos. ' + message
  }
}

export interface FieldError {
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