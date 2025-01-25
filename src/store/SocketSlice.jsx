import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isConnected:false ,
}

export const SocketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
  setStatus:(state,action)=>{
    state.isConnected = action.payload
  }
  },
})

// Action creators are generated for each case reducer function
export const { setStatus } = SocketSlice.actions

export default SocketSlice.reducer