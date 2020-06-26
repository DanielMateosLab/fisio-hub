import { combineReducers } from '@reduxjs/toolkit'
import sessionReducer from 'client/redux/sessionSlice'
import registerReducer from 'client/redux/registerSlice'
import scheduleReducer from './scheduleSlice'

const rootReducer = combineReducers({
  session: sessionReducer,
  register: registerReducer,
  schedule: scheduleReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer