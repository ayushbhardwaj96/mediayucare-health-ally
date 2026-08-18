import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
  return (
    <div className='relative overflow-hidden flex flex-col md:flex-row flex-wrap bg-gradient-to-br from-[#087F8C] via-[#0B9FA8] to-[#18B99A] rounded-2xl px-6 md:px-10 lg:px-16 shadow-lg'>

      {/* Decorative background */}
      <div className='absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl'></div>
      <div className='absolute -bottom-24 left-1/3 w-72 h-72 bg-white/10 rounded-full blur-3xl'></div>

      {/* ------left side------- */}
      <div className='relative z-10 md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 md:py-20 lg:py-24 m-auto md:mb-0'>

        <div className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2'>
          <span className='w-2 h-2 bg-white rounded-full'></span>
          <span className='text-white text-xs md:text-sm font-medium'>
            Trusted Healthcare Platform
          </span>
        </div>

        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight tracking-tight'>
          Book Appointment
          <br />
          <span className='text-white/90'>
            With Trusted Doctors
          </span>
        </p>

        <div className='flex items-center gap-3 text-white/90 text-sm font-light leading-relaxed'>
          <img
            className='w-24 md:w-28'
            src={assets.group_profiles}
            alt=""
          />

          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className='hidden sm:block' />
            I schedule your appointment hassle-free.
          </p>
        </div>

        <a
          href="#speciality"
          className='group flex items-center gap-3 bg-white px-7 py-3.5 rounded-full text-[#087F8C] text-sm font-semibold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
        >
          Book appointment

          <span className='flex items-center justify-center w-7 h-7 rounded-full bg-[#E6F8F6] group-hover:bg-[#D3F2EE] transition-colors'>
            <img
              className='w-3 group-hover:translate-x-0.5 transition-transform'
              src={assets.arrow_icon}
              alt=""
            />
          </span>
        </a>

      </div>

      {/* ------ Right Side ------- */}
      <div className='relative z-10 md:w-1/2 flex items-end justify-center md:justify-end min-h-[300px] md:min-h-0'>

        <div className='absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl'></div>

        <img
          className='relative w-[85%] md:w-full lg:w-[92%] max-w-[620px] md:absolute bottom-0 h-auto object-contain drop-shadow-2xl'
          src={assets.header_img}
          alt=""
        />

      </div>

    </div>
  )
}

export default Header