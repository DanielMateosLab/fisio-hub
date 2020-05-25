import Container from '@material-ui/core/Container'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getUser } from '../redux/sessionSlice'
import { AppDispatch } from '../redux/store'
import Navbar from 'client/navbar/Navbar'
import Cookies from 'js-cookie'
import LogOutErrorAlert from './LogOutErrorAlert'
import { useRouter } from 'next/router'

const UserFetcher: React.FC = ({ children }) => {
  const [ userRequested, setUserRequested ] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const sessionPresent = Cookies.get('ss')
      const done = sessionPresent ? await dispatch(getUser()) : true
      setUserRequested(done)
    })()
  }, [])

  return (
    <>
      <Navbar userRequested={userRequested} />
      { router.pathname === '/schedule'
        ? userRequested && children
        : (
          <Container style={{ paddingTop: "24px", paddingBottom: "24px"}}>
            { userRequested &&  children }
          </Container>
        )
      }
      <LogOutErrorAlert />
    </>
  )
}

export default  UserFetcher