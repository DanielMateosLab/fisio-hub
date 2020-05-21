import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import SwitchAuthFooter from './switchAuthFooter'
import { Role } from '../storage/types'
import { fetchPostOrPut } from '../utils/fetcher'
import { logIn, logOut } from 'features/user/userSlice'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import { useMediaQuery } from '@material-ui/core'
import useTheme from '@material-ui/core/styles/useTheme'

interface Props {
  open: boolean
}

const RoleSelection: React.FC<Props> = ({open}) => {
  const roles = useSelector((state: RootState) => state.user.user?.roles)
  const [ error, setError ] = useState<any>({})
  const dispatch = useDispatch()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  async function selectRole({ center_id, centerName }: Role) {
    const res = await fetchPostOrPut('/api/login',{ center_id, centerName }, 'PUT')

    if (res.status !== 'success') {
      return setError({
        ...error,
        [center_id]: (res.status === 'error') ? res.message : 'No se ha encontrado el profesional seleccionado.'
      })
    }

    dispatch(logIn(res.data))
  }

  if(!roles) return null

  if (!roles.length) {
    return <SwitchAuthFooter
      auxiliaryText="Parece que no hay ningún centro o servicio de fisioterapia asociado a tu usuario. "
      linkText="¡Regístrate y prueba FisioHub!"
      href="/register" />
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={() => dispatch(logOut())}
        fullScreen={fullScreen}
      >
        <DialogTitle>Selecciona una cuenta</DialogTitle>
        <List>
          {roles.map((role, i) => (
            <>
              <ListItem button onClick={() => selectRole(role)} key={role.center_id}>
                <ListItemText
                  primary={role.firstName + ' ' + role.lastName}
                  secondary={ error[role.center_id] ? error[role.center_id] : role.centerName }
                  secondaryTypographyProps={{color: error[role.center_id] ? 'error' : 'secondary' }}
                />
              </ListItem>
              { roles!.length !== i + 1 && <Divider variant="middle"/> }
            </>
          ))}
        </List>
      </Dialog>
    </>
  )
}

export default RoleSelection