import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
import Sendmail from './pages/Sendmail'
import { useDispatch, useSelector } from 'react-redux'
import { memo, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { logoutUser, updateUser } from './store/UserSlice'
import { Button, Modal } from 'antd';
import Sent from './pages/Sent'
import Main from './components/Main'
import { connectToSocket } from './store/socketmanager'

function App() {
  let url = import.meta.env.VITE_DEPLOYEMENT==="production"?import.meta.env.VITE_ENDPOINT :"http://localhost:8080";

  const socketSlice = useSelector((state)=>state.socket);
  console.log(socketSlice)
  const [isModalOpen, setIsModalOpen] = useState(false);
 


  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let dispatch = useDispatch();
  let userStore = useSelector((state)=>state.user)
  console.log(userStore)
  let login = userStore.login //true
  console.log(login)

  // console.log(JSON.parse(localStorage.getItem('mailApp')))


  // let userInfo = useRef();
  // console.log(userInfo)

    async  function getUser(){
   try {
    let res = await axios.get(url+'/users/getUser',{
      headers:{
        'Authorization':userStore.token
      }
    })
    if(res.status==200){
      console.log('all good')
      console.log(res.data)
  
      dispatch(updateUser(res.data.user))
      
    }
    else{
      // if(res.response.data.message==='token expired'){
      //   console.log("kuch kaam krna hai")
      // }
    }
   } catch (error) {
    console.log(error)
    if(error.response.data.message==='token expired' ){
      setIsModalOpen(true)
      setTimeout(()=>{
        dispatch(logoutUser())
        setIsModalOpen(false)
      },6000)
    }
   }
    }
 
 


  useEffect(()=>{
    if(userStore.token){
      getUser()
    }
  
  },[userStore.token])


  useEffect(()=>{
    if(userStore.userInfo?._id){
  connectToSocket(dispatch,userStore.userInfo?._id)

    }
  },[userStore.userInfo?._id])


  return (
    <>
    
   <Main>
   <BrowserRouter>
 
 <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
   <h1>Token expired ! please Login again</h1>

 </Modal>
 <Routes>
    {socketSlice.isConnected && <Route path='/' element={login===true ? <Home/> :<Navigate to='/login'/>}/>}
    {!socketSlice.isConnected && <Route path='/' element={login===true ? <Home/> :<Navigate to='/login'/>}/>}
     <Route path='/login' element={login===false? <Login/> :<Navigate to="/"/>}/>
     <Route path='/signup' element={login===false? <Signup/>:<Navigate to='/'/>}/>
    {socketSlice.isConnected  && <Route path='/sent' element={login===true? <Sent/>:<Navigate to='/login'/>}/>}
   {socketSlice.isConnected  &&  <Route path='/sendMail' element={login===true? <Sendmail/>:<Navigate to="/login"/>}/>}
 </Routes>

<ToastContainer/>
</BrowserRouter>
   </Main>
   
    </>
  )
}

export default memo( App)
