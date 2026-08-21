import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

// Destructured the props object here
const RelatedDoctors = ({ speciality, docId }) => { 
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  return (
    <div className='relative flex flex-col items-center gap-4 my-20 text-[#183B4E] md:mx-10'>

      {/* ---------- Section Heading ---------- */}

      <div className='text-center max-w-2xl mx-auto'>

        <div className='inline-flex items-center gap-2 px-4 py-1.5 mb-3
                        rounded-full bg-[#E8F7F9] border border-[#D2ECEF]
                        text-[#087F8C] text-xs font-semibold tracking-wide'>

          <span className='w-1.5 h-1.5 rounded-full bg-[#087F8C]'></span>

          <span>TRUSTED HEALTHCARE</span>

        </div>

        <h1 className='text-3xl md:text-4xl lg:text-[42px]
                       font-bold text-[#123F78]
                       tracking-[-0.5px] leading-tight'>

          Related Doctors

        </h1>

        <p className='mt-3 sm:w-[520px] mx-auto text-sm md:text-base
                      text-[#64748B] leading-7'>

          Explore experienced specialists in the same field and choose
          a healthcare professional that fits your needs.

        </p>

      </div>


      {/* ---------- Doctor Cards ---------- */}

      <div className='w-full grid grid-cols-auto gap-5 pt-7
                      gap-y-7 px-2 sm:px-0'>

        {relDoc.slice(0, 5).map((item, index) => (

          <div 
            onClick={() => { 
              navigate(`/appointment/${item._id}`); 
              window.scrollTo(0, 0) 
            }} 

            className='group relative bg-white
                       border border-[#DDECEF]
                       rounded-2xl overflow-hidden
                       cursor-pointer
                       shadow-[0_4px_20px_rgba(18,63,120,0.06)]
                       hover:shadow-[0_12px_35px_rgba(18,63,120,0.14)]
                       hover:-translate-y-2
                       transition-all duration-300 ease-out' 

            key={index}
          >

            {/* ---------- Doctor Image ---------- */}

            <div className='relative overflow-hidden
                            bg-gradient-to-br from-[#E8F7FA]
                            via-[#F4FBFC] to-[#DDEFF3]'>

              {/* Decorative background */}
              <div className='absolute -top-10 -right-10
                              w-28 h-28 rounded-full
                              bg-[#BFE5EA]/40
                              group-hover:scale-125
                              transition-transform duration-500'>
              </div>

              <div className='absolute -bottom-12 -left-10
                              w-32 h-32 rounded-full
                              bg-[#CFECEF]/40'>
              </div>

              <img
                className='relative z-10 w-full h-auto object-cover
                           group-hover:scale-[1.04]
                           transition-transform duration-500 ease-out'
                src={item.image}
                alt=""
              />

            </div>


            {/* ---------- Doctor Information ---------- */}

            <div className='p-5'>

              {/* Availability Badge */}

              <div className='inline-flex items-center gap-2
                              text-xs font-semibold
                              text-[#159A63]
                              bg-[#EAF8F1]
                              border border-[#D4F0E1]
                              px-3 py-1.5
                              rounded-full mb-3'>

                <span className='relative flex h-2 w-2'>

                  <span className='absolute inline-flex h-full w-full
                                   rounded-full bg-[#16A36A] opacity-40
                                   group-hover:animate-ping'>
                  </span>

                  <span className='relative inline-flex h-2 w-2
                                   rounded-full bg-[#16A36A]'>
                  </span>

                </span>

                <p>Available for appointment</p>

              </div>


              {/* Doctor Name */}

              <p className='text-[#123F78]
                            text-lg md:text-xl
                            font-semibold
                            tracking-[-0.2px]
                            group-hover:text-[#087F8C]
                            transition-colors duration-200'>

                {item.name}

              </p>


              {/* Speciality */}

              <div className='flex items-center gap-2 mt-2'>

                <span className='w-1 h-1 rounded-full bg-[#087F8C]'></span>

                <p className='text-[#64748B] text-sm font-medium'>

                  {item.speciality}

                </p>

              </div>


              {/* Bottom visual separator */}

              <div className='mt-4 pt-3 border-t border-[#EEF3F5]
                              flex items-center justify-between'>

                <span className='text-xs text-[#94A3B8]'>
                  Verified specialist
                </span>

                <span className='text-[#087F8C] text-xs font-semibold
                                 opacity-0 group-hover:opacity-100
                                 translate-x-2 group-hover:translate-x-0
                                 transition-all duration-300'>

                  View profile →

                </span>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* ---------- More Doctors Button ---------- */}

      <button 
        onClick={() => { 
          navigate('/doctors'); 
          window.scrollTo(0, 0) 
        }} 

        className='group flex items-center gap-3
                   bg-white
                   text-[#087F8C]
                   px-10 py-3.5
                   rounded-full
                   mt-10
                   font-semibold text-sm
                   border border-[#BFDDE2]
                   shadow-[0_4px_15px_rgba(8,127,140,0.08)]
                   hover:bg-[#087F8C]
                   hover:text-white
                   hover:border-[#087F8C]
                   hover:shadow-[0_8px_25px_rgba(8,127,140,0.22)]
                   hover:-translate-y-1
                   active:translate-y-0
                   transition-all duration-300'
      >

        <span>
          Explore all doctors
        </span>

        <span className='text-base
                         group-hover:translate-x-1
                         transition-transform duration-300'>

          →

        </span>

      </button>

    </div>
  )
}

export default RelatedDoctors