import { configureStore } from '@reduxjs/toolkit'
import UserSlice  from './UserSlice'
import  SocketSlice  from './SocketSlice'

export const store = configureStore({
  reducer: {
    user:UserSlice,
    socket:SocketSlice
  },

})