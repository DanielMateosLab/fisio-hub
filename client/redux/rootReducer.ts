import { combineReducers } from '@reduxjs/toolkit'
import sessionReducer from 'client/redux/sessionSlice'
import registerReducer from 'client/redux/registerSlice'

const rootReducer = combineReducers({
  session: sessionReducer,
  register: registerReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer