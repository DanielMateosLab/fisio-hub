import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import rootReducer, { RootState } from './rootReducer'

const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type AppThunk<R = void> = ThunkAction<R, RootState, unknown, Action<string>>


export default store