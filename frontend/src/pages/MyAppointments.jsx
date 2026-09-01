import React, { useContext, useState,useEffect  } from 'react'
import { AppContext } from "../context/AppContext"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
// import { assets } from '../assets/assets_frontend/assets'

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData} = useContext(AppContext)
    const navigate = useNavigate();  

   const [appointments, setAppointments] = useState([])
   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_');
    return `${day} ${months[month - 1]} ${year}`;
};


      // Fetch and load the authenticated user's scheduled appointments list
    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { 
                headers: { token } 
            });

            if (data.success) {
                // Backend already sorts the array by latest, making client side reverse mutations obsolete
                setAppointments(data.appointments || []);
                console.log(data.appointments)
            } else {
                toast.error(data.message || "Failed to load appointment records.");
            }
        } catch (error) {
            console.error("Fetch appointments exception:", error);

            // Directly pull error notifications issued by backend validators
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Network error. Unable to load your scheduled appointments.");
            }
        }
    };


    // Cancel a scheduled appointment using the API
    const cancelAppointment = async (appointmentId) => {
         
        const originalAppointmentsState = [...appointments];

        try {
            
            setAppointments(prev => 
                prev.map(item => 
                    item._id === appointmentId ? { ...item, cancelled: true } : item
                )
            );

            const { data } = await axios.post(
                `${backendUrl}/api/user/cancel-appointment`, 
                { appointmentId }, 
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                await getUserAppointments();  
                await  getDoctorsData() ;
            } else {
                setAppointments(originalAppointmentsState);  
                toast.error(data.message || "Failed to cancel the appointment.");
            }
        } catch (error) {
            setAppointments(originalAppointmentsState);  
            console.error("Cancellation request failed:", error);

            // Fetch the exact error string from the backend response payload
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Network error. Could not cancel your appointment.");
            }
        }
    };

    const initPay = async (order) => {
      // console.log("My Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);
    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Appointment Payment',
        description: "Appointment Payment",
        order_id: order.id,
        // MUST include a prefill object to avoid frontend instantiation validation drops
        prefill: {
            name: "Customer Name", 
            email: "customer@example.com",
            contact: "9999999999"
        },
        theme: {
            color: "#087F8C" // Optional: Matches your green/teal theme color
        },
        handler: async (response) => {
            console.log("Razorpay Success Response:", response);
            try {
                const { data } = await axios.post(
                    `${backendUrl}/api/user/verifyRazorpay`, 
                    response, 
                    { headers: { token } }
                );
                if (data.success) {
                    toast.success("Payment Verified Successfully!");
                    await getUserAppointments();
                    navigate('/my-appointments');
                } else {
                    toast.error(data.message || "Payment verification failed.");
                }
            } catch (error) {
                console.error("Verification Error:", error);
                toast.error(error.response?.data?.message || error.message);
            }
        }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
};



      // Initialize Razorpay payment sequence for a specific appointment
    const appointmentRazorpay = async (appointmentId) => {
        try {
            // 1. Request a secure order instance packet from the backend
            const { data } = await axios.post(
                `${backendUrl}/api/user/payment-razorpay`, 
                { appointmentId }, 
                { headers: { token } }
            );

            if (data.success) {
                // 2. Open the dynamic Razorpay checkout window overlay
                initPay(data.order);
            } else {
                toast.error(data.message || "Unable to initialize payment gateway order.");
            }
        } catch (error) {
            console.error("Razorpay order initialization exception:", error);

            // 3. Extract validation error strings cleanly from the backend response
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Network error. Unable to establish checkout session.");
            }
        }
    };




        useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])



  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>

      <p className='pb-4 mt-2 sm:mt-4 font-semibold text-lg sm:text-xl text-[#123F78] border-b border-[#DCE8EF]'>
        My Appointments
      </p>

      <div className='mt-5 sm:mt-6'>
        {appointments.map((item,index)=>(
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
                src={item.docData.image}
                alt=""
              />
            </div>

            {/* Doctor Information */}
            <div className='flex-1 min-w-0 text-sm text-[#64748B]'>

              <p className='text-[#123F78] text-base sm:text-lg font-semibold mb-1'>
                {item.docData.name}
              </p>

              <p className='text-[#087F8C] font-medium'>
                {item.docData.speciality}
              </p>

              {/* Address */}
              <div className='mt-3 sm:mt-4'>
                <p className='text-[#334155] font-semibold mb-1'>
                  Address
                </p>

                <p className='text-xs sm:text-sm leading-5'>
                  {item.docData.address.line1}
                </p>

                <p className='text-xs sm:text-sm leading-5'>
                  {item.docData.address.line2}
                </p>
              </div>

              {/* Date & Time */}
              <div className='mt-3 bg-[#F1F8FA] px-3 py-2 rounded-lg
              w-full sm:w-fit'>
                <p className='text-xs sm:text-sm text-[#334155] font-medium'>
                  Date & Time
                </p>

                <p className='text-xs sm:text-sm text-[#64748B] mt-0.5'>
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

            </div>

            {/* Buttons */}
            <div className='flex flex-col gap-3
            w-full lg:w-auto
            lg:min-w-48
            justify-end'>

           {/* 1. Paid Badge (Shows only when appointment is active AND paid) */}
{!item.cancelled && item.payment && !item.isCompleted && (
  <button 
    className='w-full lg:min-w-48
    text-[#16A34A] bg-[#F0FDF4]
    py-2.5 px-5
    border border-[#BBF7D0]
    rounded-lg font-medium text-sm
    cursor-not-allowed
    transition-all duration-300'
    disabled
  >
    Paid
  </button>
)}

{/* 2. Pay Online Button (Shows only when appointment is active AND NOT paid) */}
{!item.cancelled && !item.payment && !item.isCompleted && (
  <button 
    onClick={() => appointmentRazorpay(item._id)}
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
)}

           
{!item.cancelled && !item.payment && !item.isCompleted && (
  <button
    onClick={() => cancelAppointment(item._id)}
    className='w-full lg:min-w-48
    text-[#64748B] bg-white
    py-2.5 px-5
    border border-[#D7DEE5]
    rounded-lg font-medium text-sm
    hover:bg-red-500
    hover:text-white
    hover:border-red-500
    hover:shadow-sm
    transition-all duration-300 cursor-pointer'
  >
    Cancel Appointment
  </button>
)}  

{item.cancelled && !item.isCompleted && (
  <button 
    disabled
    className='w-full lg:min-w-48
    text-red-500 bg-red-50/50
    py-2.5 px-5
    border border-red-200
    rounded-lg font-medium text-sm
    text-center'
  >
    Appointment cancelled
  </button>
)}

{ item.isCompleted && (
  <button 
    
    className='w-full lg:min-w-48
   text-[#16A34A] bg-[#F0FDF4]
    py-2.5 px-5
   border border-[#BBF7D0]
    rounded-lg font-medium text-sm
    text-center'
  >
    Completed
  </button>
)}


            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default MyAppointments