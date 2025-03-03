import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  value: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload
    }
  }
})

export const { reducer: counterReducer, actions } = counterSlice
export const { increment, decrement, incrementByAmount } = actions
export default counterReducer
