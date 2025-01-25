import React, { memo, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { MdDeleteOutline } from "react-icons/md";

const Sent = () => {
  let url = import.meta.env.VITE_DEPLOYEMENT==="production"?import.meta.env.VITE_ENDPOINT :"http://localhost:8080";

    let userSlice = useSelector((state)=>state.user)
    console.log(userSlice)

    const [sentMail, setsentMail] = useState([]);
    console.log(sentMail)
   async function Sentmails(){
      
      try {
        let res = await axios.get(url+'/mail/sentMails',{
            headers:{
                'Authorization':userSlice.token
            }
        })
        if(res.status===200){
            // console.log(res.data)
            setsentMail(res.data.sentMails)
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        Sentmails()
    },[])

    const handleDelete = async(mail)=>{
      console.log(mail)
     try {
      let res = await axios.delete(url+`/mail/delete/${mail._id}`,{
        headers:{
          'Authorization':userSlice.token
        }
      })
     
      if(res.status==200){
        Sentmails()
      }
     } catch (error) {
      
     }
    }

  return (
    <div className='flex gap-2'>
        <Sidebar/>

    <div className='w-full flex flex-col gap-2'>
    {
        sentMail.map((mail)=>{
            return <div className='bg-gray-300 w-full relative rounded-xl p-4'>
                    <p className='font-bold '>{mail.to}</p>
                    <p><span className='font-bold text-gray-500'> Subject: </span>{mail.subject}</p>
                    <p>{mail.body}</p>
                    <button onClick={()=>handleDelete(mail)} className='absolute right-4 top-3'><MdDeleteOutline size={20} /></button>
            </div>
        })
      }
    </div>
    </div>
  )
}

export default memo( Sent )
