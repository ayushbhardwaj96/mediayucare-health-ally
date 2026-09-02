import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } =
    useContext(AdminContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();

      const livePollingInterval = setInterval(() => {
        if (document.visibilityState === 'visible') {
          getAllAppointments();
        }
      }, 10000);

      return () => clearInterval(livePollingInterval);
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl p-4 md:m-5">
      <p className="mb-4 text-lg font-medium text-gray-800">All Appointments</p>

      <div className="bg-white border rounded-lg text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto shadow-sm">
        {/* Desktop Header: Hidden on mobile, grid layout on desktop */}
        <div className="hidden lg:grid lg:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] items-center py-3 px-6 border-b bg-gray-50 font-semibold text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointment Rows Container */}
        <div className="divide-y divide-gray-100">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 p-4 lg:grid lg:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] lg:items-center lg:py-3 lg:px-6 text-gray-500 hover:bg-gray-50 transition-colors"
            >
              {/* Desktop index counter */}
              <p className="hidden lg:block font-medium">{index + 1}</p>

              {/* Patient Profile */}
              <div className="flex items-center gap-3">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold lg:hidden">
                  #{index + 1}
                </span>
                <img
                  src={item.userData.image}
                  className="w-9 h-9 rounded-full object-cover border border-gray-200"
                  alt="Patient"
                />{" "}
                <div>
                  <p className="font-medium text-gray-900 lg:text-gray-500">{item.userData.name}</p>
                  <p className="text-xs text-gray-400 lg:hidden">Age: {calculateAge(item.userData.dob)}</p>
                </div>
              </div>

              {/* Age (Desktop Only) */}
              <p className="hidden lg:block">{calculateAge(item.userData.dob)} Yrs</p>

              {/* Date & Time */}
              <div className="flex flex-col lg:block">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider lg:hidden mb-0.5">Appt Time</span>
                <p className="text-gray-700 lg:text-gray-500">
                  {slotDateFormat(item.slotDate)}, <span className="font-medium text-blue-600 lg:text-gray-500">{item.slotTime}</span>
                </p>
              </div>

              {/* Doctor Details */}
              <div className="flex items-center gap-3 border-t border-b border-gray-50 py-2 my-1 lg:border-none lg:py-0 lg:my-0">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider lg:hidden">Doctor:</span>
                <img
                  src={item.docData.image}
                  className="w-8 h-8 rounded-full bg-gray-100 object-cover"
                  alt="Doctor"
                />{" "}
                <p className="text-gray-700 lg:text-gray-500 font-medium lg:font-normal">{item.docData.name}</p>
              </div>

              {/* Fees */}
              <div className="flex items-center justify-between lg:block">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider lg:hidden">Fee Paid</span>
                <p className="font-semibold text-gray-900 lg:text-gray-500 lg:font-normal">
                  {currency}{item.amount}
                </p>
              </div>

              {/* Actions/Status */}
              <div className="flex items-center justify-between mt-1 pt-2 border-t border-dashed border-gray-100 lg:mt-0 lg:pt-0 lg:border-none">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider lg:hidden">Status</span>
                <div>
                  {item.cancelled ? (
                    <span className="bg-red-50 text-red-500 px-2.5 py-1 rounded-full text-xs font-medium inline-block">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-xs font-medium inline-block">Completed</span>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 h-8 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
