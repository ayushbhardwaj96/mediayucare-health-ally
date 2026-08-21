import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className='pb-16'>

      {/* ---------- PAGE HEADING ---------- */}

      <div className='text-center pt-12 md:pt-16'>

        <div className='inline-flex items-center gap-2
                        px-4 py-1.5
                        rounded-full
                        bg-[#E8F7F9]
                        border border-[#D2ECEF]
                        text-[#087F8C]
                        text-xs font-semibold
                        tracking-wider mb-4'>

          <span className='w-1.5 h-1.5
                           rounded-full
                           bg-[#087F8C]'>
          </span>

          GET IN TOUCH

        </div>

        <p className='text-3xl md:text-4xl
                      font-bold
                      text-[#123F78]
                      tracking-tight'>

          CONTACT <span className='text-[#087F8C]'>US</span>

        </p>

        <p className='max-w-xl mx-auto
                      text-sm md:text-base
                      text-[#64748B]
                      leading-6
                      mt-3'>

          Have a question or need assistance?
          Our team is here to help you navigate your healthcare journey.

        </p>

      </div>


      {/* ---------- CONTACT CONTENT ---------- */}

      <div className='my-12 md:my-16
                      flex flex-col
                      justify-center
                      md:flex-row
                      gap-10 md:gap-16
                      mb-24
                      text-sm'>

        {/* ---------- IMAGE ---------- */}

        <div className='w-full md:max-w-[390px]
                        relative group'>

          <div className='absolute -inset-2
                          rounded-2xl
                          bg-[#E5F5F7]
                          opacity-70'>
          </div>

          <div className='relative
                          overflow-hidden
                          rounded-2xl
                          border border-[#DCECEF]
                          shadow-[0_10px_30px_rgba(18,63,120,0.10)]'>

            <img
              className='w-full
                         object-cover
                         group-hover:scale-[1.02]
                         transition-transform duration-500'
              src={assets.contact_image}
              alt='Contact MediAyuCare'
            />

          </div>

        </div>


        {/* ---------- CONTACT INFORMATION ---------- */}

        <div className='flex flex-col
                        justify-center
                        items-start
                        gap-5
                        max-w-lg'>

          {/* Office */}

          <div>

            <div className='flex items-center gap-3 mb-3'>

              <span className='w-8 h-[2px]
                               bg-[#087F8C]'>
              </span>

              <p className='font-semibold
                            text-lg
                            text-[#123F78]'>
                OUR OFFICE
              </p>

            </div>

            <p className='text-[#64748B]
                          leading-7'>

              MediAyuCare Healthcare Centre
              <br />
              2nd Floor, Innovation Plaza
              <br />
              Patna, Bihar, India

            </p>

          </div>


          {/* Contact Details */}

          <div className='w-full
                          rounded-xl
                          bg-[#F5FAFB]
                          border border-[#DCECEF]
                          px-5 py-4'>

            <p className='text-[#64748B]
                          leading-7'>

              <span className='font-medium text-[#123F78]'>
                Phone:
              </span>{' '}
              +91 98765 43210

              <br />

              <span className='font-medium text-[#123F78]'>
                Email:
              </span>{' '}
              support@mediayucare.com

            </p>

          </div>


          {/* Careers */}

          <div className='mt-2'>

            <div className='flex items-center gap-3 mb-3'>

              <span className='w-8 h-[2px]
                               bg-[#087F8C]'>
              </span>

              <p className='font-semibold
                            text-lg
                            text-[#123F78]'>

                CAREERS AT MEDIAYUCARE

              </p>

            </div>

            <p className='text-[#64748B]
                          leading-6
                          max-w-md'>

              We're building technology that makes healthcare
              simpler and more accessible. Explore opportunities
              to grow with the MediAyuCare team.

            </p>

          </div>


          {/* Button */}

          <button
            className='mt-2
                       flex items-center gap-3
                       border border-[#087F8C]
                       text-[#087F8C]
                       px-8 py-3.5
                       rounded-full
                       text-sm font-semibold
                       hover:bg-[#087F8C]
                       hover:text-white
                       hover:shadow-[0_8px_20px_rgba(8,127,140,0.20)]
                       hover:-translate-y-0.5
                       transition-all duration-300'
          >

            Explore Opportunities

            <span className='text-base'>
              →
            </span>

          </button>

        </div>

      </div>


      {/* ---------- SUPPORT MESSAGE ---------- */}

      <div className='mb-16
                      rounded-2xl
                      bg-gradient-to-r
                      from-[#EAF7F8]
                      to-[#F2F8FC]
                      border border-[#DCECEF]
                      px-6 sm:px-10
                      py-8
                      text-center'>

        <h2 className='text-xl md:text-2xl
                       font-semibold
                       text-[#123F78]'>

          We're here when you need us.

        </h2>

        <p className='text-sm
                      text-[#64748B]
                      max-w-2xl
                      mx-auto
                      mt-2
                      leading-6'>

          Whether you have a question about appointments,
          doctors, or your MediAyuCare experience, we're always
          happy to help.

        </p>

      </div>

    </div>
  )
}

export default Contact