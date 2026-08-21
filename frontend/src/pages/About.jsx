import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div className='pb-16'>

      {/* ---------- ABOUT HEADING ---------- */}
      <div className='text-center pt-12 md:pt-16'>

        <div className='inline-flex items-center gap-2 px-4 py-1.5
                        rounded-full bg-[#E8F7F9]
                        border border-[#D2ECEF]
                        text-[#087F8C] text-xs font-semibold
                        tracking-wider mb-4'>

          <span className='w-1.5 h-1.5 rounded-full bg-[#087F8C]'></span>

          <span>OUR STORY</span>

        </div>

        <p className='text-3xl md:text-4xl font-bold
                      text-[#123F78] tracking-tight'>

          ABOUT <span className='text-[#087F8C]'>US</span>

        </p>

        <p className='text-sm text-[#64748B] mt-3 max-w-xl mx-auto leading-6'>
          Making healthcare more accessible, convenient, and connected for everyone.
        </p>

      </div>


      {/* ---------- ABOUT CONTENT ---------- */}

      <div className='my-12 md:my-16 flex flex-col md:flex-row
                      gap-10 md:gap-14 items-center'>

        {/* Image */}

        <div className='w-full md:max-w-[390px] relative group'>

          <div className='absolute -inset-2 rounded-2xl
                          bg-[#E5F5F7] opacity-70
                          group-hover:opacity-100
                          transition-opacity duration-300'>
          </div>

          <div className='relative overflow-hidden rounded-2xl
                          border border-[#DCECEF]
                          shadow-[0_10px_30px_rgba(18,63,120,0.10)]'>

            <img
              className='w-full object-cover
                         group-hover:scale-[1.02]
                         transition-transform duration-500'
              src={assets.about_image}
              alt="MediAyuCare healthcare"
            />

          </div>

        </div>


        {/* Content */}

        <div className='flex flex-col justify-center gap-5
                        md:w-2/4 text-sm text-[#64748B]
                        leading-7'>

          <p>
            Welcome to <span className='font-semibold text-[#123F78]'>
            MediAyuCare</span>, a healthcare platform built to make
            finding trusted medical professionals and managing appointments
            simpler. We believe accessing healthcare should be convenient,
            transparent, and stress-free for every patient.
          </p>

          <p>
            MediAyuCare connects patients with healthcare professionals through
            a simple digital experience. From discovering doctors by speciality
            to selecting a suitable appointment slot, our platform is designed
            to reduce unnecessary effort and help patients take better control
            of their healthcare journey.
          </p>

          {/* Vision */}

          <div className='mt-2'>

            <div className='flex items-center gap-3 mb-2'>

              <span className='w-8 h-[2px] bg-[#087F8C]'></span>

              <b className='text-[#123F78] text-lg font-semibold'>
                Our Plans and Vision
              </b>

            </div>

            <p>
              Our vision is to build a connected healthcare ecosystem where
              patients can easily discover reliable doctors, access essential
              healthcare services, and manage their appointments from one
              convenient platform. We aim to combine technology with a
              patient-first approach to make everyday healthcare simpler,
              more accessible, and more efficient.
            </p>

          </div>

        </div>

      </div>


      {/* ---------- WHY CHOOSE US ---------- */}

      <div className='mt-16 mb-8'>

        <div className='flex flex-col md:flex-row
                        md:items-end md:justify-between gap-3'>

          <div>

            <p className='text-2xl md:text-3xl font-bold
                          text-[#123F78]'>

              WHY <span className='text-[#087F8C]'>
                CHOOSE US
              </span>

            </p>

            <p className='text-sm text-[#64748B] mt-2'>
              Designed around convenience, trust, and better healthcare access.
            </p>

          </div>

        </div>

      </div>


      {/* ---------- BENEFITS ---------- */}

      <div className='flex flex-col md:flex-row mb-20
                      rounded-2xl overflow-hidden
                      border border-[#DCECEF]
                      shadow-[0_8px_30px_rgba(18,63,120,0.06)]'>

        {/* Efficiency */}

        <div className='group flex-1
                        border-b md:border-b-0 md:border-r
                        border-[#DCECEF]
                        px-8 md:px-10 lg:px-12
                        py-10 sm:py-14
                        flex flex-col gap-4
                        bg-white
                        hover:bg-[#087F8C]
                        hover:text-white
                        transition-all duration-300
                        cursor-pointer'>

          <div className='w-10 h-10 rounded-xl
                          bg-[#E8F7F9]
                          text-[#087F8C]
                          flex items-center justify-center
                          font-bold
                          group-hover:bg-white
                          group-hover:text-[#087F8C]
                          transition-all duration-300'>

            01

          </div>

          <b className='text-[#123F78] text-lg
                        group-hover:text-white
                        transition-colors duration-300'>

            EASY ACCESS

          </b>

          <p className='text-sm leading-6 text-[#64748B]
                        group-hover:text-white/90
                        transition-colors duration-300'>

            Find doctors by speciality and explore available healthcare
            professionals without spending unnecessary time searching
            through multiple platforms.

          </p>

        </div>


        {/* Trust */}

        <div className='group flex-1
                        border-b md:border-b-0 md:border-r
                        border-[#DCECEF]
                        px-8 md:px-10 lg:px-12
                        py-10 sm:py-14
                        flex flex-col gap-4
                        bg-white
                        hover:bg-[#087F8C]
                        hover:text-white
                        transition-all duration-300
                        cursor-pointer'>

          <div className='w-10 h-10 rounded-xl
                          bg-[#E8F7F9]
                          text-[#087F8C]
                          flex items-center justify-center
                          font-bold
                          group-hover:bg-white
                          group-hover:text-[#087F8C]
                          transition-all duration-300'>

            02

          </div>

          <b className='text-[#123F78] text-lg
                        group-hover:text-white
                        transition-colors duration-300'>

            CONVENIENT CARE

          </b>

          <p className='text-sm leading-6 text-[#64748B]
                        group-hover:text-white/90
                        transition-colors duration-300'>

            Choose an appointment slot that works for you and manage your
            healthcare appointments through a simple and organized digital
            experience.

          </p>

        </div>


        {/* Patient First */}

        <div className='group flex-1
                        px-8 md:px-10 lg:px-12
                        py-10 sm:py-14
                        flex flex-col gap-4
                        bg-white
                        hover:bg-[#087F8C]
                        hover:text-white
                        transition-all duration-300
                        cursor-pointer'>

          <div className='w-10 h-10 rounded-xl
                          bg-[#E8F7F9]
                          text-[#087F8C]
                          flex items-center justify-center
                          font-bold
                          group-hover:bg-white
                          group-hover:text-[#087F8C]
                          transition-all duration-300'>

            03

          </div>

          <b className='text-[#123F78] text-lg
                        group-hover:text-white
                        transition-colors duration-300'>

            PATIENT-FIRST EXPERIENCE

          </b>

          <p className='text-sm leading-6 text-[#64748B]
                        group-hover:text-white/90
                        transition-colors duration-300'>

            Every part of MediAyuCare is designed with the patient in mind,
            from clear information and simple navigation to an experience
            focused on making healthcare easier to manage.

          </p>

        </div>

      </div>

       {/* ---------- HEALTHCARE CTA ---------- */}

<div className='relative overflow-hidden rounded-2xl
                bg-gradient-to-r from-[#087F8C] to-[#123F78]
                px-7 sm:px-12 md:px-16
                py-12 md:py-14
                mb-20
                shadow-[0_12px_35px_rgba(18,63,120,0.15)]'>

  {/* Decorative circles */}

  <div className='absolute -top-20 -right-20
                  w-48 h-48 rounded-full
                  bg-white/10'>
  </div>

  <div className='absolute -bottom-24 -left-16
                  w-52 h-52 rounded-full
                  bg-white/10'>
  </div>

  <div className='relative z-10
                  flex flex-col md:flex-row
                  items-center justify-between gap-8'>

    {/* Left Content */}

    <div className='text-center md:text-left max-w-2xl'>

      <div className='inline-flex items-center gap-2
                      bg-white/10
                      border border-white/20
                      rounded-full
                      px-4 py-1.5
                      text-white text-xs
                      font-medium mb-4'>

        <span className='w-1.5 h-1.5
                         rounded-full bg-white'>
        </span>

        YOUR HEALTH MATTERS

      </div>

      <h2 className='text-2xl sm:text-3xl md:text-4xl
                     font-bold text-white leading-tight'>

        Take the next step towards
        <br className='hidden sm:block' />
        better healthcare.

      </h2>

      <p className='text-sm sm:text-base
                    text-white/80
                    mt-4 leading-6
                    max-w-xl'>

        Find the right healthcare professional, choose a convenient
        appointment time, and manage your healthcare journey with
        MediAyuCare — all from one simple platform.

      </p>

    </div>


    {/* Right Side */}

    <div className='flex-shrink-0'>

      <button
        onClick={() => {
          window.scrollTo(0, 0)
        }}
        className='bg-white
                   text-[#087F8C]
                   px-7 sm:px-9
                   py-3.5
                   rounded-full
                   text-sm font-semibold
                   shadow-lg
                   hover:scale-105
                   hover:shadow-xl
                   active:scale-95
                   transition-all duration-300'
      >

        Explore MediAyuCare →

      </button>

    </div>

  </div>

</div>


    </div>
  )
}

export default About