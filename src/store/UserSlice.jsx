import { createSlice } from '@reduxjs/toolkit'

let data = JSON.parse(localStorage.getItem('mailApp')) //{login:true,token:5789}
console.log("data = ", data)
const initialState = {
  login:data?data.login:false,  //false, //true
  token:data?data.token:'',   //'' , //"afmhbskf t67890"
  userInfo:""
}



export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
    //    action.payload--> // {message: , token , exipre}
        localStorage.setItem('mailApp' ,JSON.stringify({login:true,token:action.payload.token}))
        console.log(action)
        state.login = true;
        state.token = action.payload.token
        // state.login = true
    },

    logoutUser:(state,action)=>{
        localStorage.removeItem('mailApp')
        state.login = false;
        state.token = ''
    }
    ,
    updateUser:(state,action)=>{
        state.userInfo = action.payload
    }
   
  },
})

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser, updateUser } = UserSlice.actions

export default UserSlice.reducer