import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import { logOut } from 'features/user/userSlice'
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  main: {
    flex: '1',
    justifyContent: 'space-evenly'
  }
})

const Navbar = () => {
  const { user, center } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const { main } = useStyles()
  const { pathname, push } = useRouter()


  const handleLogout = async () => {
    await fetch('/api/login', {
      method: 'DELETE'
    })
    dispatch(logOut())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6"> { center && center.name || 'FisioHub' } </Typography>
        <div className={main} />
        { user && pathname !== '/register' &&
          <Button onClick={handleLogout} variant="text" color="inherit">Cerrar sesión</Button>
        }
        { !user && pathname !== '/login' &&
          <Button onClick={() => push('/login')} variant="text" color="inherit">Iniciar sesión</Button>
        }
        { !user && pathname !== '/register' &&
          <Button onClick={() => push('/register')} variant="text" color="inherit">Registrarme</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar