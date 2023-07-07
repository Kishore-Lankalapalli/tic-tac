import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  count: 369,
}

export const counterReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
})

export const {increment} = counterReducer.actions
export default counterReducer.reducer
