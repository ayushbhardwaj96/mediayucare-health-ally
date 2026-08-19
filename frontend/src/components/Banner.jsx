import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

   const navigate = useNavigate() ;

  return (
    <div className='relative flex overflow-hidden bg-gradient-to-r from-[#087F8C] via-[#0B9FA8] to-[#18B99A] rounded-2xl px-6 sm:px-10 md:px-14 lg:px-16 my-20 md:mx-10 shadow-lg'>

      {/* Decorative background */}
      <div className='absolute -right-16 -top-20 w-64 h-64 bg-white/10 rounded-full blur-2xl'></div>
      <div className='absolute right-1/3 -bottom-28 w-72 h-72 bg-white/10 rounded-full blur-3xl'></div>

      {/* ---left Side--- */}
      <div className='relative z-10 flex-1 py-10 sm:py-12 md:py-16 lg:py-20 lg:pl-5'>

            <div className='inline-flex items-center gap-2 bg-white/15 border border-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-5'>
              <span className='w-2 h-2 bg-white rounded-full'></span>
              <span className='text-white/95 text-xs sm:text-sm font-medium'>
                Trusted Healthcare
              </span>
            </div>

            <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
              <p>Book Appointment</p>
              <p className='mt-3 text-white/90'>
                With 100+ Trusted Doctors
              </p>
            </div>

            <button
              onClick={()=>{navigate('/login'); scrollTo(0,0)}}
              className='bg-white text-sm sm:text-base text-[#087F8C] font-semibold px-8 py-3.5 rounded-full mt-7 shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300'
            >
              Create Account
            </button>

      </div>

      {/* --- Right Side --- */}
      <div className='relative z-10 hidden md:block md:w-1/2 lg:w-[370px]'>

         <img
           className='w-full absolute bottom-0 right-0 max-w-md drop-shadow-2xl'
           src={assets.appointment_img}
           alt=""
         />

      </div>

    </div>
  )
}

export default Banner