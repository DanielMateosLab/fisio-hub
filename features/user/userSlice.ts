import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Center, Professional, User } from '../../storage/types'
import { SuccessResponse } from '../../utils/types'
import { AppThunk } from '../../redux/store'
import { fetcher } from '../../utils/fetcher'
import Cookies from 'js-cookie'

interface UserState {
  user?: User
  professional?: Professional
  center?: Center
  logOutError: boolean
}

const initialState: UserState = {
  user: undefined,
  professional: undefined,
  center: undefined,
  logOutError: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logInSuccess(state, action: PayloadAction<SuccessResponse['data']>) {
      state.user = action.payload.user || state.user
      state.professional = action.payload.professional || state.professional
      state.center = action.payload.center || state.center
    },
    logOutSuccess() {
      return { ...initialState }
    },
    logOutFailed(state) {
      state.logOutError = true
    },
    removeLogOutAlert(state) {
      state.logOutError = false
    }
  }
})

const { logInSuccess, logOutSuccess, logOutFailed, removeLogOutAlert } = userSlice.actions

export const logOut = (): AppThunk => async dispatch => {
  try {
    const { status } = await fetch('/api/login', {
      method: 'DELETE'
    })

    if (status === 204) {
      dispatch(logOutSuccess())
      Cookies.remove('ss')
    } else {
      dispatch(logOutFailed())
    }
  } catch (e) {
    dispatch(logOutFailed())
  }
}

export const logIn = (data: SuccessResponse['data']): AppThunk => dispatch => {
  const maxAge = +process.env.SESS_MAX_AGE!

  dispatch(logInSuccess(data))
  Cookies.set('ss', '1', { expires: maxAge ? maxAge / 60 * 60 * 24 : 1 })
}

export const getUser = (): AppThunk<Promise<boolean>> => async dispatch => {
  try {
    const res = await fetcher('/api/users?authenticated=1')

    res.status === 'success' && dispatch(logInSuccess(res.data))
    return true
  } catch (e) {
    return true
  }
}

export { removeLogOutAlert }
const userReducer = userSlice.reducer

export default userReducer