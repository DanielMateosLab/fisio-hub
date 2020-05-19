import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Center, Professional, User } from '../../storage/types'
import { WithoutPassword } from '../../utils/types'

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
    setUser(state, action: PayloadAction<WithoutPassword<User>>) {
      state.user = action.payload
    },
    setProfessional(state, action: PayloadAction<Professional>) {
      state.professional = action.payload
    },
    setCenter(state, action: PayloadAction<Center>) {
      state.center = action.payload
    },
    logOut() { // This should be a thunk
      return { ...initialState }
    }
  }
})

export const { setUser, setProfessional, setCenter, logOut } = userSlice.actions
const userReducer = userSlice.reducer

export default userReducer