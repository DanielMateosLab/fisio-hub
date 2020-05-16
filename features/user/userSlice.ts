import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Center, Professional, User } from '../../storage/types'

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
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    setProfessional(state, action: PayloadAction<Professional>) {
      state.professional = action.payload
    },
    setCenter(state, action: PayloadAction<Center>) {
      state.center = action.payload
    }
  }
})

export const { setUser, setProfessional, setCenter } = userSlice.actions
const userReducer = userSlice.reducer

export default userReducer