import React, { memo, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { getSocket } from '../store/socketmanager'

const Home = () => {

  let url = import.meta.env.VITE_DEPLOYEMENT==="production"?import.meta.env.VITE_ENDPOINT :"http://localhost:8080";

    let socket = getSocket()
    console.log(socket)
  let userSlice = useSelector((state)=>state.user)
  console.log(userSlice)

  const [sentMail, setsentMail] = useState([]);
  console.log(sentMail)
 async function Sentmails(){
    try {
      let res = await axios.get(url+'/mail/getMail',{
          headers:{
              'Authorization':userSlice.token
          }
      })
      if(res.status===200){
          console.log(res.data)
          setsentMail(res.data.sentMails)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
      Sentmails()
  },[])


  useEffect(()=>{
    socket.on('recieveMsg',(ans)=>{
      console.log(ans)
      setsentMail([...sentMail,ans])
    })
  },[socket?.id,sentMail])


  return (
   
     <div className='flex gap-2'>
        <Sidebar/>

    <div className='w-full flex flex-col gap-2'>
    {

      // sort((a,b)=>new Date(b.createdAt)- new Date(a.createdAt))
        sentMail.reverse().map((mail)=>{
            return <div className='bg-gray-300 w-full rounded-xl p-4'>
                    <p className='font-bold '>{mail.to}</p>
                    <p><span className='font-bold text-gray-500'> Subject: </span>{mail.subject}</p>
                    <p>{mail.body}</p>
            </div>
        })
      }
    </div>
    </div>
 
  )
}



export default memo( Home )
