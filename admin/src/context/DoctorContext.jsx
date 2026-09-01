import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify'

// 1. Create the context
export const DoctorContext = createContext();

// 2. Create the provider component
const DoctorContextProvider = (props) => {

   const backendUrl = import.meta.env.VITE_BACKEND_URL

   const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')

   const [appointments, setAppointments] = useState([])


   // Fetches all assigned appointments for the logged-in doctor from the database
const getAppointments = async () => {
    try {
        if (!dToken) {
            return toast.error("Session expired. Please log in again.");
        }

        const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, { 
            headers: { token: dToken } 
        });

        if (data.success) {
            
            setAppointments(data.appointments || []);
            console.log(data.appointments)
        } else {
            toast.error(data.message || "Failed to load appointment records.");
        }

    } catch (error) {
        console.error("Doctor Appointments Fetch Error:", error);
        
        // Isolate exact failure messages sent by your backend API response
        const errorMessage = error.response?.data?.message || "Network error. Unable to load appointments.";
        toast.error(errorMessage);
    }
};

   

  // Add your global states and functions inside this object
  const value = {
    dToken, setDToken, backendUrl, appointments, setAppointments, getAppointments
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
