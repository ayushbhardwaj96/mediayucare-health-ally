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
   const [dashData, setDashData] = useState(false)
   const [profileData, setProfileData] = useState(false)


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

// Marks an appointment as completed and refreshes current dashboard data views
const completeAppointment = async (appointmentId) => {
    try {
        if (!dToken) {
            return toast.error("Session expired. Please log in again.");
        }

        const { data } = await axios.post(
            `${backendUrl}/api/doctor/complete-appointment`, 
            { appointmentId }, 
            { headers: { token: dToken } }  
        );

        if (data.success) {
            toast.success(data.message || "Appointment marked as completed.");
            await getAppointments();  
            
            // Execute dashboard metrics sync securely if the function exists in state memory
            if (typeof getDashData === 'function') {
                await getDashData();
            }
        } else {
            toast.error(data.message || "Failed to update appointment status.");
        }

    } catch (error) {
        console.error("Doctor Complete Appointment Error:", error);
        
    
        const errorMessage = error.response?.data?.message || "Network error. Unable to complete appointment.";
        toast.error(errorMessage);
    }
};

// Cancels an appointment from the doctor panel and refreshes layout views
const cancelAppointment = async (appointmentId) => {
    try {
        if (!dToken) {
            return toast.error("Session expired. Please log in again.");
        }

        const { data } = await axios.post(
            `${backendUrl}/api/doctor/cancel-appointment`, 
            { appointmentId }, 
            { headers: { token: dToken } }  
        );

        if (data.success) {
            toast.success(data.message || "Appointment cancelled successfully.");
            await getAppointments(); 
            
            
            if (typeof getDashData === 'function') {
                await getDashData();
            }
        } else {
            toast.error(data.message || "Failed to cancel the appointment.");
        }

    } catch (error) {
        console.error("Doctor Cancel Appointment Error:", error);
        
        
        const errorMessage = error.response?.data?.message || "Network error. Unable to cancel appointment.";
        toast.error(errorMessage);
    }
};

 // Fetches core metrics and the latest 5 appointments for the doctor dashboard
const getDashData = async () => {
    try {
        if (!dToken) {
            return toast.error("Session expired. Please log in again.");
        }

        const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, { 
            headers: { token: dToken } 
        });

        if (data.success) {
            
            setDashData(data.dashData || { earnings: 0, appointments: 0, patients: 0, latestAppointments: [] });
        } else {
            toast.error(data.message || "Failed to load dashboard statistics.");
        }

    } catch (error) {
        console.error("Doctor Dashboard Fetch Error:", error);
        
        // Isolate exact failure message strings returned by your backend API response
        const errorMessage = error.response?.data?.message || "Network error. Unable to load dashboard records.";
        toast.error(errorMessage);
    }
};

// Fetches the logged-in doctor's profile information from the database
const getProfileData = async () => {
    try {
        if (!dToken) {
            return toast.error("Session expired. Please log in again.");
        }

        const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, { 
            headers: { token: dToken }  
        });

        if (data.success) {
            console.log("Doctor Profile Data Loaded:", data.profileData);
            setProfileData(data.profileData || null);
        } else {
            toast.error(data.message || "Failed to load profile parameters.");
        }

    } catch (error) {
        console.error("Doctor Profile Fetch Error:", error);
        
        // Target exact failure messages sent by your backend validation pipelines
        const errorMessage = error.response?.data?.message || "Network error. Unable to load profile data.";
        toast.error(errorMessage);
    }
};




  // Add your global states and functions inside this object
  const value = {
    dToken, setDToken, backendUrl, appointments, setAppointments, getAppointments, completeAppointment, cancelAppointment, dashData,
    setDashData, getDashData, profileData, setProfileData, getProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
