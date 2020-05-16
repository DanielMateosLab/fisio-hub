import { combineReducers } from '@reduxjs/toolkit'
import userReducer from 'features/user/userSlice'
import registerReducer from 'features/user/registerSlice'

const rootReducer = combineReducers({
  user: userReducer,
  register: registerReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer