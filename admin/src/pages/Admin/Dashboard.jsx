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
        if (document.visibilityState === 'visible') {
          getDashData();
        }
      }, 10000);

      return () => clearInterval(livePollingInterval);
    }
  }, [aToken]);

  return dashData && (
    <div className='w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in'>

      {/* Analytics Summary Grid Layout */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
        
        {/* Doctors Card */}
        <div className='flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E2EEF3] shadow-[0_4px_20px_rgba(18,63,120,0.03)] hover:shadow-[0_10px_30px_rgba(18,63,120,0.08)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer'>
          <div className='p-3 bg-[#EEF7FA] rounded-xl group-hover:bg-[#087F8C]/10 transition-colors duration-300'>
            <img className='w-10 h-10 object-contain text-[#087F8C]' src={assets.doctor_icon} alt="Doctors Count" />
          </div>
          <div>
            <p className='text-2xl sm:text-3xl font-bold text-[#123F78] tracking-tight'>{dashData.doctors}</p>
            <p className='text-xs sm:text-sm font-medium text-[#64748B] mt-0.5'>Total Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className='flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E2EEF3] shadow-[0_4px_20px_rgba(18,63,120,0.03)] hover:shadow-[0_10px_30px_rgba(18,63,120,0.08)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer'>
          <div className='p-3 bg-[#EEF7FA] rounded-xl group-hover:bg-[#087F8C]/10 transition-colors duration-300'>
            <img className='w-10 h-10 object-contain text-[#087F8C]' src={assets.appointments_icon} alt="Appointments Count" />
          </div>
          <div>
            <p className='text-2xl sm:text-3xl font-bold text-[#123F78] tracking-tight'>{dashData.appointments}</p>
            <p className='text-xs sm:text-sm font-medium text-[#64748B] mt-0.5'>Appointments Booked</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className='flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E2EEF3] shadow-[0_4px_20px_rgba(18,63,120,0.03)] hover:shadow-[0_10px_30px_rgba(18,63,120,0.08)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer sm:col-span-2 lg:col-span-1'>
          <div className='p-3 bg-[#EEF7FA] rounded-xl group-hover:bg-[#087F8C]/10 transition-colors duration-300'>
            <img className='w-10 h-10 object-contain text-[#087F8C]' src={assets.patients_icon} alt="Patients Count" />
          </div>
          <div>
            <p className='text-2xl sm:text-3xl font-bold text-[#123F78] tracking-tight'>{dashData.patients}</p>
            <p className='text-xs sm:text-sm font-medium text-[#64748B] mt-0.5'>Registered Patients</p>
          </div>
        </div>

      </div>

      {/* Latest Bookings Container */}
      <div className='bg-white rounded-2xl border border-[#E2EEF3] mt-8 sm:mt-10 shadow-[0_4px_25px_rgba(18,63,120,0.02)] overflow-hidden'>
        
        {/* Table/List Section Header */}
        <div className='flex items-center gap-3 px-5 py-4 sm:px-6 bg-gradient-to-r from-white to-[#F8FAFC] border-b border-[#E2EEF3]'>
          <div className='p-2 bg-[#EEF7FA] rounded-lg'>
            <img className='w-5 h-5 object-contain' src={assets.list_icon} alt="Registry Icon" />
          </div>
          <div>
            <p className='font-bold text-base text-[#123F78]'>Latest Bookings</p>
            <p className='text-xs text-[#64748B] mt-0.5'>Real-time tracking of the 5 most recent registrations</p>
          </div>
        </div>

        {/* Bookings Feed Items Rows */}
        <div className='divide-y divide-[#E2EEF3]'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div 
              className='flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 sm:px-6 gap-3 sm:gap-4 hover:bg-[#F8FCFD] transition-colors duration-200' 
              key={item._id || index}
            >
              {/* Doctor Metadata */}
              <div className='flex items-center gap-3.5 min-w-0 flex-1'>
                
                <div className='min-w-0 text-sm'>
                  <p className='text-[#123F78] font-semibold truncate hover:text-[#087F8C] transition-colors cursor-pointer'>{item.docData?.name}</p>
                  <p className='text-[#64748B] text-xs font-medium mt-0.5 flex items-center gap-1.5'>
                    <span className='w-1.5 h-1.5 rounded-full bg-[#087F8C]/40 inline-block'></span>
                    Booking on <span className='text-[#334155] font-semibold'>{slotDateFormat(item.slotDate)}</span>
                  </p>
                </div>
              </div>

              {/* Status Actions */}
              <div className='flex items-center sm:justify-end flex-shrink-0 pl-14 sm:pl-0'>
                {item.cancelled ? (
                  <span className='inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold text-red-600 bg-red-50 border border-red-100 shadow-sm'>
                    Cancelled
                  </span>
                ) : item.isCompleted || item.completed ? (
                  <span className='inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold text-green-600 bg-green-50 border border-green-100 shadow-sm'>
                    Completed
                  </span>
                ) : (
                  //  Forced a larger cross profile using scale utilities to beat blank asset paddings
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='group/btn flex items-center justify-center w-12 h-12 hover:bg-red-50 rounded-full transition-all duration-300 border border-transparent hover:border-red-100'
                    title="Cancel Booking"
                  >
                    <img 
                      className='w-10 h-10 object-contain scale-150 opacity-90 group-hover/btn:opacity-100 group-hover/btn:scale-[1.6] transition-all duration-300' 
                      src={assets.cancel_icon} 
                      alt="Trigger Cancellation Path" 
                    />
                  </button>
                )}
              </div>

            </div>
          ))}
          
          {/* Empty state slate */}
          {dashData.latestAppointments?.length === 0 && (
            <div className='p-8 text-center text-sm font-medium text-[#64748B] bg-white'>
              No recent customer appointments found on system arrays.
            </div>
          )}
        </div>

      </div>

    </div>
  )
}

export default Dashboard;
