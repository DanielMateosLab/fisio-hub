import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Center, Professional, User } from '../../storage/types'
import { SuccessResponse } from '../../utils/types'
import { AppThunk } from '../../redux/store'

interface UserState {
  user?: User
  professional?: Professional
  center?: Center
  logOutError: string
}

const initialState: UserState = {
  user: undefined,
  professional: undefined,
  center: undefined,
  logOutError: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn(state, action: PayloadAction<SuccessResponse['data']>) {
      state.user = action.payload.user || state.user
      state.professional = action.payload.professional || state.professional
      state.center = action.payload.center || state.center
    },
    logOutSuccess() {
      return { ...initialState }
    },
    logOutFailed(state) {
      state.logOutError = 'No se ha podido cerrar sesión. Elimina manualmente las cookies de la página.'
    }
  }
})

const { logIn, logOutSuccess, logOutFailed } = userSlice.actions

export const logOut = (): AppThunk => async dispatch => {
  try {
    const { status } = await fetch('/api/login', {
      method: 'DELETE'
    })

    if (status === 204) {
      dispatch(logOutSuccess())
    } else {
      dispatch(logOutFailed())
    }
  } catch (e) {
    dispatch(logOutFailed())
  }
}


const userReducer = userSlice.reducer

export { logIn }
export default userReducer