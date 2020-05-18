import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RegisterState {
  method: 'login' | 'register'
  registeredEmail: string
}

const initialState: RegisterState = {
  method: 'register',
  registeredEmail: ''
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setMethod(state, action: PayloadAction<RegisterState['method']>) {
      state.method = action.payload
    },
    setRegisteredEmail(state, action: PayloadAction<string>) {
      state.registeredEmail = action.payload
    }
  }
})

export const { setRegisteredEmail, setMethod } = registerSlice.actions
const registerReducer = registerSlice.reducer

export default registerReducer