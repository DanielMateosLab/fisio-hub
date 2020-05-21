import Container from '@material-ui/core/Container'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getUser } from '../features/user/userSlice'
import { AppDispatch } from '../redux/store'
import Navbar from './navbar/navbar'
import Cookies from 'js-cookie'
import LogOutErrorAlert from './logOutErrorAlert'

const UserFetcher: React.FC = ({ children }) => {
  const [ userRequested, setUserRequested ] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

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
      <Container style={{ paddingTop: "24px", paddingBottom: "24px"}}>
        { userRequested &&  children }
      </Container>
      <LogOutErrorAlert />
    </>
  )
}

export default  UserFetcher