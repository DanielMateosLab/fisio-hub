import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { logOut } from '../redux/sessionSlice'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  separator: {
    flex: '1',
  }
})

const ToolbarContent: React.FC = () => {
  const { separator } = useStyles()

  const { user, center } = useSelector((state: RootState) => state.session)
  const dispatch = useDispatch()
  const { pathname, push } = useRouter()

  return (
    <>
      <Typography variant="h6"> {center && center.name || 'FisioHub'} </Typography>

      <div className={separator}/>

      {user && pathname !== '/register' &&
      <Button onClick={() => dispatch(logOut())} variant="text" color="inherit">Cerrar sesión</Button>
      }
      {!user && pathname !== '/login' &&
      <Button onClick={() => push('/login')} variant="text" color="inherit">Iniciar sesión</Button>
      }
      {!user && pathname !== '/register' &&
      <Button onClick={() => push('/register')} variant="text" color="inherit">Registrarme</Button>
      }
    </>
  )
}

export default ToolbarContent