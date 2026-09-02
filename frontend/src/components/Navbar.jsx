import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext' 


const Navbar = () => {

   const navigate = useNavigate();
   const [showMenu, setShowMenu] = useState(false) 
   const { token, setToken, userData } = useContext(AppContext)

   const logout = () => {
       localStorage.removeItem('token')
       setToken(false)
       navigate('/login')
   }

  return (
    /* Added sticky top-0 z-50 bg-white classes here to lock layout tracking */
    <div className='sticky top-0 z-50 bg-white flex items-center justify-between text-sm py-4 border-b border-b-gray-400'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="MediAyuCare" className='w-[250px] h-auto cursor-pointer' />

      <ul className='hidden md:flex items-start gap-7 font-medium'>
        <NavLink to='/'>
            <li className='py-1'>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>

        <NavLink to='/doctors'>
            <li className='py-1'>All DOCTORS</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>

        <NavLink to='/about'>
            <li className='py-1'>ABOUT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>

        <NavLink to='/contact'>
            <li className='py-1'>CONTACT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
      </ul>

      <div className='flex items-center gap-4'>

        {
            token && userData
             ? 
             <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img className='w-8 rounded-full' src={userData.image } alt="Profile" />
                <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown Indicator" />

                <div className='absolute top-2 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-200 rounded flex flex-col gap-4 p-4 shadow-md'>
                        <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                        <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                        <p onClick={logout} className='hover:text-red-600 font-semibold cursor-pointer transition-colors'>Logout</p>
                    </div>
                </div>

             </div> : 

             <button
               onClick={() => navigate('/login')}
               className='bg-primary text-white px-8 py-3 rounded-full font-light cursor-pointer hover:bg-opacity-95 transition-all duration-200'
             >
               Create account
             </button>
        }

        <img
          onClick={()=>setShowMenu(true)}
          className='w-6 md:hidden cursor-pointer'
          src={assets.menu_icon}
          alt="Mobile Menu Open"
        />

        {/*--- for mobile--- screen----  */}
        <div
          className={`md:hidden ${
            showMenu
              ? 'fixed inset-0 w-full min-h-screen'
              : 'h-0 w-0'
          } right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300 ease-in-out`}
        >

          <div className='flex items-center justify-between px-5 py-5 border-b border-b-gray-200 bg-white'>
            <img src={assets.logo} className='w-36 h-auto cursor-pointer' alt="Logo" />
            
            <div className='w-10 h-10 flex items-center justify-center rounded-full bg-[#F0F8FA] active:scale-95 transition-all'>
              <img
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                className='w-5 cursor-pointer'
                alt="Mobile Menu Close"
              />
            </div>
          </div>

          <ul className='flex flex-col gap-2 mt-6 px-5 text-base font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/' className='w-full'>
              <p className='px-5 py-4 rounded-xl inline-block w-full text-[#334155] bg-[#F7FBFC] hover:bg-[#E8F7F9] hover:text-[#087F8C] active:bg-[#E8F7F9] transition-all duration-200'>
                HOME
              </p>
            </NavLink>

            <NavLink onClick={() => setShowMenu(false)} to='/doctors' className='w-full'>
              <p className='px-5 py-4 rounded-xl inline-block w-full text-[#334155] bg-[#F7FBFC] hover:bg-[#E8F7F9] hover:text-[#087F8C] active:bg-[#E8F7F9] transition-all duration-200'>
                ALL DOCTORS
              </p>
            </NavLink>

            <NavLink onClick={() => setShowMenu(false)} to='/about' className='w-full'>
              <p className='px-5 py-4 rounded-xl inline-block w-full text-[#334155] bg-[#F7FBFC] hover:bg-[#E8F7F9] hover:text-[#087F8C] active:bg-[#E8F7F9] transition-all duration-200'>
                ABOUT
              </p>
            </NavLink>

            <NavLink onClick={() => setShowMenu(false)} to='/contact' className='w-full'>
              <p className='px-5 py-4 rounded-xl inline-block w-full text-[#334155] bg-[#F7FBFC] hover:bg-[#E8F7F9] hover:text-[#087F8C] active:bg-[#E8F7F9] transition-all duration-200'>
                CONTACT
              </p>
            </NavLink>
          </ul>

          {/* Mobile Menu Footer
          <div className='absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-[#E6EEF0] bg-[#F8FCFD]'>
            <p className='text-center text-xs text-[#94A3B8] leading-5'>
              Your healthcare journey, simplified with{' '}
              <span className='font-semibold text-[#087F8C]'>
                MediAyuCare
              </span>
            </p>
          </div> */}

        </div>

      </div>
    </div>
  )
}

export default Navbar
