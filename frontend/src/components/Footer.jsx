import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10 mt-10'>

      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12 lg:gap-20 my-10 mt-32 text-sm'>

        {/* Left Section */}
        <div>

          <img
            className='mb-4 w-[250px] h-auto'
            src={assets.logo}
            alt="MediAyuCare"
          />

          <p className='w-full md:w-2/3 text-[#596472] leading-7'>
            MediAyuCare is a trusted healthcare platform designed to make
            quality medical care simple and accessible. Browse verified doctors,
            explore medical specialities, and book appointments conveniently
            from anywhere. Our goal is to connect patients with reliable
            healthcare professionals while providing a smooth, secure, and
            patient-friendly experience.
          </p>

        </div>

        {/* Company */}
        <div className='mt-5' >

          <p className='text-lg font-semibold mb-6 text-[#123F78] tracking-wide'>
            COMPANY
          </p>

          <ul className='flex flex-col gap-3 text-[#64748B]'>

            <li className='cursor-pointer hover:text-primary transition-colors duration-200'>
              Home
            </li>

            <li className='cursor-pointer hover:text-primary transition-colors duration-200'>
              About us
            </li>

            <li className='cursor-pointer hover:text-primary transition-colors duration-200'>
              Find Doctors
            </li>

            <li className='cursor-pointer hover:text-primary transition-colors duration-200'>
              Privacy Policy
            </li>

          </ul>

        </div>

        {/* Get in touch */}
        <div className='mt-5'>

          <p className='text-lg font-semibold mb-6 text-[#123F78] tracking-wide'>
            GET IN TOUCH
          </p>

          <ul className='flex flex-col gap-3 text-[#64748B]'>

            <li className='hover:text-primary transition-colors duration-200'>
              +91 98765 43210
            </li>

            <li className='hover:text-primary transition-colors duration-200'>
              mediayucare@gmail.com
            </li>

            <li className='text-gray-500 leading-6'>
              Available for your healthcare needs
            </li>

          </ul>

        </div>

      </div>

      {/* Bottom Section */}
      <div>

        <hr className='border-gray-200' />

        <p className='py-6 text-sm text-center text-[#64748B]'>
          Copyright 2026 © MediAyuCare.com - All Rights Reserved.
        </p>

      </div>

    </div>
  )
}

export default Footer