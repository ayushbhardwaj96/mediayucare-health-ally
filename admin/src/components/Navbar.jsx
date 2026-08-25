import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext' 
import { DoctorContext } from '../context/DoctorContext' 

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate =  useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken') 
  }

  return (
    <div
      className='
        flex justify-between items-center
        px-4 sm:px-6 lg:px-10
        py-3 sm:py-4
        border-b border-[#DCECEF]
        bg-white
        shadow-[0_2px_12px_rgba(18,63,120,0.05)]
        sticky top-0 z-30
      '
    >

      {/* Logo + Role */}
      <div className='flex items-center gap-2 sm:gap-3 min-w-0'>

        <img
          onClick={() => navigate('/')}
          className='
            w-44 sm:w-48 lg:w-52
            h-auto
            cursor-pointer
            object-contain
            transition-transform duration-200
            hover:scale-[1.02]
          '
          src={assets.admin_logo}
          alt=""
        />

        <p
          className='
            border border-[#B9DDE2]
            px-2.5 sm:px-3
            py-1
            rounded-full
            bg-[#E8F7F9]
            text-[#087F8C]
            text-[11px] sm:text-xs
            font-semibold
            whitespace-nowrap
          '
        >
          {aToken ? 'Admin' : 'Doctor'}
        </p>

      </div>


      {/* Logout Button */}
      <button
        onClick={() => logout()}
        className='
          bg-gradient-to-r
          from-[#087F8C]
          to-[#123F78]
          text-white
          text-xs sm:text-sm
          font-semibold
          px-5 sm:px-8 lg:px-10
          py-2 sm:py-2.5
          rounded-full
          shadow-[0_4px_12px_rgba(8,127,140,0.18)]
          hover:shadow-[0_6px_18px_rgba(8,127,140,0.25)]
          hover:-translate-y-0.5
          active:translate-y-0
          transition-all duration-300
          whitespace-nowrap
        '
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar