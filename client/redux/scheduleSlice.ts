import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface ScheduleState {
  // The scrollTop is controlled with Rx because doing it with react state caused performance issues.
  scrollTop: number
}

const initialState: ScheduleState = {
  scrollTop: 0,
}

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setScrollTop(state, action: PayloadAction<number>) {
      state.scrollTop = action.payload
    }
  }
})

const { setScrollTop } = scheduleSlice.actions
export { setScrollTop }
const scheduleReducer = scheduleSlice.reducer

export default scheduleReducer