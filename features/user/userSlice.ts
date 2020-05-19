import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Center, Professional, User } from '../../storage/types'
import { SuccessResponse } from '../../utils/types'

interface UserState {
  user?: User
  professional?: Professional
  center?: Center
}

const initialState: UserState = {
  user: undefined,
  professional: undefined,
  center: undefined
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
    logOut() { // This should be a thunk
      return { ...initialState }
    }
  }
})

export const { logIn, logOut } = userSlice.actions
const userReducer = userSlice.reducer

export default userReducer