import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import { removeLogOutAlert } from '../redux/sessionSlice'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

const LogOutErrorAlert = () => {
  const { logOutError } = useSelector((state: RootState) => state.session)
  const dispatch = useDispatch()

  function handleClose() {
    dispatch(removeLogOutAlert())
  }

  return (
    <Dialog
      open={logOutError}
      onClose={handleClose}
    >
      <DialogTitle> No se ha podido cerrar sesión </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Es posible que se deba a un fallo de conexión. Vuelve a intentarlo o elimina las cookies de la pagina.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LogOutErrorAlert