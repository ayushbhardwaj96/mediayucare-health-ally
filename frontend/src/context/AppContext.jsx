import { createContext, useEffect, useState } from "react";
import axios from "axios" ;
import { toast } from "react-toastify";


export const AppContext = createContext()

const AppContextProvider = (props) => {


const currencySymbol = '$'
 const backendUrl = import.meta.env.VITE_BACKEND_URL

 const [doctors, setDoctors] = useState([])
const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

    const [userData, setUserData] = useState(false)

 

     // Fetch all public doctor profiles for the client facing portal
    const getDoctorsData = async () => {
        try {
            //  Fetch public profile records from the database
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            
            if (data.success) {
                //  Synchronize state with fresh profile data arrays
                setDoctors(data.doctors);
            } else {
                toast.error(data.message || "Failed to retrieve doctors data.");
            }
        } catch (error) {
            console.error("[App Context Error] getDoctorsData failed:", error);
            
            //  Extract semantic error strings safely from backend response structures
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Network error. Unable to load doctors list at this time.");
            }
        }
    };


        // Fetch and load the logged-in user's profile details
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { 
                headers: { token } 
            });

            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Profile load failed:", error);

            // Get error message directly from backend response
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to load profile. Check your connection.");
            }
        }
    };




        useEffect(() => {
       getDoctorsData();
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])



    const value = {
     doctors, 
     currencySymbol,
      getDoctorsData,
      token, setToken,
      backendUrl,
      userData,
      setUserData,
      loadUserProfileData
}



return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)

}

export default AppContextProvider