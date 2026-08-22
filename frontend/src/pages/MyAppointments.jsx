import React, { useContext } from 'react'
import { AppContext } from "../context/AppContext"

const MyAppointments = () => {

  const { doctors } = useContext(AppContext)

  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>

      <p className='pb-4 mt-2 sm:mt-4 font-semibold text-lg sm:text-xl text-[#123F78] border-b border-[#DCE8EF]'>
        My Appointments
      </p>

      <div className='mt-5 sm:mt-6'>
        {doctors.slice(0,3).map((item,index)=>(
          <div
            className='flex flex-col lg:flex-row gap-5 lg:gap-7
            py-5 sm:py-6 px-4 sm:px-6 mb-5
            bg-white border border-[#E2EEF3] rounded-2xl
            shadow-sm hover:shadow-md
            transition-all duration-300'
            key={index}
          >

            {/* Doctor Image */}
            <div className='flex-shrink-0 flex justify-center lg:justify-start'>
              <img
                className='w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36
                object-cover rounded-xl
                bg-[#EEF7FA]
                border border-[#E2EEF3]'
                src={item.image}
                alt=""
              />
            </div>

            {/* Doctor Information */}
            <div className='flex-1 min-w-0 text-sm text-[#64748B]'>

              <p className='text-[#123F78] text-base sm:text-lg font-semibold mb-1'>
                {item.name}
              </p>

              <p className='text-[#087F8C] font-medium'>
                {item.speciality}
              </p>

              {/* Address */}
              <div className='mt-3 sm:mt-4'>
                <p className='text-[#334155] font-semibold mb-1'>
                  Address
                </p>

                <p className='text-xs sm:text-sm leading-5'>
                  {item.address.line1}
                </p>

                <p className='text-xs sm:text-sm leading-5'>
                  {item.address.line2}
                </p>
              </div>

              {/* Date & Time */}
              <div className='mt-3 bg-[#F1F8FA] px-3 py-2 rounded-lg
              w-full sm:w-fit'>
                <p className='text-xs sm:text-sm text-[#334155] font-medium'>
                  Date & Time
                </p>

                <p className='text-xs sm:text-sm text-[#64748B] mt-0.5'>
                  22, Aug, 2026 | 8:30 PM
                </p>
              </div>

            </div>

            {/* Buttons */}
            <div className='flex flex-col gap-3
            w-full lg:w-auto
            lg:min-w-48
            justify-end'>

              <button
                className='w-full lg:min-w-48
                text-[#087F8C] bg-white
                py-2.5 px-5
                border border-[#B9DDE2]
                rounded-lg font-medium text-sm
                hover:bg-[#087F8C]
                hover:text-white
                hover:border-[#087F8C]
                hover:shadow-sm
                transition-all duration-300'
              >
                Pay Online
              </button>

              <button
                className='w-full lg:min-w-48
                text-[#64748B] bg-white
                py-2.5 px-5
                border border-[#D7DEE5]
                rounded-lg font-medium text-sm
                hover:bg-red-500
                hover:text-white
                hover:border-red-500
                hover:shadow-sm
                transition-all duration-300'
              >
                Cancel Appointment
              </button>

            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default MyAppointments