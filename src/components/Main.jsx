import React from 'react'

const Main = (props) => {
  return (
    <div className='bg-black min-h-screen'>
      {props.children}
    </div>
  )
}

export default Main
