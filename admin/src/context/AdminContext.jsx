import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext()


const AdminContextProvider = (props) =>{



    const [aToken,setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)

    const backendUrl =import.meta.env.VITE_BACKEND_URL 

    // Getting all Doctors data from Database using API
    const getAllDoctors = async () => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)
                 console.log(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

   const changeAvailability = async (docId) => {
    const originalDoctorsState = [...doctors];

    try {
        // 1. Optimistic UI Update (Changes toggle state instantly on screen)
        setDoctors(prevDoctors => 
            prevDoctors.map(doc => 
                doc._id === docId ? { ...doc, available: !doc.available } : doc
            )
        );

        // 2. Perform the database update call
        const { data } = await axios.post(
            `${backendUrl}/api/admin/change-availability`, 
            { docId }, 
            { headers: { aToken } }
        );

        if (data.success) {
            toast.success(data.message);
            
            //  Safe Synchronization: Wrap inside its own try-catch block 
            // so if getAllDoctors fails, it won't break your toggle UI state!
            try {
                await getAllDoctors();
            } catch (fetchError) {
                console.error("Secondary synchronization failed:", fetchError.message);
            }

        } else {
            setDoctors(originalDoctorsState);
            toast.error(data.message || "Failed to update availability status.");
        }

    } catch (error) {
        setDoctors(originalDoctorsState);
        
        // 🔍 Detailed Logging: Look at your browser console to see what this prints!
        console.error("AXIOS DETAILED ERROR OBJECT:", error.response || error);

        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(`Error: ${error.message}`); // Displays the actual system message string
        }
    }
};

// Fetch all global appointments from the backend database for admin monitoring
const getAllAppointments = async () => {
    try {
        // Enforce fail-fast check if admin token is missing before hitting the network
        if (!aToken) {
            return toast.error("Authentication expired. Please log in again.");
        }

        const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, { 
            headers: { aToken } 
        });

        if (data.success) {
            // Arrays are now pre-sorted on the server side, preventing heavy client mutations
            setAppointments(data.appointments || []);
            console.log(data.appointments)
        } else {
            toast.error(data.message || "Failed to retrieve appointment list.");
        }

    } catch (error) {
        console.error("Admin Fetch Appointments Error:", error);
        
        // Isolate exact failure message strings returned by backend controllers
        const errorMessage = error.response?.data?.message || "Network error. Unable to connect to server.";
        toast.error(errorMessage);
    }
};

// Cancels an appointment from the admin panel and refreshes the list
const cancelAppointment = async (appointmentId) => {
    try {
        // Stop execution early if the admin session token is missing
        if (!aToken) {
            return toast.error("Your session has expired. Please log in again.");
        }

        const { data } = await axios.post(
            `${backendUrl}/api/admin/cancel-appointment`, 
            { appointmentId }, 
            { headers: { aToken } }
        );

        if (data.success) {
            toast.success(data.message || "Appointment cancelled successfully.");
            await getAllAppointments(); // Reload the list to show updated statuses instantly
        } else {
            toast.error(data.message || "Failed to cancel the appointment.");
        }

    } catch (error) {
        console.error("Admin Cancel Appointment Error:", error);
        
        // Grab the specific error message sent by your server middleware
        const errorMessage = error.response?.data?.message || "Network error. Unable to cancel appointment.";
        toast.error(errorMessage);
    }
};


// Fetches high-level metrics and recent bookings for the dashboard display panels
const getDashData = async () => {
    try {
        if (!aToken) {
            return toast.error("Session expired. Please log in again.");
        }

        const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, { 
            headers: { atoken: aToken } 
        });

        if (data.success) {
            setDashData(data.dashData || { doctors: 0, appointments: 0, patients: 0, latestAppointments: [] });
        } else {
            toast.error(data.message || "Failed to load dashboard statistics.");
        }

    } catch (error) {
        console.error("Admin Dashboard Fetch Error:", error);
        
        // Isolate exact failure message strings returned by your backend API response
        const errorMessage = error.response?.data?.message || "Network error. Unable to load dashboard records.";
        toast.error(errorMessage);
    }
};


    
    const value = {
         aToken,setAToken,
         backendUrl, doctors,
         getAllDoctors,
         changeAvailability,
         appointments,
         setAppointments,
         getAllAppointments,
         cancelAppointment, getDashData, dashData, setDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider