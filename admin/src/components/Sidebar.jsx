import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'

const Sidebar = () => {

  const {aToken} = useContext(AdminContext)

   console.log("Current Admin Token:", aToken);

  return (
    <div className='min-h-screen bg-white border-r'>
      {
        aToken && <ul className='text-[#515151] mt-5'>

          <NavLink to={'/admin-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#c6c7d1] border-r-4 border-primary' : ''}`}>
            <img className='min-w-5' src={assets.home_icon} alt="" />
             <span style={{ color: '#515151', display: 'inline-block', fontSize: '15px', fontWeight: '500' }}>
              Dashboard
            </span>
          </NavLink>

          <NavLink to={'/all-appointments'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#c6c7d1] border-r-4 border-primary' : ''}`}>
            <img className='min-w-5' src={assets.appointment_icon} alt="" />
              <span style={{ color: '#515151', display: 'inline-block', fontSize: '15px', fontWeight: '500' }}>
              Appointments
            </span>
          </NavLink>

          <NavLink to={'/add-doctor'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#c6c7d1] border-r-4 border-primary' : ''}`}>
            <img className='min-w-5' src={assets.add_icon} alt="" />
             
            <span style={{ color: '#515151', display: 'inline-block', fontSize: '15px', fontWeight: '500' }}>
              Add Doctor
            </span>
          </NavLink>

          <NavLink to={'/doctor-list'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#c6c7d1] border-r-4 border-primary' : ''}`}>
            <img className='min-w-5' src={assets.people_icon} alt="" />
            <span style={{ color: '#515151', display: 'inline-block', fontSize: '15px', fontWeight: '500' }}>
              Doctors List
            </span>
          </NavLink>

        </ul>
      }
    </div>
  )
}

export default Sidebar
