
export class LoginError extends Error {
  constructor(message = 'Contraseña o dirección de correo electrónico incorrecta') {
    super(message)

    this.message = message
  }
}