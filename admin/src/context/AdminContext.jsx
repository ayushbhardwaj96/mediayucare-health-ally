import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext()


const AdminContextProvider = (props) =>{



    const [aToken,setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [doctors, setDoctors] = useState([])

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


    
    const value = {
         aToken,setAToken,
         backendUrl, doctors,
         getAllDoctors,
         changeAvailability
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider