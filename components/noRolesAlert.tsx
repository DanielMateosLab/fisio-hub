import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { useRouter } from 'next/router'

interface Props {
  open: boolean
  handleClose: () => void
}
const NoRolesAlert: React.FC<Props> = ({ open, handleClose }) => {
  const router = useRouter()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle> No hay profesionales asociados a tu usuario </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tu correo electrónico está registrado porque eres o has sido trabajador o paciente de otro centro que utiliza
          nuestra plataforma. <br/>
          ¿Por qué no comienzas a utilizar FisioHub con tu propio centro o servicio de fisioterapia?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancelar
        </Button>
        <Button onClick={() => router.push('/register')} color="primary">
          Registrarme
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default NoRolesAlert