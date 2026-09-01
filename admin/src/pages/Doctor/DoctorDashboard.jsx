import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from "../../assets/assets_admin/assets";

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData();

      const livePollingInterval = setInterval(() => {
        if (document.visibilityState === 'visible') {
          getDashData();
        }
      }, 10000);

      return () => clearInterval(livePollingInterval);
    }
  }, [dToken]);

  return dashData && (
    <div className='w-full max-w-6xl mx-auto p-4 sm:p-5 lg:p-6'>

      {/* ================= SUMMARY CARDS ================= */}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'>

        {/* Earnings */}
        <div
          className='
            flex items-center gap-4
            bg-white
            p-4 sm:p-5
            rounded-xl
            border border-[#DCECEF]
            shadow-[0_4px_18px_rgba(18,63,120,0.05)]
            cursor-pointer
            hover:-translate-y-1
            hover:shadow-[0_10px_25px_rgba(18,63,120,0.09)]
            transition-all duration-300
          '
        >
          <div
            className='
              flex items-center justify-center
              w-14 h-14
              sm:w-16 sm:h-16
              rounded-xl
              bg-[#EEF8FA]
              border border-[#DCECEF]
            '
          >
            <img
              className='w-9 h-9 sm:w-10 sm:h-10 object-contain'
              src={assets.earning_icon}
              alt='Earnings'
            />
          </div>

          <div className='min-w-0'>
            <p className='text-xl sm:text-2xl font-bold text-[#123F78] truncate'>
              {currency}{dashData.earnings}
            </p>

            <p className='text-sm text-[#64748B] font-medium mt-0.5'>
              Total Earnings
            </p>
          </div>
        </div>


        {/* Appointments */}
        <div
          className='
            flex items-center gap-4
            bg-white
            p-4 sm:p-5
            rounded-xl
            border border-[#DCECEF]
            shadow-[0_4px_18px_rgba(18,63,120,0.05)]
            cursor-pointer
            hover:-translate-y-1
            hover:shadow-[0_10px_25px_rgba(18,63,120,0.09)]
            transition-all duration-300
          '
        >
          <div
            className='
              flex items-center justify-center
              w-14 h-14
              sm:w-16 sm:h-16
              rounded-xl
              bg-[#EEF8FA]
              border border-[#DCECEF]
            '
          >
            <img
              className='w-9 h-9 sm:w-10 sm:h-10 object-contain'
              src={assets.appointments_icon}
              alt='Appointments'
            />
          </div>

          <div>
            <p className='text-xl sm:text-2xl font-bold text-[#123F78]'>
              {dashData.appointments}
            </p>

            <p className='text-sm text-[#64748B] font-medium mt-0.5'>
              Total Appointments
            </p>
          </div>
        </div>


        {/* Patients */}
        <div
          className='
            flex items-center gap-4
            bg-white
            p-4 sm:p-5
            rounded-xl
            border border-[#DCECEF]
            shadow-[0_4px_18px_rgba(18,63,120,0.05)]
            cursor-pointer
            hover:-translate-y-1
            hover:shadow-[0_10px_25px_rgba(18,63,120,0.09)]
            transition-all duration-300
            sm:col-span-2
            lg:col-span-1
          '
        >
          <div
            className='
              flex items-center justify-center
              w-14 h-14
              sm:w-16 sm:h-16
              rounded-xl
              bg-[#EEF8FA]
              border border-[#DCECEF]
            '
          >
            <img
              className='w-9 h-9 sm:w-10 sm:h-10 object-contain'
              src={assets.patients_icon}
              alt='Patients'
            />
          </div>

          <div>
            <p className='text-xl sm:text-2xl font-bold text-[#123F78]'>
              {dashData.patients}
            </p>

            <p className='text-sm text-[#64748B] font-medium mt-0.5'>
              Unique Patients
            </p>
          </div>
        </div>

      </div>


      {/* ================= LATEST BOOKINGS ================= */}

      <div
        className='
          mt-7 sm:mt-9
          bg-white
          rounded-xl
          border border-[#DCECEF]
          shadow-[0_4px_20px_rgba(18,63,120,0.04)]
          overflow-hidden
        '
      >

        {/* Section Header */}
        <div
          className='
            flex items-center gap-3
            px-4 sm:px-6
            py-4
            bg-gradient-to-r
            from-white
            to-[#F7FCFD]
            border-b border-[#DCECEF]
          '
        >

          <div
            className='
              flex items-center justify-center
              w-9 h-9
              rounded-lg
              bg-[#E8F7F9]
            '
          >
            <img
              className='w-5 h-5 object-contain'
              src={assets.list_icon}
              alt='Bookings'
            />
          </div>

          <div>
            <p className='font-semibold text-[#123F78] text-base'>
              Latest Bookings
            </p>

            <p className='text-xs text-[#64748B] mt-0.5'>
              Your most recent appointment bookings
            </p>
          </div>

        </div>


        {/* Booking List */}
        <div className='divide-y divide-[#EDF2F3]'>

          {dashData.latestAppointments.slice(0, 5).map((item, index) => (

            <div
              className='
                flex flex-col
                sm:flex-row
                sm:items-center
                justify-between
                gap-4
                px-4 sm:px-6
                py-4
                hover:bg-[#F8FCFD]
                transition-colors duration-200
              '
              key={item._id || index}
            >

              {/* Doctor / Booking Information */}
              <div className='flex items-center gap-3 min-w-0 flex-1'>

                <div
                  className='
                    flex-shrink-0
                    w-10 h-10
                    sm:w-11 sm:h-11
                    rounded-full
                    bg-[#EEF8FA]
                    border border-[#DCECEF]
                    flex items-center justify-center
                    overflow-hidden
                  '
                >
                  <img
                    className='w-full h-full object-cover'
                    src={item.userData?.image}
                    alt=''
                  />
                </div>

                <div className='min-w-0'>

                  <p className='
                    text-[#123F78]
                    font-semibold
                    text-sm sm:text-[15px]
                    truncate
                  '>
                    {item.userData?.name}
                  </p>

                  <p className='
                    text-[#64748B]
                    text-xs
                    mt-1
                    leading-5
                  '>
                    Booking on{' '}
                    <span className='font-medium text-[#334155]'>
                      {slotDateFormat(item.slotDate)}
                    </span>

                    {' '}at{' '}

                    <span className='font-semibold text-[#087F8C]'>
                      {item.slotTime}
                    </span>
                  </p>

                </div>

              </div>


              {/* Status / Actions */}
              <div
                className='
                  flex items-center
                  justify-end
                  flex-shrink-0
                  sm:ml-4
                '
              >

                {item.cancelled ? (

                  <span
                    className='
                      inline-flex items-center
                      px-3 py-1.5
                      rounded-md
                      text-xs font-semibold
                      text-red-600
                      bg-red-50
                      border border-red-100
                    '
                  >
                    Cancelled
                  </span>

                ) : item.isCompleted || item.completed ? (

                  <span
                    className='
                      inline-flex items-center
                      px-3 py-1.5
                      rounded-md
                      text-xs font-semibold
                      text-green-600
                      bg-green-50
                      border border-green-100
                    '
                  >
                    Completed
                  </span>

                ) : (

                  <div className='flex items-center gap-2'>

                    {/* Complete */}
                    <button
                      onClick={() => completeAppointment(item._id)}
                      className='
                        flex items-center justify-center
                        w-11 h-11
                        sm:w-12 sm:h-12
                        rounded-full
                        hover:bg-[#EEF8FA]
                        transition-all duration-200
                        cursor-pointer
                      '
                      title='Mark Completed'
                    >
                      <img
                        className='
                          w-8 h-8
                          sm:w-9 sm:h-9
                          object-contain
                          hover:scale-110
                          transition-transform duration-200
                        '
                        src={assets.tick_icon}
                        alt='Complete'
                      />
                    </button>


                    {/* Cancel */}
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='
                        flex items-center justify-center
                        w-11 h-11
                        sm:w-12 sm:h-12
                        rounded-full
                        hover:bg-red-50
                        transition-all duration-200
                        cursor-pointer
                      '
                      title='Cancel Appointment'
                    >
                      <img
                        className='
                          w-8 h-8
                          sm:w-9 sm:h-9
                          object-contain
                          hover:scale-110
                          transition-transform duration-200
                        '
                        src={assets.cancel_icon}
                        alt='Cancel'
                      />
                    </button>

                  </div>

                )}

              </div>

            </div>

          ))}


          {/* Empty State */}
          {dashData.latestAppointments?.length === 0 && (

            <div
              className='
                px-5 py-10
                text-center
                text-sm
                font-medium
                text-[#64748B]
              '
            >
              No recent appointments found.
            </div>

          )}

        </div>

      </div>

    </div>
  )
}

export default DoctorDashboard