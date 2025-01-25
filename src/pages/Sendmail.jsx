import React, { memo, useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { RiUploadCloud2Line } from "react-icons/ri";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { connectToSocket, getSocket } from '../store/socketmanager';

const Sendmail = () => {
    let url = import.meta.env.VITE_DEPLOYEMENT==="production"?import.meta.env.VITE_ENDPOINT :"http://localhost:8080";
    
    let socket =getSocket()
    console.log(socket)
    // let token = JSON.parse(localStorage.getItem('mailLogin')).token
    // console.log(token)


  

    let userSlice = useSelector((state)=>state.user)
    console.log(userSlice)


    let toRef = useRef()
    let subjectRef = useRef()
    let bodyRef = useRef();



    const handleSubmit = async (e) => {
        e.preventDefault()
        let obj = {
            to: toRef.current.value,
            subject: subjectRef.current.value,
            body: bodyRef.current.value
        }

        console.log(obj)


        socket?.emit('sendMsg',{...obj,from:userSlice.userInfo._id})

      try {
        let res = await axios.post(url+'/mail/create',obj,{
            headers:{
                'Authorization':userSlice.token
            }
        })

        if(res.status==200 || res.status==201){
            toast.success(res.data.message,{position:"top-center"})
            toRef.current.value = ""
            subjectRef.current.value = ""
            bodyRef.current.value = ""
        }
      } catch (error) {
        console.log(error)
        
      }

    }

    return (
        <div className='flex'>
            <Sidebar />

            <form action="" className='flex flex-col w-full p-8 gap-3'>
                <div className='relative'>
                    <label htmlFor="" className='absolute left-2 top-4' >To:</label>
                    <input ref={toRef} type="email" placeholder='enter a email' className='px-20 py-3 w-full border-2' />
                </div>
                <div className='relative'>
                    <label htmlFor="" className='absolute left-2 top-4' >Subject:</label>
                    <input ref={subjectRef} type="text" placeholder='enter a subject' className='px-20 py-3 w-full border-2' />
                </div>
                <div className='relative'>
                    <label htmlFor="" className='absolute left-2 top-4 ' >Text:</label>
                    <textarea ref={bodyRef} name="" className='px-20 py-3 w-full border-2 min-h-[60vh]' id=""></textarea>

                    <div className='flex gap-2'>
                        <button onClick={handleSubmit} className='bg-blue-700 hover:bg-blue-900 rounded-md px-4 py-2'>Send</button>
                        <label htmlFor="file"> <RiUploadCloud2Line size={30} /></label>
                        <input type="file" id='file' hidden />
                    </div>
                </div>


            </form>
        </div>
    )
}

export default memo( Sendmail)
