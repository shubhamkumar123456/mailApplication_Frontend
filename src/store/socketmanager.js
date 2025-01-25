import  {io} from 'socket.io-client';
import { setStatus } from './SocketSlice';

let socket = null;
let ENDPOINT = import.meta.env.VITE_DEPLOYEMENT==="production"?import.meta.env.VITE_ENDPOINT :"http://localhost:8080";

export const connectToSocket  = ( dispatch,userId)=>{
    console.log(userId)
    console.log(ENDPOINT)
    socket = io(ENDPOINT, {transports:['websocket']});

    socket.on('connect',()=>{
        console.log("socket connected successfull",socket.id)
        dispatch(setStatus(true))
        socket.emit('addUser',userId)
    })

    socket.on('disconnect',()=>{
        console.log("socket is disconnected");
        dispatch(setStatus(false))

    })
    console.log(socket)
    return socket
    

  

}

export const getSocket = ()=>socket

