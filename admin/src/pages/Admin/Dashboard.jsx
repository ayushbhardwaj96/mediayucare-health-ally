import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from "../../assets/assets_admin/assets";


const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData();

      const livePollingInterval = setInterval(() => {
        // ONLY make the API call if the admin tab is active and visible on screen
        if (document.visibilityState === 'visible') {
          getDashData();
        }
      }, 10000); // 10 seconds

      return () => clearInterval(livePollingInterval);
    }
  }, [aToken]);


  return dashData && (

    <div
      className='
        w-full
        max-w-7xl
        mx-auto
        px-4 sm:px-6 lg:px-8
        py-5 sm:py-7
      '
    >

      {/* ---------- Dashboard Header ---------- */}

      <div className='mb-6'>

        <p
          className='
            text-xl sm:text-2xl
            font-bold
            text-[#123F78]
          '
        >
          Dashboard
        </p>

        <p
          className='
            mt-1
            text-sm
            text-[#64748B]
          '
        >
          Overview of your MediAyuCare healthcare platform
        </p>

      </div>


      {/* ---------- Statistics Cards ---------- */}

      <div
        className='
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4
          sm:gap-5
        '
      >

        {/* Doctors */}

        <div
          className='
            group
            flex
            items-center
            gap-4

            bg-white
            p-5

            rounded-2xl

            border
            border-[#DCECEF]

            shadow-[0_8px_25px_rgba(18,63,120,0.06)]

            hover:-translate-y-1
            hover:shadow-[0_12px_30px_rgba(18,63,120,0.10)]

            transition-all
            duration-300

            cursor-pointer
          '
        >

          <div
            className='
              w-14 h-14
              sm:w-16 sm:h-16

              flex
              items-center
              justify-center

              rounded-xl
              bg-[#E8F7F9]

              flex-shrink-0

              group-hover:scale-105
              transition-transform
              duration-300
            '
          >

            <img
              className='w-10 sm:w-11'
              src={assets.doctor_icon}
              alt=""
            />

          </div>

          <div>

            <p
              className='
                text-2xl
                font-bold
                text-[#123F78]
              '
            >
              {dashData.doctors}
            </p>

            <p
              className='
                mt-0.5
                text-sm
                font-medium
                text-[#64748B]
              '
            >
              Doctors
            </p>

          </div>

        </div>


        {/* Appointments */}

        <div
          className='
            group
            flex
            items-center
            gap-4

            bg-white
            p-5

            rounded-2xl

            border
            border-[#DCECEF]

            shadow-[0_8px_25px_rgba(18,63,120,0.06)]

            hover:-translate-y-1
            hover:shadow-[0_12px_30px_rgba(18,63,120,0.10)]

            transition-all
            duration-300

            cursor-pointer
          '
        >

          <div
            className='
              w-14 h-14
              sm:w-16 sm:h-16

              flex
              items-center
              justify-center

              rounded-xl
              bg-[#E8F7F9]

              flex-shrink-0

              group-hover:scale-105
              transition-transform
              duration-300
            '
          >

            <img
              className='w-10 sm:w-11'
              src={assets.appointments_icon}
              alt=""
            />

          </div>

          <div>

            <p
              className='
                text-2xl
                font-bold
                text-[#123F78]
              '
            >
              {dashData.appointments}
            </p>

            <p
              className='
                mt-0.5
                text-sm
                font-medium
                text-[#64748B]
              '
            >
              Appointments
            </p>

          </div>

        </div>


        {/* Patients */}

        <div
          className='
            group
            flex
            items-center
            gap-4

            bg-white
            p-5

            rounded-2xl

            border
            border-[#DCECEF]

            shadow-[0_8px_25px_rgba(18,63,120,0.06)]

            hover:-translate-y-1
            hover:shadow-[0_12px_30px_rgba(18,63,120,0.10)]

            transition-all
            duration-300

            cursor-pointer
          '
        >

          <div
            className='
              w-14 h-14
              sm:w-16 sm:h-16

              flex
              items-center
              justify-center

              rounded-xl
              bg-[#E8F7F9]

              flex-shrink-0

              group-hover:scale-105
              transition-transform
              duration-300
            '
          >

            <img
              className='w-10 sm:w-11'
              src={assets.patients_icon}
              alt=""
            />

          </div>

          <div>

            <p
              className='
                text-2xl
                font-bold
                text-[#123F78]
              '
            >
              {dashData.patients}
            </p>

            <p
              className='
                mt-0.5
                text-sm
                font-medium
                text-[#64748B]
              '
            >
              Patients
            </p>

          </div>

        </div>

      </div>


      {/* ---------- Latest Bookings ---------- */}

      <div
        className='
          mt-7 sm:mt-8

          bg-white

          border
          border-[#DCECEF]

          rounded-2xl

          overflow-hidden

          shadow-[0_8px_30px_rgba(18,63,120,0.06)]
        '
      >

        {/* Section Header */}

        <div
          className='
            flex
            items-center
            gap-3

            px-4 sm:px-6
            py-4

            bg-[#F7FCFD]

            border-b
            border-[#E5EFF1]
          '
        >

          <div
            className='
              w-9 h-9
              flex
              items-center
              justify-center

              rounded-lg
              bg-[#E8F7F9]
            '
          >

            <img
              className='w-5 h-5'
              src={assets.list_icon}
              alt=""
            />

          </div>

          <div>

            <p
              className='
                font-semibold
                text-[#123F78]
              '
            >
              Latest Bookings
            </p>

            <p
              className='
                text-xs
                text-[#94A3B8]
                mt-0.5
              '
            >
              Recent patient appointments
            </p>

          </div>

        </div>


        {/* Booking List */}

        <div>

          {dashData.latestAppointments.slice(0, 5).map((item, index) => (

            <div
              className='
                flex
                items-center
                gap-3 sm:gap-4

                px-4 sm:px-6
                py-4

                border-b
                border-[#EDF2F3]

                hover:bg-[#F8FCFD]

                transition-colors
                duration-200
              '
              key={index}
            >

              {/* Doctor Image */}

              <img
                className='
                  w-11 h-11
                  sm:w-12 sm:h-12

                  rounded-full

                  object-cover

                  border-2
                  border-white

                  ring-1
                  ring-[#CFE8EC]

                  shadow-sm

                  flex-shrink-0
                '
                src={item.docData.image}
                alt=""
              />


              {/* Booking Information */}

              <div className='flex-1 min-w-0'>

                <p
                  className='
                    text-sm
                    sm:text-[15px]

                    font-semibold
                    text-[#334155]

                    truncate
                  '
                >
                  {item.docData.name}
                </p>

                <p
                  className='
                    text-xs
                    sm:text-sm

                    text-[#94A3B8]

                    mt-1

                    truncate
                  '
                >
                  Booking on {slotDateFormat(item.slotDate)}
                </p>

              </div>


              {/* Status / Cancel */}

              {item.cancelled ? (

                <span
                  className='
                    inline-flex
                    items-center

                    px-3
                    py-1.5

                    rounded-full

                    bg-[#FEF2F2]
                    border
                    border-[#FECACA]

                    text-red-500

                    text-xs
                    font-semibold

                    whitespace-nowrap
                  '
                >
                  Cancelled
                </span>

              ) : item.isCompleted ? (

                <span
                  className='
                    inline-flex
                    items-center

                    px-3
                    py-1.5

                    rounded-full

                    bg-[#ECFDF5]
                    border
                    border-[#BBF7D0]

                    text-green-600

                    text-xs
                    font-semibold

                    whitespace-nowrap
                  '
                >
                  Completed
                </span>

              ) : (

                <button
                  type="button"
                  onClick={() => cancelAppointment(item._id)}
                  className='
                    group

                    w-11 h-11
                    sm:w-12 sm:h-12

                    flex
                    items-center
                    justify-center

                    rounded-xl

                    bg-[#FFF7F7]

                    border
                    border-[#FEE2E2]

                    hover:bg-[#FEF2F2]
                    hover:border-[#FCA5A5]

                    active:scale-95

                    transition-all
                    duration-200

                    cursor-pointer

                    flex-shrink-0
                  '
                  title="Cancel appointment"
                >

                  <img
                    className='
                      w-7 h-7
                      sm:w-8 sm:h-8

                      object-contain

                      opacity-80

                      group-hover:opacity-100
                      group-hover:scale-105

                      transition-all
                      duration-200
                    '
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />

                </button>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>

  )
}

export default Dashboard