import React from 'react'
import Avatar from '../../assets/OIP.jpeg'

const Dashboard = () => {
  return (
    <div className='w-screen flex'>
        <div className='w-[25%] h-screen border border-black'>
          <div className='flex justify-center items-center'>
            <div className='border border-primary p-[2px] rounded-full'>
            <img src={Avatar} width={75} height={75} alt='avatar'/>
            </div>
          <div className='ml-8'>
            <h3 className='text-2xl'>Chat App</h3>
            <p className='text-lg font-light'>My Account</p>
          </div>
          </div>
        </div>
        <div className='w-[50%] h-screen border border-black'></div>
        <div className='w-[25%] h-screen border border-black'></div>
    </div>
  )
}

export default Dashboard