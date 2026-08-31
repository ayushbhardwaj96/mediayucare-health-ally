import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, aToken, changeAvailability , getAllDoctors} = useContext(AdminContext)

  useEffect(()=>{
     if (aToken) {
        getAllDoctors()
    }
  }, [aToken])

  return (
    <div
      // FIXED: Removed min-h-screen and overflow-y-auto to allow smooth alignment with the parent sidebar grid frame
      className='
        w-full
        px-4 py-5
        sm:px-6 sm:py-6
        lg:px-8 lg:py-7
        bg-gradient-to-br
        from-[#F7FCFD]
        via-white
        to-[#EEF8FA]
      '
    >

      {/* Page Header */}
      <div className='max-w-7xl mx-auto'>

        <div className='mb-6'>

          <h1
            className='
              text-xl
              sm:text-2xl
              font-bold
              text-[#123F78]
            '
          >
            All Doctors
          </h1>

          <p
            className='
              mt-1
              text-sm
              text-[#64748B]
            '
          >
            Manage doctors and update their availability.
          </p>

        </div>


        {/* Doctors Grid */}
        <div
          className='
            w-full
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-5
            sm:gap-6
            pb-8
          '
        >

          {doctors.map((item, index) => (

            <div
              className='
                group
                w-full
                bg-white
                border border-[#DCECEF]
                rounded-2xl
                overflow-hidden
                cursor-pointer
                shadow-[0_6px_24px_rgba(18,63,120,0.06)]
                hover:shadow-[0_12px_32px_rgba(18,63,120,0.12)]
                hover:-translate-y-1
                transition-all
                duration-300
              '
              key={item._id || index} // FIXED: Dynamic unique identifier reference key
            >

              {/* Doctor Image */}
              <div
                className='
                  relative
                  w-full
                  aspect-[4/3]
                  overflow-hidden
                  bg-[#E8F7F9]
                '
              >

                <img
                  className='
                    w-full
                    h-full
                    object-cover
                    bg-[#E8F7F9]
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  '
                  src={item.image}
                  alt={item.name}
                />

                {/* Image Overlay */}
                <div
                  className='
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#123F78]/20
                    to-transparent
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-300
                  '
                />

              </div>


              {/* Doctor Information */}
              <div className='p-4 sm:p-5'>

                <p
                  className='
                    text-[#123F78]
                    text-base
                    sm:text-lg
                    font-semibold
                    truncate
                  '
                >
                  {item.name}
                </p>

                <p
                  className='
                    mt-1
                    text-[#087F8C]
                    text-sm
                    font-medium
                  '
                >
                  {item.speciality}
                </p>


                {/* Divider */}
                <div className='my-4 border-t border-[#EDF2F3]' />


                {/* Availability */}
                <div
                  className='
                    flex
                    items-center
                    justify-between
                    gap-3
                    p-2.5
                    rounded-lg
                    bg-[#F7FCFD]
                    border border-[#E8F1F3]
                  '
                >

                  <div className='flex items-center gap-2'>

                    {/* Status Dot */}
                    <span
                      className={`
                        w-2
                        h-2
                        rounded-full
                        flex-shrink-0
                        ${item.available
                          ? 'bg-[#087F8C]'
                          : 'bg-[#94A3B8]'
                        }
                      `}
                    />

                    <p
                      className={`
                        text-sm
                        font-medium
                        ${item.available
                          ? 'text-[#087F8C]'
                          : 'text-[#64748B]'
                        }
                      `}
                    >
                      {item.available ? 'Available' : 'Unavailable'}
                    </p>

                  </div>


                  {/* Availability Checkbox */}
                  <label
                    className='
                      relative
                      inline-flex
                      items-center
                      cursor-pointer
                    '
                  >

                    <input
                      onChange={()=>changeAvailability(item._id)}
                      type="checkbox"
                      checked={item.available || false}
                      className='
                        sr-only
                        peer
                      '
                    />

                    <div
                      className='
                        w-10
                        h-5
                        bg-[#CBD5E1]
                        rounded-full
                        peer
                        peer-checked:bg-[#087F8C]
                        transition-all
                        duration-200
                        after:content-[""]
                        after:absolute
                        after:top-[2px]
                        after:left-[2px]
                        after:bg-white
                        after:rounded-full
                        after:h-4
                        after:w-4
                        after:transition-all
                        peer-checked:after:translate-x-5
                      '
                    />

                  </label>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default DoctorsList;
