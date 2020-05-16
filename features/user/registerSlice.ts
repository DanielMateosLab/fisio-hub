import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RegisterState {
  step: number
  method: 'login' | 'register'
  registeredEmail: string
}

const initialState: RegisterState = {
  step: 0,
  method: 'register',
  registeredEmail: ''
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload
    },
    setMethod(state, action: PayloadAction<RegisterState['method']>) {
      state.method = action.payload
    },
    setRegisteredEmail(state, action: PayloadAction<string>) {
      state.registeredEmail = action.payload
    }
  }
})

export const { setRegisteredEmail, setMethod, setStep } = registerSlice.actions
const registerReducer = registerSlice.reducer

export default registerReducer