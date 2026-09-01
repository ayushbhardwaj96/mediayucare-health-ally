import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointments = () => {

   const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
   const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  // Refreshes the appointment list every 10 seconds if the browser tab is open and visible
  useEffect(() => {
    if (dToken) {
      getAppointments();

      const livePollingInterval = setInterval(() => {
        if (document.visibilityState === 'visible') {
          getAppointments();
        }
      }, 10000);

      return () => clearInterval(livePollingInterval);
    }
  }, [dToken]);

  return (
    <div className='w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in'>
      
       <p className='mb-4 text-xl font-bold text-[#123F78] tracking-tight px-1 sm:px-0'>All Appointments</p>

       <div className='bg-white border border-[#E2EEF3] rounded-2xl text-sm max-h-[80vh] overflow-y-auto shadow-[0_4px_25px_rgba(18,63,120,0.02)] overflow-x-hidden'>

        {/* Desktop Table Header Layout */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1.5fr] gap-4 py-3.5 px-6 border-b border-[#E2EEF3] font-semibold text-[#123F78] bg-gradient-to-r from-white to-[#F8FAFC]'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p className='text-center'>Action</p>
        </div>

        {/* Loop through appointments and display rows */}
        {appointments.map((item, index) => (
          <div 
            // FIXED: Renders as a vertical details card layout on mobile and changes into a grid table row on desktop
            className='flex flex-col gap-3 sm:gap-4 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1.5fr] items-start sm:items-center text-[#64748B] py-5 px-5 sm:py-3 sm:px-6 border-b border-[#E2EEF3] last:border-b-0 hover:bg-[#F8FCFD] transition-colors duration-200' 
            key={item._id || index}
          >
            {/* Row Number Counter */}
            <p className='hidden sm:block font-medium text-[#94A3B8]'>{index + 1}</p>
            
            {/* Patient Information Section */}
            <div className='flex items-center gap-2.5 min-w-0 w-full sm:w-auto'>
              <span className='text-xs font-bold text-gray-400 sm:hidden w-16 flex-shrink-0'>Patient:</span>
              <img 
                src={item.userData?.image} 
                className='w-9 h-9 rounded-full object-cover border border-[#DCE8EF] shadow-sm flex-shrink-0' 
                alt={item.userData?.name || "Patient Profile"} 
              /> 
              <p className='font-semibold text-[#123F78] truncate'>{item.userData?.name || "Unknown Patient"}</p>
            </div>
            
            {/* Payment Status Indicator Tag */}
            <div className='flex items-center w-full sm:w-auto'>
              <span className='text-xs font-bold text-gray-400 sm:hidden w-16 flex-shrink-0'>Payment:</span>
              <span 
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border transition-colors ${
                  item.payment 
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                    : 'text-[#087F8C] bg-[#EEF7FA] border-[#B9DDE2]'
                }`}
              >
                {item.payment ? 'Online' : 'CASH'}
              </span>
            </div>
            
            {/* Patient Age Display */}
            <div className='flex items-center w-full sm:w-auto'>
              <span className='text-xs font-bold text-gray-400 sm:hidden w-16 flex-shrink-0'>Age:</span>
              <p className='font-medium text-[#334155] sm:text-[#64748B]'>
                {item.userData?.dob ? `${calculateAge(item.userData.dob)} yrs` : 'N/A'}
              </p>
            </div>
            
            {/* Booking Timing Metrics Group */}
            <div className='flex items-center w-full sm:w-auto'>
              <span className='text-xs font-bold text-gray-400 sm:hidden w-16 flex-shrink-0'>Timing:</span>
              <p className='font-medium text-[#475569]'>
                {slotDateFormat(item.slotDate)}, <span className='text-[#087F8C] font-semibold'>{item.slotTime}</span>
              </p>
            </div>
            
            {/* Fees Element */}
            <div className='flex items-center w-full sm:w-auto'>
              <span className='text-xs font-bold text-gray-400 sm:hidden w-16 flex-shrink-0'>Fees:</span>
              <p className='font-bold text-[#334155] sm:text-[#64748B]'>
                {currency}{item.amount}
              </p>
            </div>
            
            {/* Interactive Status Badges and Functional Actions */}
            <div className='flex items-center sm:justify-center w-full sm:min-w-[140px] pt-3 sm:pt-0 mt-1 sm:mt-0 border-t border-gray-100 sm:border-none'>
              <span className='text-xs font-bold text-gray-400 sm:hidden w-16 flex-shrink-0'>Status:</span>
              
              {item.cancelled ? (
                <span className='inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold text-red-600 bg-red-50 border border-red-100 shadow-sm'>
                  Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className='inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold text-green-600 bg-green-50 border border-green-100 shadow-sm'>
                  Completed
                </span>
              ) : (
                <div className='flex items-center gap-4 sm:gap-3 justify-start sm:justify-center w-full'>
                  
                  {/* Mark as Completed Button */}
                  <button
                    onClick={() => completeAppointment(item._id)}
                    className='group/tick flex items-center justify-center w-12 h-12 hover:bg-green-50 rounded-full border border-transparent hover:border-green-100 transition-all duration-300'
                    title="Mark Completed"
                  >
                    <img 
                      className='w-10 h-10 object-contain scale-150 opacity-80 group-hover/tick:opacity-100 group-hover/tick:scale-[1.6] transition-all duration-300' 
                      src={assets.tick_icon} 
                      alt="Complete" 
                    />
                  </button>

                  {/* Cancel Appointment Button */}
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='group/cross flex items-center justify-center w-12 h-12 hover:bg-red-50 rounded-full border border-transparent hover:border-red-100 transition-all duration-300'
                    title="Cancel Appointment"
                  >
                    <img 
                      className='w-10 h-10 object-contain scale-150 opacity-80 group-hover/cross:opacity-100 group-hover/cross:scale-[1.6] transition-all duration-300' 
                      src={assets.cancel_icon} 
                      alt="Cancel" 
                    />
                  </button>

                </div>
              )}
            </div>

          </div>
        ))}

        {/* Empty State Fallback */}
        {appointments?.length === 0 && (
          <div className='p-10 text-center text-sm font-medium text-[#64748B] bg-white rounded-b-2xl'>
            No assigned appointments found inside your clinic registry schedule.
          </div>
        )}

       </div>
    </div>
  )
}

export default DoctorAppointments;
