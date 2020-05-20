import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import SwitchAuthFooter from './switchAuthFooter'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { ChevronRightRounded } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Role } from '../storage/types'
import { fetchPostOrPut } from '../utils/fetcher'
import { logIn } from 'features/user/userSlice'
import Collapse from '@material-ui/core/Collapse'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2)
  }
}))

const RoleSelection: React.FC = () => {
  const roles = useSelector((state: RootState) => state.user.user!.roles)
  const [ error, setError ] = useState<any>({})

  const dispatch = useDispatch()
  const { root } = useStyles()

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

  if (!roles!.length) {
    return <SwitchAuthFooter
      auxiliaryText="Parece que no hay ningún centro o servicio de fisioterapia asociado a tu usuario. "
      linkText="¡Regístrate y prueba FisioHub!"
      href="/register" />
  }

  return (
    <>
      { roles!.map((role, i) => (
        <Card key={role.center_id} variant="outlined" className={root}>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="body1" component="h2">
                { role.firstName } { role.lastName }
              </Typography>
              <Typography color="textSecondary">
                { role.centerName }
              </Typography>
            </Grid>
            <Grid item xs={4} container justify="flex-end">
              <Fab color='primary' size="medium" onClick={() => selectRole(role)}>
                <ChevronRightRounded />
              </Fab>
            </Grid>
            <Collapse in={error[role.center_id]} >
              <Typography color="error">{ error[role.center_id] }</Typography>
            </Collapse>
          </Grid>
        </Card>
      )) }
    </>
  )
}

export default RoleSelection