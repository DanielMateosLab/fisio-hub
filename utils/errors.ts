
export class UnauthorizedError {
  status = 401
  message = 'Es necesario iniciar sesión'
  
  constructor() {}
}

export class LoginError extends UnauthorizedError {
  message = 'Contraseña o dirección de correo electrónico incorrecta'
}


export class NotFoundError {
  status = 404
  message = 'No se ha encontrado el recurso solicitado'

  constructor(message?: string) {
    if (message) {
      this.message = message
    }
  }
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

export class FieldValidationError {
  status = 400
  name = 'ValidationError'
  path = ''
  message = ''

  constructor(path: string, message: string) {
    this.path = path
    this.message = message
  }
}