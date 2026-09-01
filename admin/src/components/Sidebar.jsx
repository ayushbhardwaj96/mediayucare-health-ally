import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

  const {aToken} = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

   console.log("Current Admin Token:", aToken);

  return (
    <div
      className='
        min-h-screen
        bg-white
        border-r border-[#DCECEF]
        shadow-[2px_0_12px_rgba(18,63,120,0.04)]
        flex-shrink-0
      '
    >
      {
        aToken && <ul className='text-[#515151] mt-4 sm:mt-5'>

          <NavLink
            to={'/admin-dashboard'}
            className={({ isActive }) => `
              group
              flex items-center
              gap-3
              py-3.5
              px-3
              md:px-5
              lg:px-7
              xl:px-9
              md:min-w-64
              lg:min-w-72
              cursor-pointer
              border-r-4
              transition-all duration-200
              ${isActive
                ? 'bg-[#E8F7F9] border-primary text-[#087F8C]'
                : 'border-transparent hover:bg-[#F4FAFB] hover:text-[#087F8C]'
              }
            `}
          >
            <img
              className='
                w-5 h-5
                min-w-5
                object-contain
                transition-transform duration-200
                group-hover:scale-105
              '
              src={assets.home_icon}
              alt=""
            />

            <span
              className='
                hidden
                sm:inline-block
                text-[14px]
                lg:text-[15px]
                font-medium
                whitespace-nowrap
              '
            >
              Dashboard
            </span>

          </NavLink>


          <NavLink
            to={'/all-appointments'}
            className={({ isActive }) => `
              group
              flex items-center
              gap-3
              py-3.5
              px-3
              md:px-5
              lg:px-7
              xl:px-9
              md:min-w-64
              lg:min-w-72
              cursor-pointer
              border-r-4
              transition-all duration-200
              ${isActive
                ? 'bg-[#E8F7F9] border-primary text-[#087F8C]'
                : 'border-transparent hover:bg-[#F4FAFB] hover:text-[#087F8C]'
              }
            `}
          >
            <img
              className='
                w-5 h-5
                min-w-5
                object-contain
                transition-transform duration-200
                group-hover:scale-105
              '
              src={assets.appointment_icon}
              alt=""
            />

            <span
              className='
                hidden
                sm:inline-block
                text-[14px]
                lg:text-[15px]
                font-medium
                whitespace-nowrap
              '
            >
              Appointments
            </span>

          </NavLink>


          <NavLink
            to={'/add-doctor'}
            className={({ isActive }) => `
              group
              flex items-center
              gap-3
              py-3.5
              px-3
              md:px-5
              lg:px-7
              xl:px-9
              md:min-w-64
              lg:min-w-72
              cursor-pointer
              border-r-4
              transition-all duration-200
              ${isActive
                ? 'bg-[#E8F7F9] border-primary text-[#087F8C]'
                : 'border-transparent hover:bg-[#F4FAFB] hover:text-[#087F8C]'
              }
            `}
          >
            <img
              className='
                w-5 h-5
                min-w-5
                object-contain
                transition-transform duration-200
                group-hover:scale-105
              '
              src={assets.add_icon}
              alt=""
            />

            <span
              className='
                hidden
                sm:inline-block
                text-[14px]
                lg:text-[15px]
                font-medium
                whitespace-nowrap
              '
            >
              Add Doctor
            </span>

          </NavLink>


          <NavLink
            to={'/doctor-list'}
            className={({ isActive }) => `
              group
              flex items-center
              gap-3
              py-3.5
              px-3
              md:px-5
              lg:px-7
              xl:px-9
              md:min-w-64
              lg:min-w-72
              cursor-pointer
              border-r-4
              transition-all duration-200
              ${isActive
                ? 'bg-[#E8F7F9] border-primary text-[#087F8C]'
                : 'border-transparent hover:bg-[#F4FAFB] hover:text-[#087F8C]'
              }
            `}
          >
            <img
              className='
                w-5 h-5
                min-w-5
                object-contain
                transition-transform duration-200
                group-hover:scale-105
              '
              src={assets.people_icon}
              alt=""
            />

            <span
              className='
                hidden
                sm:inline-block
                text-[14px]
                lg:text-[15px]
                font-medium
                whitespace-nowrap
              '
            >
              Doctors List
            </span>

          </NavLink>

        </ul>
      }

       {
        dToken && <ul className='text-[#515151] mt-4 sm:mt-5'>

          <NavLink
            to={'/doctor-dashboard'}
            className={({ isActive }) => `
              group
              flex items-center
              gap-3
              py-3.5
              px-3
              md:px-5
              lg:px-7
              xl:px-9
              md:min-w-64
              lg:min-w-72
              cursor-pointer
              border-r-4
              transition-all duration-200
              ${isActive
                ? 'bg-[#E8F7F9] border-primary text-[#087F8C]'
                : 'border-transparent hover:bg-[#F4FAFB] hover:text-[#087F8C]'
              }
            `}
          >
            <img
              className='
                w-5 h-5
                min-w-5
                object-contain
                transition-transform duration-200
                group-hover:scale-105
              '
              src={assets.home_icon}
              alt=""
            />

            <span
              className='
                hidden
                sm:inline-block
                text-[14px]
                lg:text-[15px]
                font-medium
                whitespace-nowrap
              '
            >
              Dashboard
            </span>

          </NavLink>


          <NavLink
            to={'/doctor-appointments'}
            className={({ isActive }) => `
              group
              flex items-center
              gap-3
              py-3.5
              px-3
              md:px-5
              lg:px-7
              xl:px-9
              md:min-w-64
              lg:min-w-72
              cursor-pointer
              border-r-4
              transition-all duration-200
              ${isActive
                ? 'bg-[#E8F7F9] border-primary text-[#087F8C]'
                : 'border-transparent hover:bg-[#F4FAFB] hover:text-[#087F8C]'
              }
            `}
          >
            <img
              className='
                w-5 h-5
                min-w-5
                object-contain
                transition-transform duration-200
                group-hover:scale-105
              '
              src={assets.appointment_icon}
              alt=""
            />

            <span
              className='
                hidden
                sm:inline-block
                text-[14px]
                lg:text-[15px]
                font-medium
                whitespace-nowrap
              '
            >
              Appointments
            </span>

          </NavLink>

          <NavLink
            to={'/doctor-profile'}
            className={({ isActive }) => `
              group
              flex items-center
              gap-3
              py-3.5
              px-3
              md:px-5
              lg:px-7
              xl:px-9
              md:min-w-64
              lg:min-w-72
              cursor-pointer
              border-r-4
              transition-all duration-200
              ${isActive
                ? 'bg-[#E8F7F9] border-primary text-[#087F8C]'
                : 'border-transparent hover:bg-[#F4FAFB] hover:text-[#087F8C]'
              }
            `}
          >
            <img
              className='
                w-5 h-5
                min-w-5
                object-contain
                transition-transform duration-200
                group-hover:scale-105
              '
              src={assets.people_icon}
              alt=""
            />

            <span
              className='
                hidden
                sm:inline-block
                text-[14px]
                lg:text-[15px]
                font-medium
                whitespace-nowrap
              '
            >
              Profile
            </span>

          </NavLink>

        </ul>
      }
    </div>
  )
}

export default Sidebar