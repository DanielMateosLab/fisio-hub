import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Center, Professional, User } from '../../storage/types'
import { RequestUser } from '../../pages/api/users'
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
    setUser(state, action: PayloadAction<WithoutPassword<RequestUser>>) {
      const { professional, ...user } = action.payload
      state.user = user
      state.professional = professional
    },
    setCenter(state, action: PayloadAction<Center>) {
      state.center = action.payload
    },
    logOut(state) { // This should be a thunk
      state = initialState
    }
  }
})

export const { setUser, setCenter, logOut } = userSlice.actions
const userReducer = userSlice.reducer

export default userReducer